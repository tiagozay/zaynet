import React, { useEffect } from 'react';
import './MensagensMobile.css';
import { useNavigate } from 'react-router-dom';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';

export default function MensagensMobile() {
    const navigate = useNavigate();

    useEffect(() => {
        verificaTamanhoDaTelaESaiDaRotaSeForMobile();

        const handleResize = () => verificaTamanhoDaTelaESaiDaRotaSeForMobile();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function verificaTamanhoDaTelaESaiDaRotaSeForMobile() {
        if (window.innerWidth > TAMANHO_DE_TELA_MOBILE) {
            navigate('/');
        }
    }

    return (
        <section id='mensagensPage' className='espacamentosParaCompensarPartesDoHeader'>
            <h3 id='mensagensMobile__titulo'>Mensagens</h3>
            <ul id='mensagensMobile__mensagens'>
                <li className='mensagensMobile__mensagem'>
                    <img src="/imagensDinamicas/perfil.jpg" alt="Foto de perfil" id="mensagemMobile__perfil" />
                    <div id='mensagemMobile__informacoesPessoa'>
                        <p id='mensagemMobile__informacoesPessoa__nome'>Pedro souza</p>
                        <p id='mensagemMobile__informacoesPessoa__ultimaMensagem'>Vou ir lá de tarde</p>
                    </div>
                </li>
                <li className='mensagensMobile__mensagem'>
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
