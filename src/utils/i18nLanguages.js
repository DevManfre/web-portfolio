import * as gatsby from '../../gatsby-config';

export const getAllAvailableLanguages = () => {
    const pluginsList = gatsby.plugins;

    for (const plugin of pluginsList)
        if ('resolve' in plugin && plugin['resolve'] === 'gatsby-plugin-react-i18next')
            return plugin.options.languages;

    return null; // No matching dictionary found
}