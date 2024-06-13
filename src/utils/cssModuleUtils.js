export function fromCssSecondsToNumber(cssSeconds) {
    return cssSeconds.replace('s', '');
}

export function fromCssSecondsToJsMilliseconds(cssSeconds) {
    return fromCssSecondsToNumber(cssSeconds) * 1000;
}