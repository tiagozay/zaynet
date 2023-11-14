import React, { useEffect, useRef, useState } from 'react';
import './ModalPublicar.css';

interface ModalPublicarProps {
    modalAberto: boolean,
    fecharModal: () => void
}

export default function ModalPublicar({ modalAberto, fecharModal }: ModalPublicarProps) {

    const [permisaoParaPublicar, setPermisaoParaPublicar] = useState(false);
    const [indicadorAlgumTextoDigitado, setIndicadorAlgumTextoDigitado] = useState(false);
    const [indicadorAlgumaImagemSelecionada, setIndicadorAlgumaImagemSelecionada] = useState(false);
    const [indicadorAlgumVideoSelecionado, setIndicadorAlgumVideoSelecionado] = useState(false);

    const container = useRef(null);

    useEffect(() => {
        if(indicadorAlgumTextoDigitado || indicadorAlgumaImagemSelecionada || indicadorAlgumVideoSelecionado){
            setPermisaoParaPublicar(true);
        }else{
            setPermisaoParaPublicar(false);
        }
    }, [indicadorAlgumTextoDigitado, indicadorAlgumaImagemSelecionada, indicadorAlgumVideoSelecionado]);

    useEffect(() => {

        let handleEscKey = (event: KeyboardEvent) => {
            event.key === 'Escape' && fecharModal();
        }

        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    function clickOverlay(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (event.target === container.current) {
            fecharModal();
        }
    }

    if (!modalAberto) {
        document.body.style.overflowY = 'scroll';
        return null;
    }

    document.body.style.overflowY = 'hidden';
    
    function aoDigitarTexto(e: React.ChangeEvent<HTMLTextAreaElement>)
    {
        if(e.target.value.trim().length != 0){
            setIndicadorAlgumTextoDigitado(true);
        }else{
            setIndicadorAlgumTextoDigitado(false);
        }
    }

    return (
        <div id="modalPublicar__overlay" ref={container} onClick={clickOverlay}>
            <div id="modalPublicar">
                <div id='modalPublicar__tituloEBtnDeFechar'>
                    <h3 id='modalPublicar__tituloModal'>Criar publicação</h3>
                    <button
                        id='modalPublicar__btnFechar'
                        className='material-symbols-outlined'
                        onClick={fecharModal}
                    >close</button>
                </div>
                <div id='modalPublicar__container'>
                    <div id="modalPublicar__nomeEPerfilDoUsuario">
                        <img
                            src="./imagensDinamicas/perfil.jpg"
                            alt="Perfil usuário"
                            id="modalPublicar__perfilUsuario"
                        />
                        <p id="modalPublicar__nomeUsuario">Tiago zay</p>
                    </div>
                    <textarea 
                        id='modalPublicar__campoTexto' 
                        placeholder='No que você está pensando, Tiago?' 
                        onChange={aoDigitarTexto}
                    ></textarea>
                    <div id='modalPublicar__divAdicionarFotosEVideos'>
                        <p>Adicionar à publicação</p>
                        <div id='modalPublicar__divAdicionarFotosEVideos__icones'>
                            <button>
                                <img src="./icones/imagemIcone.png" alt="" />
                            </button>
                            <button>
                                <img src="./icones/videoIcone.png" alt="" />
                            </button>
                        </div>
                    </div>
                    <button 
                        id='modalPublicar__btnPublicar'
                        disabled={!permisaoParaPublicar}
                        className={!permisaoParaPublicar ? "modalPublicar__btnPublicarInativo" : ""}
                    >Publicar</button>
                </div>
            </div>
        </div>
    )
}
