import React, { useContext, useEffect } from 'react';
import './MensagensMobile.css';
import { useNavigate } from 'react-router-dom';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import { useMediaQuery } from 'react-responsive';
import { ConversaModel, MensagemEnviada, MensagemRecebida } from '../../models/ConversaModel';
import { CaixaDeMensagemContext } from '../../contexts/CaixaDeMensagemContext';
import { ControleLoginContext } from '../../contexts/ControleLoginContext';
import { LoginService } from '../../services/LoginService';

export default function MensagensMobile() {
    const conversa1 = new ConversaModel(
        'Maria Almeida',
        './imagensDinamicas/perfil2.jpg',
        '10 minutos',
        [
            new MensagemRecebida(
                './imagensDinamicas/perfil2.jpg',
                'Bom dia Pedro!'
            ),
            new MensagemEnviada(
                './imagensDinamicas/perfil.jpg',
                'Bom dia Maria!'
            ),
        ]
    );

    const conversa2 = new ConversaModel(
        'Pedro souza',
        './imagensDinamicas/perfil.jpg',
        '1 hora',
        [
            new MensagemRecebida(
                './imagensDinamicas/perfil.jpg',
                'Bom dia Maria'
            ),
            new MensagemEnviada(
                './imagensDinamicas/perfil2.jpg',
                'Bom dia Pedro'
            ),
            new MensagemRecebida(
                './imagensDinamicas/perfil.jpg',
                'É você que está vendendo um carro?'
            ),
            new MensagemEnviada(
                './imagensDinamicas/perfil2.jpg',
                'Sim sou eu mesma.'
            ),
        ]
    );

    const { abrirChat } = useContext(CaixaDeMensagemContext);

    const navigate = useNavigate();

    const { permisaoParaIniciar, setPermisaoParaIniciar } = useContext(ControleLoginContext);

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    useEffect(() => {
        if (!isMobile) {
            navigate('/');
        }
    }, [isMobile]);

    useEffect(() => {
        LoginService.verificaSeHaLoginValido()
            .then(loginValido => {
                if (loginValido) {
                    setPermisaoParaIniciar(true);
                } else {
                    navigate('/login');
                }
            })
            .catch(() => { })
    }, [permisaoParaIniciar]);

    function clickAbrirConversa(conversa: ConversaModel) {
        abrirChat(conversa);
        navigate('/conversa');
    }

    return (
        permisaoParaIniciar &&
        <section id='mensagensPage' className='espacamentosParaCompensarPartesDoHeader'>
            <h3 id='mensagensMobile__titulo'>Mensagens</h3>
            <ul id='mensagensMobile__mensagens'>
                <li className='mensagensMobile__mensagem' onClick={() => clickAbrirConversa(conversa2)}>
                    <img src="/imagensDinamicas/perfil.jpg" alt="Foto de perfil" id="mensagemMobile__perfil" />
                    <div id='mensagemMobile__informacoesPessoa'>
                        <p id='mensagemMobile__informacoesPessoa__nome'>Pedro souza</p>
                        <p id='mensagemMobile__informacoesPessoa__ultimaMensagem'>Vou ir lá de tarde</p>
                    </div>
                </li>
                <li className='mensagensMobile__mensagem' onClick={() => clickAbrirConversa(conversa1)}>
                    <img src="/imagensDinamicas/perfil2.jpg" alt="Foto de perfil" id="mensagemMobile__perfil" />
                    <div id='mensagemMobile__informacoesPessoa'>
                        <p id='mensagemMobile__informacoesPessoa__nome'>Maria almeida</p>
                        <p id='mensagemMobile__informacoesPessoa__ultimaMensagem'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae unde qui reiciendis lorem</p>
                    </div>
                </li>
            </ul>
        </section>
    )
}
