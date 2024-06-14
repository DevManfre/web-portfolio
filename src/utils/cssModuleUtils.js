import { useInView } from 'framer-motion';

export const fromCssSecondsToNumber = (cssSeconds) => {
    return cssSeconds.replace('s', '');
}

export const fromCssSecondsToJsMilliseconds = (cssSeconds) => {
    return fromCssSecondsToNumber(cssSeconds) * 1000;
}

export const useIsInView = (reference) => {
    return useInView(
        reference,
        {
            once: true
        }
    );
}

export const getInViewStyle = (isInView, transition = 1, translateY = 50) => {
    return {
        opacity: isInView ? 1 : 0,
        transform: isInView ? "none" : `translateY(${translateY}px)`,
        transition: `${fromCssSecondsToNumber(transition)}s`
    };
}