import { useInView } from 'framer-motion';

/* This function covert a css transition value to a number (without the final s unit)  */
export const fromCssSecondsToNumber = (cssSeconds) => {
    return cssSeconds.replace('s', '');
}

/* This function covert a css transition value to a number (without the final s unit).
Then it's converted to milliseconds */
export const fromCssSecondsToJsMilliseconds = (cssSeconds) => {
    return fromCssSecondsToNumber(cssSeconds) * 1000;
}

/* This function return a global isInView var for all react site. */
export const useIsInView = (reference) => {
    return useInView(
        reference,
        {
            once: true
        }
    );
}

/* This function return a global style for all components entering in the viewport. */
export const getInViewStyle = (isInView, transition = '1', translateY = 50) => {
    return {
        opacity: isInView ? 1 : 0,
        transform: isInView ? "none" : `translateY(${translateY}px)`,
        transition: `${fromCssSecondsToNumber(transition)}s`
    };
}