/**
 * @description Утилита для получения DOM-элемента.
 * @param {string | (HTMLElement & { $el?: HTMLElement })} el Может принимать как сам DOM-элемент, так и его селектор,
 * или инстанс Vue-компонента, из которого будет получен корневой для этого компонента DOM-элемент.
 * @returns {HTMLElement | null} Возвращает DOM-элемент, или null, если его не нашлось.
 */
const getElement = (el: string | (HTMLElement & { $el?: HTMLElement })): HTMLElement | null => {
    if (typeof el === 'string') return document.querySelector(el);

    // Если в качестве элемента передан ref на компонент,
    // у него внутри будет ссылка на HTML-элемента в свойстве $el
    if (el?.$el && typeof el.$el === 'object') el = el.$el;

    if (typeof el === 'object' && 'addEventListener' in el) return el;

    return null;
};

export default getElement;
export { getElement };
