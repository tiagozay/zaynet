import React, { useEffect, useState } from 'react';
import './EditarPublicacaoMobile.css';
import { useNavigate } from 'react-router-dom';
import SelecionarArquivos from '../../components/SelecionarArquivos';
import { MidiaPublicacaoModel } from '../../models/MidiaPublicacaoModel';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';

export default function EditarPublicacaoMobile() {

    //Mock provisório de uma publicação. Posteriormente ela virá do redux ou algo semelhante.
    const publicacao = {
        texto: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, distinctio autem? Magnam autem quisquam voluptates eius cupiditate. Sapiente blanditiis obcaecati natus, similique, repellendus ipsum ipsam dicta eos consequatur, distinctio soluta?",
        midias: [
            new MidiaPublicacaoModel(
                '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub1.jpg',
                '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub1.jpg',
            ),
            new MidiaPublicacaoModel(
                '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub2.jpg',
                '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub2.jpg',
            ),
            new MidiaPublicacaoModel(
                '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub3.jpg',
                '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub3.jpg',
            ),
            new MidiaPublicacaoModel(
                '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub4.jpg',
                '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub4.jpg',
            ),
            new MidiaPublicacaoModel(
                '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub5.jpg',
                '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub5.jpg',
            ),
            new MidiaPublicacaoModel(
                '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub6.mp4',
                '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub6.jpg',
            ),
        ]
    }

    const [permisaoParaSalvarEdicao, setPermisaoParaSalvarEdicao] = useState(false);
    const [indicadorInputImagensEVideosAberto, setIndicadorInputImagensEVideosAberto] = useState(false);

    const [textoDaPublicacao, setTextoDaPublicacao] = useState<string | null>(null);
    const [novosArquivosSelecionados, setNovosArquivosSelecionados] = useState<FileList | null>(null);

    const isMobile = useMediaQuery({maxWidth: TAMANHO_DE_TELA_MOBILE});

    const navigate = useNavigate();

    useEffect(() => {
        setIndicadorInputImagensEVideosAberto(false);
        setPermisaoParaSalvarEdicao(false);
        setTextoDaPublicacao(publicacao.texto);
        setNovosArquivosSelecionados(null);
    }, []);

    useEffect(() => {
        if(!isMobile){
            navigate(-1);
        }
    }, [isMobile])

    function aoDigitarTexto(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setTextoDaPublicacao(e.target.value);
    }

    function aoClicarEmVoltar() {
        navigate(-1);
    }

    function abrirInputImagensEVideos() {
        setIndicadorInputImagensEVideosAberto(true);
    }

    function fecharInputImagensEVideos() {
        setIndicadorInputImagensEVideosAberto(false);
    }

    return (
        <div id="editarPublicacaoMobile__page">
            <div id="editarPublicacaoMobile__cabecalho">
                <div id="editarPublicacaoMobile__cabecalho__container">
                    <button
                        onClick={aoClicarEmVoltar}
                        className='material-symbols-outlined'
                        id='editarPublicacaoMobile__btnVoltar'
                    >arrow_back</button>
                    <h3 id="editarPublicacaoMobile__titulo">Editar publicação</h3>
                </div>
                <button
                    id="editarPublicacaoMobile__btnPublicar"
                    disabled={!permisaoParaSalvarEdicao}
                    className={!permisaoParaSalvarEdicao ? "editarPublicacaoMobile__btnPublicarInativo" : ""}
                >SALVAR</button>
            </div>

            <div id="editarPublicacaoMobile__container">
                <div id="editarPublicacaoMobile__divPerfilENomeUsuario">
                    <img
                        src="./imagensDinamicas/perfil.jpg"
                        alt="Perfil usuário"
                        id="editarPublicacaoMobile__divPerfilENomeUsuario__perfil"
                    />
                    <p
                        id="editarPublicacaoMobile__divPerfilENomeUsuario__nome"
                    >Pedro souza</p>
                </div>

                <textarea
                    id="editarPublicacaoMobile__campoTexto"
                    placeholder='No que você está pensando, Pedro?'
                    onChange={aoDigitarTexto}
                    value={textoDaPublicacao ? textoDaPublicacao : ""}
                    spellCheck={false}
                >
                </textarea>

                <div id='editarPublicacaoMobile__midiasDaPublicacao'>
                    <ul id='editarPublicacaoMobile__midiasDaPublicacao__listaMidias'>

                        {
                            publicacao.midias.map( (midia, index) => {
                                return (
                                    <li id='editarPublicacaoMobile__midiasDaPublicacao__midia' key={index}>
                                        <div id='editarPublicacaoMobile__midiasDaPublicacao__midiaOvelay'>
                                            <button
                                                className='material-symbols-outlined'
                                                id='editarPublicacaoMobile__btnExcluirMidia'
                                            >close</button>
                                        </div>
                                        <img
                                            src={midia.caminhoMidiaMiniatura}
                                            alt="Midia publicacao"
                                        />
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>

                {
                    indicadorInputImagensEVideosAberto &&
                    <SelecionarArquivos
                        fecharInput={fecharInputImagensEVideos}
                        setArquivosSelecionados={setNovosArquivosSelecionados}
                    />
                }

            </div>

            <div id="editarPublicacaoMobile__divIconeFotoOuVideo" className={indicadorInputImagensEVideosAberto ? 'displayNone' : ""}>
                <button onClick={abrirInputImagensEVideos}>
                    <img src="./icones/imagemIcone.png" alt="" />
                </button>
            </div>

        </div>
    )
}
