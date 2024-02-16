/**
 * @description Функция получения имени события нажатия кнопок с учетом модификаторов.
 * Порядок перечисления модификаторов в имени события: WIN/META, CTRL, ALT, SHIFT.
 * @param {KeyboardEvent} e Объект события.
 * @returns {string} Имя события нажатия с перечислением модификаторов,
 * например, "Q", "CTRL+Q", "SHIFT+Q", "CTRL+ALT+Q", "CTRL+SHIFT+Q", "CTRL+ALT+SHIFT+Q", "WIN+CTRL+ALT+SHIFT+Q"
 */
declare const getEventName: (e: KeyboardEvent) => string;
export default getEventName;
export { getEventName };
