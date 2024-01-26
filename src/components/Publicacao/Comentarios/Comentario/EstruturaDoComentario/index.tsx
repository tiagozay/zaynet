import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import InputComentario from '../../InputComentario';
import './EstruturaDoComentario.css';

interface EstruturaDoComentarioProps {
    perfilUsuario: string;
    nomeUsuario: string;
    comentario: string;
    ehUmaResposta: boolean;
    clickResponderComentario?: () => void
}

export default function EstruturaDoComentario({
    perfilUsuario,
    nomeUsuario,
    comentario,
    ehUmaResposta,
    clickResponderComentario
}: EstruturaDoComentarioProps) {
    //Mock que será removido quando tiver sistema de login
    const usuarioLogado = true;

    const [quantidadeDeCurtidas, setQuantidadeDeCurtidas] = useState(2);

    const [usuarioJaCurtiuOComentario, setUsuarioJaCurtiuOComentario] = useState(false);
    const [indicadorEdicao, setIndicadorEdicao] = useState(false);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const [novoComentarioDigitado, setNovoComentarioDigitado] = useState("");

    useEffect(() => {
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                fecharEdicao();
            }
        })
    }, []);

    function clickEmCurtir() {
        if (usuarioJaCurtiuOComentario) {
            setQuantidadeDeCurtidas(quantidadeDeCurtidas - 1);
        } else {
            setQuantidadeDeCurtidas(quantidadeDeCurtidas + 1);
        }
        setUsuarioJaCurtiuOComentario(!usuarioJaCurtiuOComentario);

    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [indicadorEdicao]);

    function clickEmEditar() {
        setIndicadorEdicao(true);
    }

    function fecharEdicao() {
        setIndicadorEdicao(false);
    }


    return (
        <div id='comentario__container'>
            <img src={perfilUsuario} alt="Perfil usuário" className='comentario__perfil' />
            <div className='areaComentarios__comentario__conteudo'>
                {
                    indicadorEdicao ?
                        <div id='comentario__divInputEditarComentario'>
                            <InputComentario
                                ref={inputRef}
                                novoComentarioDigitado={novoComentarioDigitado}
                                setNovoComentarioDigitado={setNovoComentarioDigitado}
                                clickEnviarComentario={() => {}}
                            />
                            <p id="editarComentario__textoCancelar">
                                Pressione Esc para
                                <button onClick={fecharEdicao}>cancelar</button>
                            </p>
                        </div> :
                        <>
                            <div className='comenario__nomeEComentario'>
                                <span className='comentario__nome'>{nomeUsuario}</span>
                                <p className='comentario__conteudo'>{comentario}</p>
                            </div>

                            <div className='comentario__opcoes'>
                                <button className={`
                            comentario__opcao 
                            ${usuarioJaCurtiuOComentario && 'btnDeCurtirJaPrecionado'}
                        `}
                                    id='comentario__opcaoLike'
                                    onClick={clickEmCurtir}
                                >
                                    Curtir
                                    (<span id='comentario__opcaoLike__quantidade'>{quantidadeDeCurtidas}</span>)
                                </button>

                                {
                                    !ehUmaResposta ?
                                        <button className='comentario__opcao' onClick={clickResponderComentario}>
                                            Responder
                                        </button> :
                                        ""
                                }

                                {
                                    usuarioLogado &&
                                    <>
                                        <button className='comentario__opcao' onClick={clickEmEditar}>Editar</button>
                                        <button className='comentario__opcao' id='comentario__opcaoExcluir'>Excluir</button>
                                    </>
                                }
                            </div>
                        </>
                }
            </div>
        </div>
    )
}
