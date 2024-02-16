import { clearKeyCode } from './clearKeyCode';

const modKeysMap: Record<string, string> = {
    CTRL: 'CTRL',
    SHIFT: 'SHIFT',
    ALT: 'ALT',
    META: 'META'
};

const modKeysCodesMap: Record<string, Set<string>> = {
    CTRL: new Set(['ControlLeft', 'ControlRight']),
    SHIFT: new Set(['ShiftLeft', 'ShiftRight']),
    ALT: new Set(['AltLeft', 'AltRight']),
    META: new Set(['MetaLeft', 'MetaRight'])
};

/**
 * @description Функция получения имени события нажатия кнопок с учетом модификаторов.
 * Порядок перечисления модификаторов в имени события: WIN/META, CTRL, ALT, SHIFT.
 * @param {KeyboardEvent} e Объект события.
 * @returns {string} Имя события нажатия с перечислением модификаторов,
 * например, "Q", "CTRL+Q", "SHIFT+Q", "CTRL+ALT+Q", "CTRL+SHIFT+Q", "CTRL+ALT+SHIFT+Q", "WIN+CTRL+ALT+SHIFT+Q"
 */
const getEventName = (e: KeyboardEvent): string => {
    let eventNameParts = new Set<string>();
    const { ctrlKey, altKey, shiftKey, metaKey, code } = e;

    if (metaKey) eventNameParts.add(modKeysMap.META);
    if (ctrlKey) eventNameParts.add(modKeysMap.CTRL);
    if (altKey) eventNameParts.add(modKeysMap.ALT);
    if (shiftKey) eventNameParts.add(modKeysMap.SHIFT);

    const keyCode = clearKeyCode(code);
    let keyCodeIsModKey = false;
    for (const modKey of eventNameParts) {
        const modKeyCodes = modKeysCodesMap[modKey];
        if (!modKeyCodes) break;

        // Если keyCode - это одна из кнопок-модификаторов, то не будем добавлять keyCode к имени события
        if (modKeyCodes.has(keyCode)) {
            keyCodeIsModKey = true;
            break;
        }
    }
    if (!keyCodeIsModKey) {
        eventNameParts.add(keyCode);
    }

    const eventName = [...eventNameParts].join('+');

    return eventName;
};

export default getEventName;
export { getEventName };
