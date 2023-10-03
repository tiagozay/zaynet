import React from 'react';
import './OpcoesHeader.css';

export default function OpcoesHeader() {
    return (
        <div id='opcoesHeader'>
            <i className='material-symbols-outlined opcoesHeaderIcone'>group_add</i>
            <i className='material-symbols-outlined opcoesHeaderIcone'>chat_bubble</i>
            <i className='material-symbols-outlined opcoesHeaderIcone'>notifications</i>
            <i className='opcoesHeaderIcone' id='opcoesHeaderIcone__perfil'>
                <img src="imagensDinamicas/perfil.jpg" alt="" />
            </i>
        </div>
    )
}
