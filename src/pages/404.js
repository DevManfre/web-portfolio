import * as React from "react";
import { Link } from "gatsby";
import { Trans } from "react-i18next";
import "bootstrap-icons/font/bootstrap-icons.css";
import '../styles/404.scss';

const NotFoundPage = () => {
    const createTabulations = tabs => <span>{Array.from({ length: tabs }, (_, index) => (<span key={index}>&emsp;&emsp;</span>))}</span>;

    return (
        <div className="container-404">
            <div className="wrap">
                <div className="404">
                    <code>
                        <span className="green">&lt;!</span><span>DOCTYPE html</span><span className="green">&gt;</span><br />
                        <span className="orange">&lt;html&gt;</span><br />
                        {createTabulations(1)}<span className="orange">&lt;head&gt;</span><br />
                        {createTabulations(2)}<span className="orange">&lt;style&gt;</span><br />
                        {createTabulations(3)}* {'{'}<br />
                        {createTabulations(4)}<span className="green"><Trans>404-style-key</Trans></span>:<span className="blue"> <Trans>404-style-value</Trans></span>;<br />
                        {createTabulations(3)}{'}'}<br />
                        {createTabulations(2)}<span className="orange">&lt;/style&gt;</span><br />
                        {createTabulations(1)}<span className="orange">&lt;/head&gt;</span><br /><br />
                        {createTabulations(1)}<span className="orange">&lt;body&gt;</span><br />
                        {createTabulations(2)}ERROR 404! FILE NOT FOUND!<br />
                        {createTabulations(2)}<span className="comment">&lt;!--The file you are looking for,<br />
                            {createTabulations(2)}is not where you think it is.--&gt;</span><br />
                        {createTabulations(1)}<span className="orange">&lt;/body&gt;</span><br />
                        <span className="orange">&lt;/html&gt;</span>
                        <span className="info"></span>
                    </code>
                </div>
            </div>

            <Link to="/">
                <i class="bi bi-house-fill"></i>
            </Link>
        </div>
    );
}

export default NotFoundPage;

export const Head = () => <title>Not found</title>;