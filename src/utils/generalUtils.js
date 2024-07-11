import * as gatsby from '../../gatsby-config';

/* Get a list of all available languages in i18n */
export const getAllAvailableLanguages = () => {
    const pluginsList = gatsby.plugins;

    for (const plugin of pluginsList)
        if ('resolve' in plugin && plugin['resolve'] === 'gatsby-plugin-react-i18next')
            return plugin.options.languages;

    return null; // No matching dictionary found
}

/* Check if is the first session landind in the page */
export const isFirstLanding = () => {
    if (sessionStorage.getItem("isFirstLanding"))
        return false;
    else
        sessionStorage.setItem('isFirstLanding', true);

    return true;
}