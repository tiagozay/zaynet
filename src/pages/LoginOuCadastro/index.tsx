import React, { useEffect, useState } from 'react';
import './LoginOuCadastro.css';
import ModalCadastrarUsuario from '../../components/ModalCadastrarUsuario';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import { useNavigate } from 'react-router-dom';

export default function LoginOuCadastro() {

    const [indicadorModalCadastrarAberto, setIndicadorModalCadastrarAberto] = useState(false);
    const [exibirSenha, setExibirSenha] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        verificaTamanhoDaTelaESaiDaRotaSeForMobile();

        const handleResize = () => verificaTamanhoDaTelaESaiDaRotaSeForMobile();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [indicadorModalCadastrarAberto]);

    function verificaTamanhoDaTelaESaiDaRotaSeForMobile() {
        console.log(indicadorModalCadastrarAberto);
        if (window.innerWidth <= TAMANHO_DE_TELA_MOBILE && indicadorModalCadastrarAberto) {
            console.log("Caiu!");
            navigate('/cadastrarUsuarioMobile');
            // setIndicadorModalCadastrarAberto(false);
        }
    }


    function handleExibirSenha() {
        setExibirSenha(state => !state);
    }

    function abrirModalCadastrarUsuario()
    {
        if(window.innerWidth < TAMANHO_DE_TELA_MOBILE){
            navigate('/cadastrarUsuarioMobile');
        }else{
            setIndicadorModalCadastrarAberto(true);
        }
    }

    function fecharModalCadastrarUsuario()
    {
        setIndicadorModalCadastrarAberto(false);
    }

    return (
        <>

            {
                indicadorModalCadastrarAberto ?
                <ModalCadastrarUsuario fecharModal={fecharModalCadastrarUsuario}/> :
                ""  
            }
           

            <section id='sectionLoginOuCadastroPage'>
                <form id='formularioDeLogin'>
                    <input type="email" placeholder='E-mail' />
                    <div id='divInputSenha' className='divInputSenhaLogin'>
                        <input type={exibirSenha ? "text" : "password"} placeholder='Senha' />
                        <button type='button' className='material-symbols-outlined' onClick={handleExibirSenha}>
                            {exibirSenha ? 'visibility_off' : 'visibility'}
                        </button>
                    </div>
                    <button type='button' id='btnLogin'>Entrar</button>
                    <button type='button' id='btnEsqueceuASenha'>Esqueceu a senha?</button>
                    <hr id='linhaDivisoria' />
                    <button type='button' id='btnCriarNovaConta' onClick={abrirModalCadastrarUsuario}>
                        Criar nova conta
                    </button>
                </form>
            </section>
        </>

    )
}
