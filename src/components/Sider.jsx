import * as React from 'react'
import '../styles/Sider.scss'

function Sider({ orientation, content }) {
    return (
        <div className={`sider ${orientation}`}>
            <div className={`sider-content-${content}`}>

            </div>
            <div className='line' />
        </div>
    );
}

export default Sider;