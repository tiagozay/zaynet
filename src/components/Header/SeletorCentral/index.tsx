import React from 'react';
import './SeletorCentral.css';
import { Link, useLocation } from 'react-router-dom';

export default function SeletorCentral() {
    const location = useLocation();

    return (
        <div id='seletorCentral'>
            <div className={`divLinkSeletorCentarl ${ location.pathname === '/' && 'seletorCentralIconeSelecionado'}`}>
                <Link
                    to='/'
                    className='material-symbols-outlined seletorCentralIcone'
                >home</Link>
            </div>
            <div className={`divLinkSeletorCentarl ${ location.pathname === '/amigos' && 'seletorCentralIconeSelecionado'}`}>
                <Link
                    to='/amigos'
                    className='material-symbols-outlined seletorCentralIcone'
                >group</Link>
            </div>
        </div>
    )
}
