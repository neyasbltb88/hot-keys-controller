type THotKeysControllerActionCallbackArgs = KeyboardEvent & { hotKey: string };

interface IHotKeysControllerAction {
    /** Клавиатурное сочетание, при нажатии которого будет выполнен callback.
     * Пример: "Q", "CTRL+Q", "SHIFT+Q", "CTRL+ALT+Q", "CTRL+SHIFT+Q", "CTRL+ALT+SHIFT+Q", "CTRL+ALT+SHIFT+META+Q" */
    hotKey: string;
    /** Функция, которая будет выполнена при нажатии сочетания hotKey,
     * аргументом принимает событие KeyboardEvent, в которое добавлено свойство hotKey. */
    callback: (e: THotKeysControllerActionCallbackArgs) => any;
}

export default IHotKeysControllerAction;
export type { IHotKeysControllerAction, THotKeysControllerActionCallbackArgs };
