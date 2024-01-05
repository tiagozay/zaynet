import React, { useEffect, useState } from 'react';
import './CompartilharPublicacaoMobile.css';
import { useNavigate } from 'react-router-dom';
import Publicacao from '../../components/Publicacao';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';

export default function CompartilharPublicacaoMobile() {

    const [textoDigitado, setTextoDigitado] = useState<string | null>(null);

    const navigate = useNavigate();

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    useEffect(() => {
        if(!isMobile){
            navigate(-1);
        }
    }, [isMobile]);

    function aoClicarEmVoltar() {
        navigate(-1);
    }

    function aoDigitarTexto(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setTextoDigitado(e.target.value);
    }

    return (
        <div id="compartilharPublicacaoMobile__page">
            <div id="compartilharPublicacaoMobile__cabecalho">
                <div id="compartilharPublicacaoMobile__cabecalho__container">
                    <button
                        onClick={aoClicarEmVoltar}
                        className='material-symbols-outlined'
                        id='compartilharPublicacaoMobile__btnVoltar'
                    >arrow_back</button>
                    <h3 id="compartilharPublicacaoMobile__titulo">Compartilhar publicação</h3>
                </div>
                <button
                    id="compartilharPublicacaoMobile__btnPublicar"
                >PUBLICAR</button>
            </div>

            <div id="compartilharPublicacaoMobile__container">
                <div id="compartilharPublicacaoMobile__divPerfilENomeUsuario">
                    <img
                        src="./imagensDinamicas/perfil.jpg"
                        alt="Perfil usuário"
                        id="compartilharPublicacaoMobile__divPerfilENomeUsuario__perfil"
                    />
                    <p
                        id="compartilharPublicacaoMobile__divPerfilENomeUsuario__nome"
                    >Pedro souza</p>
                </div>

                <textarea
                    id="compartilharPublicacaoMobile__campoTexto"
                    placeholder='No que você está pensando, Pedro?'
                    onChange={aoDigitarTexto}
                >
                </textarea>

                <div id='compartilharPublicacaoMobile__containerPublicacao'>
                    <Publicacao publicacaoCompartilhada />
                </div>


            </div>
        </div>
    )
}
