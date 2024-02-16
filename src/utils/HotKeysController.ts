import { IHotKeysControllerOptions } from './IHotKeysControllerOptions';
import { IHotKeysControllerAction } from './IHotKeysControllerAction';

import EventEmitter from '@neyasbltb_88/event-emitter';
import extendOptionsWithDefault from './extendOptionsWithDefault';
import getElement from './getElement';
import getEventName from './getEventName';

const defaultOptions: Required<IHotKeysControllerOptions> = {
    el: null,
    autoEnable: true,
    debug: false,
    tabindex: 0
};

/**
 * @class
 * @description Класс, позволяющий подписываться на различные клавиатурные сочетания, происходящие внутри элемента el,
 * для выполнения переданных экшнов для определенных сочетаний.
 * Коллбеки экшнов в аргументе получают событие оригинального события, из которого можно получить конкретный элемент,
 * на котором произошло нажатие клавиатурного сочетания.
 * @param {IHotKeysControllerOptions} options Объект опций класса.
 * @param {null | string | HTMLElement} [options.el=null] HTML-элемент, или его селектор, внутри которого будут прослушиваться события клавиатуры.
 * @param {boolean} [options.autoEnable=true] Флаг, автоматически включающий прослушивание событий с клавиатуры сразу при создании инстанса класса.
 * @param {boolean} [options.debug=false] Флаг, включающий вывод в консоль сообщений с информацией о всех клавиатурных событиях.
 * @param {number | null} [options.tabindex=null] Значение tabindex, которое будет автоматически присвоено элементу(если передано в опциях),
 * на котором активируется прослушивание клавиатурных событий.
 * @param {IHotKeysControllerAction[]} [actions=[]] Массив экшнов с интерфейсом IHotKeysControllerAction `{ hotKey: string, callback: (e: KeyboardEvent) => any }`.
 */
class HotKeysController extends EventEmitter {
    protected _options: Required<IHotKeysControllerOptions>;
    protected _actions: IHotKeysControllerAction[] = [];
    protected _restoreTabindex: string | null = null;
    private _isEnabled: boolean = false;
    get isEnabled(): boolean {
        return this._isEnabled;
    }

    constructor(options: IHotKeysControllerOptions = {}, actions: IHotKeysControllerAction[] = []) {
        super();

        this._options = extendOptionsWithDefault(options, defaultOptions);
        console.log('this._options: ', this._options);

        if (options.el) this._prepareElement(options.el);
        if (actions.length) this.setActions(actions);
        if (this._options.autoEnable) this.enable();
    }

    /** Устанавливает массив экшнов */
    setActions(actions: IHotKeysControllerAction[]) {
        this._unsubscribeActions();

        this._actions = actions;

        this._subscribeActions();

        this.emit('setActions', actions);

        return this;
    }

    /** Активирует прослушивание клавиатурных событий на элементе el.
     * Если явно в метод не передается el, то он будет взят из объекта options, который передавался в конструктор */
    enable(el?: IHotKeysControllerOptions['el']) {
        // Если ранее прослушивание событий было активировано, то сначала деактивируем старое,
        // такая возможность нужна для возможности активировать/деактивировать уже сконфигурированный инстанс класса
        // на различных элементах, которые могут появляться/убираться со страницы динамически.
        if (this._isEnabled) this.disable();
        if (el) this._prepareElement(el);
        if (!this._options.el || typeof this._options.el !== 'object') return;
        this._isEnabled = true;

        this._options.el.addEventListener('keydown', this._onKeyDown);

        this.emit('enable');

        return this;
    }

    /** Деактивирует прослушивание клавиатурных событий */
    disable() {
        if (!this._options.el || typeof this._options.el !== 'object') return;
        this._isEnabled = false;

        this._options.el.removeEventListener('keydown', this._onKeyDown);

        this.emit('disable');

        return this;
    }

    /** Обнуляет все опции и экшны, что должно помочь сборщику мусора подчистить данные.
     * Вызывать этот метод в хуках beforeDestroy компонента, где был создан инстанс этого класса. */
    destroy() {
        this.disable();
        this._unsubscribeActions();
        this._restoreElement();

        this._options = defaultOptions;
        this._actions = [];

        this.emit('destroy');
    }

    /** Метод переключения режима отладки, в котором в консоль будут выводиться
     * данные обо всех клавиатурных событиях на элементе,
     * из них можно взять правильное значение hotKey для комбинации */
    toggleDebug(flag: Required<IHotKeysControllerOptions>['debug']) {
        this._options.debug = flag;

        return this;
    }

    protected _onKeyDown = (e: KeyboardEvent & { hotKey?: string }) => {
        const eventName = getEventName(e);
        e.hotKey = eventName;

        if (this._options.debug) {
            const debugData = { event: e, hotKey: eventName };
            console.log(debugData);
            this.emit('debug', debugData);
        }

        // Если на текущий hotKey есть слушатели, значит можем отправить событие о том, что сработал определенный экшн
        if (this.events[eventName]?.size || this.onceCallbacks[eventName]?.size) {
            this.emit('action', eventName);

            // Отменяем дефолтное поведение браузера на существующие в экшнах сочетания горячих клавиш
            e.preventDefault();
        }

        // Передаем оригинальное событие
        this.emit('keydown', e);
        // Вызываем событие с именем, соответствующим формату hotKey из IHotKeysControllerAction
        this.emit(eventName, e);
    };
    protected _subscribeActions() {
        this._actions.forEach(({ hotKey, callback }) => this.on(hotKey, callback));
    }
    protected _unsubscribeActions() {
        this._actions.forEach(({ hotKey, callback }) => this.off(hotKey, callback));
    }
    protected _prepareElement(el: Required<IHotKeysControllerOptions>['el']) {
        if (!el) return;

        this._restoreElement();

        this._options.el = getElement(el);
        if (!this._options.el) return;

        if (typeof this._options.tabindex === 'number') {
            this._restoreTabindex = this._options.el.getAttribute('tabindex');
            this._options.el.setAttribute('tabindex', String(this._options.tabindex));
        }
    }
    protected _restoreElement() {
        if (!this._options.el || typeof this._options.el !== 'object') return;

        if (this._restoreTabindex) {
            this._options.el.setAttribute('tabindex', this._restoreTabindex);
        } else {
            this._options.el.removeAttribute('tabindex');
        }
    }
}

export default HotKeysController;
export { HotKeysController };
