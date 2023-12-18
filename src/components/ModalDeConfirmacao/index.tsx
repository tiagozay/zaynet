import React, { useEffect, useRef, useState } from 'react';
import './ModalDeConfirmacao.css';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';

interface ModalDeConfirmacaoProps {
    modalAberto: boolean,
    fecharModal: () => void,
    titulo: string,
    mensagem: string,
    aoConfirmar: () => void
}

export default function ModalDeConfirmacao({
    modalAberto,
    fecharModal,
    titulo,
    mensagem,
    aoConfirmar
}: ModalDeConfirmacaoProps) {

    const [indicadorLayoutMobile, setIndicadorLayoutMobile] = useState(true);

    const overlay = useRef(null);

    useEffect(() => {

        let handleEscKey = (event: KeyboardEvent) => {
            event.key === 'Escape' && fecharModal();
        }

        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    useEffect(() => {
        verificaTamanhoDaTelaEMudaState();

        const handleResize = () => verificaTamanhoDaTelaEMudaState();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!modalAberto) {
        document.body.style.overflowY = 'scroll';
        return null;
    }

    document.body.style.overflowY = 'hidden';

    function verificaTamanhoDaTelaEMudaState()
    {
        if(window.innerWidth <= TAMANHO_DE_TELA_MOBILE){
            setIndicadorLayoutMobile(true);
        }else{
            setIndicadorLayoutMobile(false);
        }
    }

    function clickOverlay(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (event.target === overlay.current) {
            fecharModal();
        }
    }

    return (

        indicadorLayoutMobile ?
            <div id='modalDeConfirmacao__overlay' ref={overlay} onClick={clickOverlay}>
                <div id='modalDeConfirmacao__mobile' >
                    <p id="modalDeConfirmacao__mensagem__mobile">{mensagem}</p>
                    <div id='modalDeConfirmacao__divBtnsInteracao__mobile'>
                        <button id='modalDeConfirmacao__btnCancelar__mobile' onClick={fecharModal}>Cancelar</button>
                        <button id='modalDeConfirmacao__btnConfirmar__mobile'>Confirmar</button>
                    </div>
                </div >
            </div> :
            <div id='modalDeConfirmacao__overlay' ref={overlay} onClick={clickOverlay}>
                <div id='modalDeConfirmacao' >
                    <div id='modalDeConfirmacao__divTituloEBtnFechar'>
                        <h4 id="modalDeConfirmacao__titulo">{titulo}</h4>
                        <button id="modalDeConfirmacao__btnFechar" className='material-symbols-outlined' onClick={fecharModal}>
                            close
                        </button>
                    </div>
                    <p id="modalDeConfirmacao__mensagem">{mensagem}</p>
                    <div id='modalDeConfirmacao__divBtnsInteracao'>
                        <button id='modalDeConfirmacao__btnCancelar' onClick={fecharModal}>Cancelar</button>
                        <button id='modalDeConfirmacao__btnConfirmar'>Confirmar</button>
                    </div>
                </div >
            </div >
    )
}
