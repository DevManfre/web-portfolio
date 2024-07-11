import * as React from "react";
import { Link, graphql } from "gatsby";
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
                        {createTabulations(4)}<span className="green">everything</span>:<span className="blue"> awesome</span>;<br />
                        {createTabulations(3)}{'}'}<br />
                        {createTabulations(2)}<span className="orange">&lt;/style&gt;</span><br />
                        {createTabulations(1)}<span className="orange">&lt;/head&gt;</span><br /><br />
                        {createTabulations(1)}<span className="orange">&lt;body&gt;</span><br />
                        {createTabulations(2)}ERROR 404! FILE NOT FOUND!<br />
                        {createTabulations(2)}<span className="comment">&lt;!--The file you are looking for,<br />
                            {createTabulations(2)}is not where you think it is.--&gt;</span><br />
                        {createTabulations(1)}<span className="orange">&lt;/body&gt;</span><br />
                        <span className="orange">&lt;/html&gt;</span>
                        <span className="info" />
                    </code>
                </div>
            </div>

            <Link to="/">
                <i className="bi bi-house-fill"></i>
            </Link>
        </div>
    );
}

export default NotFoundPage;

export const query = graphql`query($language: String!){locales:allLocale(filter:{language:{eq:$language}}){edges{node{ns data language}}}site{siteMetadata{title description}}}`;

export const Head = ({ data, pageContext }) =>
    <>
        <html lang={pageContext['language']} />
        <title>404 - {data.site.siteMetadata.title}</title>
        <meta name="description" content={data.site.siteMetadata.description} />
    </>