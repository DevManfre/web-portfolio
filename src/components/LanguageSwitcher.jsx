import * as React from 'react';
import $ from 'jquery';
import { useTranslation } from "react-i18next";
import { languageSwitcher, select1, select2, slider, round, selected } from '../styles/LanguageSwitcher.module.scss';

function LanguageSwitcher() {
    const { i18n } = useTranslation();

    return (
        <label className={languageSwitcher}>
            <input type="checkbox" onClick={() => $('span').toggleClass(selected)} />
            <span className={`${slider} ${round}`}></span>
            <span className={`${select1} ${selected}`}>{i18n['languages'][0].toUpperCase()}</span>
            <span className={select2}>{i18n['languages'][1].toUpperCase()}</span>
        </label>
    );
}

export default LanguageSwitcher;