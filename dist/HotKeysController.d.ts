import { IHotKeysControllerOptions } from './IHotKeysControllerOptions';
import { IHotKeysControllerAction } from './IHotKeysControllerAction';
import EventEmitter from '@neyasbltb_88/event-emitter';
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
declare class HotKeysController extends EventEmitter {
    protected _options: Required<IHotKeysControllerOptions>;
    protected _actions: IHotKeysControllerAction[];
    protected _restoreTabindex: string | null;
    private _isEnabled;
    get isEnabled(): boolean;
    constructor(options?: IHotKeysControllerOptions, actions?: IHotKeysControllerAction[]);
    /** Устанавливает массив экшнов */
    setActions(actions: IHotKeysControllerAction[]): this;
    /** Активирует прослушивание клавиатурных событий на элементе el.
     * Если явно в метод не передается el, то он будет взят из объекта options, который передавался в конструктор */
    enable(el?: IHotKeysControllerOptions['el']): this | undefined;
    /** Деактивирует прослушивание клавиатурных событий */
    disable(): this | undefined;
    /** Обнуляет все опции и экшны, что должно помочь сборщику мусора подчистить данные.
     * Вызывать этот метод в хуках beforeDestroy компонента, где был создан инстанс этого класса. */
    destroy(): void;
    /** Метод переключения режима отладки, в котором в консоль будут выводиться
     * данные обо всех клавиатурных событиях на элементе,
     * из них можно взять правильное значение hotKey для комбинации */
    toggleDebug(flag: Required<IHotKeysControllerOptions>['debug']): this;
    protected _onKeyDown: (e: KeyboardEvent & {
        hotKey?: string;
    }) => void;
    protected _subscribeActions(): void;
    protected _unsubscribeActions(): void;
    protected _prepareElement(el: Required<IHotKeysControllerOptions>['el']): void;
    protected _restoreElement(): void;
}
export default HotKeysController;
export { HotKeysController };
