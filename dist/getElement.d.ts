/**
 * @description Утилита для получения DOM-элемента.
 * @param {string | (HTMLElement & { $el?: HTMLElement })} el Может принимать как сам DOM-элемент, так и его селектор,
 * или инстанс Vue-компонента, из которого будет получен корневой для этого компонента DOM-элемент.
 * @returns {HTMLElement | null} Возвращает DOM-элемент, или null, если его не нашлось.
 */
declare const getElement: (el: string | (HTMLElement & {
    $el?: HTMLElement;
})) => HTMLElement | null;
export default getElement;
export { getElement };
