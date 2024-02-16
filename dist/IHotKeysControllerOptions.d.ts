interface IHotKeysControllerOptions {
    /** HTML-элемент, или его селектор, внутри которого будут прослушиваться события клавиатуры.
     * По умолчанию: null
     */
    el?: null | string | HTMLElement;
    /** Флаг, автоматически включающий прослушивание событий с клавиатуры сразу при создании инстанса класса.
     * По умолчанию: true
     */
    autoEnable?: boolean;
    /** Флаг, включающий вывод в консоль сообщений с информацией о всех клавиатурных событиях.
     * По умолчанию: false
     */
    debug?: boolean;
    /** Значение tabindex, которое будет автоматически присвоено элементу(если передано в опциях),
     * на котором активируется прослушивание клавиатурных событий.
     * По умолчанию: null
     */
    tabindex?: number | null;
}
export default IHotKeysControllerOptions;
export type { IHotKeysControllerOptions };
