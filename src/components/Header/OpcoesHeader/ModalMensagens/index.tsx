import React from 'react';
import './ModalMensagens.css';

interface ModalMensagensProps {
    aberto: boolean,
    clickFora: Function
}

export default function ModalMensagens({ aberto, clickFora }: ModalMensagensProps) {
    return (
        aberto ?
            <>
                <div className='modal-overlay' onClick={() => clickFora()}></div>
                <nav id='navMensagens' className='navOpcoesHeader'>
                    <h3 className='navOpcoesHeader__titulo'>
                        Mensagens
                    </h3>
                    <ul id="listaDeMensagens">
                    </ul>
                </nav>
            </>
            :
            <></>
    )
}
