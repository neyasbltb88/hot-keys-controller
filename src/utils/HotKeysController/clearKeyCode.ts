const clearKeyCode = (code: string) => {
    // https://regex101.com/r/cLGkRG/1
    const regex = /Key|Digit/;

    return code.replace(regex, '');
};

export default clearKeyCode;
export { clearKeyCode };
