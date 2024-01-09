import React, { useEffect, useRef, useState } from 'react';
import './ModalEditarInformacoesDoPerfil.css';
import { ArquivosPublicacaoService } from '../../services/ArquivosPublicacaoService';
import ModalDeConfirmacao from '../ModalDeConfirmacao';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';

interface ModalEditarPerfilProps {
  modalAberto: boolean,
  fecharModal: () => void
}

export default function ModalEditarInformacoesDoPerfil({ modalAberto, fecharModal }: ModalEditarPerfilProps) {

  //Mocks provisórios que indicam se existe foto de capa ou perfil, já que elas não são obrigatórias. Futuramente estes dados virão do back-end
  const indicadorExisteFotoDaCapa = true;
  const indicadorExisteFotoDoPerfil = true;

  const informacoesUsuario = {
    fotoPerfil: './imagensDinamicas/perfil.jpg',
    fotoCapa: './imagensDinamicas/perfil.jpg',
    nome: "Pedro",
    sobrenome: "Souza",
    dataDeNascimento: "1970-08-20",
    genero: "Masculino",
    cidadeNatal: "São paulo",
    cidadeAtual: "Cruz machado",
    statusDeRelacionamento: "Solteiro",
  }

  const overlay = useRef(null);
  const inputPerfilRef = useRef<HTMLInputElement | null>(null);
  const inputCapaRef = useRef<HTMLInputElement | null>(null);

  const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

  const [indicadorModificacaoRealizada, setIndicadorModificacaoRealizada] = useState(false);
  const [indicadorModalConfirmacaoDescarteAberto, setIndicadorModalConfirmacaoDescarteAberto] = useState(false);

  const [novaFotoPerfil, setNovaFotoPerfil] = useState<File | null>(null);
  const [novaFotoCapa, setNovaFotoCapa] = useState<File | null>(null);
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [dataDeNascimento, setDataDeNascimento] = useState("");
  const [genero, setGenero] = useState("");
  const [cidadeNatal, setCidadeNatal] = useState("");
  const [cidadeAtual, setCidadeAtual] = useState("");
  const [statusDeRelacionamento, setStatusDeRelacionamento] = useState("");

  const [novaFotoPerfilPrevia64, setNovaFotoPerfilPrevia64] = useState<string | null>(null);
  const [novaFotoCapaPrevia64, setNovaFotoCapaPrevia64] = useState<string | null>(null);

  useEffect(() => {
    setNome(informacoesUsuario.nome);
    setSobrenome(informacoesUsuario.sobrenome);
    setDataDeNascimento(informacoesUsuario.dataDeNascimento);
    setGenero(informacoesUsuario.genero);
    setCidadeNatal(informacoesUsuario.cidadeNatal);
    setCidadeAtual(informacoesUsuario.cidadeAtual);
    setStatusDeRelacionamento(informacoesUsuario.statusDeRelacionamento);
  }, [modalAberto]);

  useEffect(() => {
    if (
      novaFotoPerfil !== null ||
      novaFotoCapa !== null ||
      nome !== informacoesUsuario.nome ||
      sobrenome !== informacoesUsuario.sobrenome ||
      dataDeNascimento !== informacoesUsuario.dataDeNascimento ||
      genero !== informacoesUsuario.genero ||
      cidadeNatal !== informacoesUsuario.cidadeNatal ||
      cidadeAtual !== informacoesUsuario.cidadeAtual ||
      statusDeRelacionamento !== informacoesUsuario.statusDeRelacionamento
    ) {
      setIndicadorModificacaoRealizada(true);
    } else {
      setIndicadorModificacaoRealizada(false);
    }
  }, [
    novaFotoPerfil,
    novaFotoCapa,
    nome,
    sobrenome,
    dataDeNascimento,
    genero,
    cidadeNatal,
    cidadeAtual,
    statusDeRelacionamento
  ]);

  useEffect(() => {
    if (novaFotoPerfil) {
      ArquivosPublicacaoService.transformaFileEmBase64(novaFotoPerfil)
        .then(src => setNovaFotoPerfilPrevia64(src));
    } else {
      setNovaFotoPerfilPrevia64(null);
    }
  }, [novaFotoPerfil]);

  useEffect(() => {
    if (novaFotoCapa) {
      ArquivosPublicacaoService.transformaFileEmBase64(novaFotoCapa)
        .then(src => setNovaFotoCapaPrevia64(src));
    } else {
      setNovaFotoCapaPrevia64(null);
    }
  }, [novaFotoCapa]);

  useEffect(() => {
    if (isMobile) {
      fecharModal();
    }
  }, [isMobile]);

  function salvarAlteracoes() {

  }

  function fechaEdicao() {
    if (indicadorModificacaoRealizada) {
      abrirModalConfirmacaoDeDescarte();
    } else {
      fecharModal();
    }
  }

  function confirmarDescarte() {
    fecharModal();
  }

  function abrirModalConfirmacaoDeDescarte() {
    setIndicadorModalConfirmacaoDescarteAberto(true);
  }

  function fecharModalConfirmacaoDeDescarte() {
    setIndicadorModalConfirmacaoDescarteAberto(false);
  }

  function clickOverlay(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (event.target === overlay.current) {
      fechaEdicao();
    }
  }

  function clickEditarPerfil() {
    inputPerfilRef.current?.click();
  }

  function clickEditarCapa() {
    inputCapaRef.current?.click();
  }

  function aoSelecionarNovoPerfil(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files as FileList;
    setNovaFotoPerfil(fileList[0]);
  }

  function aoSelecionarNovaCapa(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files as FileList;
    setNovaFotoCapa(fileList[0]);
  }

  function aoDigitarNome(e: React.ChangeEvent<HTMLInputElement>) {
    setNome(e.target.value);
  }

  function aoDigitarSobrenome(e: React.ChangeEvent<HTMLInputElement>) {
    setSobrenome(e.target.value);
  }

  function aoDigitarDataDeNascimento(e: React.ChangeEvent<HTMLInputElement>) {
    setDataDeNascimento(e.target.value);
  }

  function aoSelecionarGenero(e: React.ChangeEvent<HTMLInputElement>) {
    setGenero(e.target.value);
  }

  function aoDigitarCidadeNatal(e: React.ChangeEvent<HTMLInputElement>) {
    setCidadeNatal(e.target.value);
  }

  function aoDigitarCidadeAtual(e: React.ChangeEvent<HTMLInputElement>) {
    setCidadeAtual(e.target.value);
  }

  function aoSelecionarStatusDeRelacionamento(e: React.ChangeEvent<HTMLSelectElement>) {
    setStatusDeRelacionamento(e.target.value);
  }

  return (
    <>
      {
        indicadorModalConfirmacaoDescarteAberto ?
          <ModalDeConfirmacao
            aoConfirmar={confirmarDescarte}
            fecharModal={fecharModalConfirmacaoDeDescarte}
            titulo='Descartar alterações?'
            mensagem='Deseja mesmo descartar as alterações?'
            modalAberto={indicadorModalConfirmacaoDescarteAberto}
          /> : ""
      }

      <div id="modalEditarPerfil__overlay" ref={overlay} onClick={clickOverlay}>
        <div id="modalEditarPerfil">
          <div id='modalEditarPerfil__tituloEBtnDeFechar'>
            <h3 id='modalEditarPerfil__tituloModal'>Editar perfil</h3>
            <button
              id='modalEditarPerfil__btnFechar'
              className='material-symbols-outlined'
              onClick={fechaEdicao}
            >close</button>
          </div>
          <div id='modalEditarPerfil__container'>

            <div id='modalEditarPerfil__container__inputs'>
              <div id='modalEditarPerfil__divCampoImagem'>
                <div id='modalEditarPerfil__divCampoImagem__tituloEBtnDeEditar'>
                  <h3 id='modalEditarPerfil__tituloEBtnDeEditar__titulo'>Foto do perfil</h3>
                  <button id='modalEditarPerfil__tituloEBtnDeEditar__btnEditar' onClick={clickEditarPerfil}>
                    Editar
                  </button>
                </div>
                <input type="file" hidden ref={inputPerfilRef} onChange={aoSelecionarNovoPerfil} />
                {
                  indicadorExisteFotoDoPerfil ?
                    <img
                      src={novaFotoPerfilPrevia64 ? novaFotoPerfilPrevia64 : informacoesUsuario.fotoPerfil}
                      alt="Imagem perfil"
                      id='modalEditarPerfil__divCampoImagem__perfil'
                    /> :
                    <div id='modalEditarPerfil__divCampoImagem__perfil'>

                    </div>
                }
              </div>

              <div id='modalEditarPerfil__divCampoImagem'>
                <div id='modalEditarPerfil__divCampoImagem__tituloEBtnDeEditar'>
                  <h3 id='modalEditarPerfil__tituloEBtnDeEditar__titulo'>Foto da capa</h3>
                  <button id='modalEditarPerfil__tituloEBtnDeEditar__btnEditar' onClick={clickEditarCapa}>
                    Editar
                  </button>
                </div>
                <input type="file" hidden ref={inputCapaRef} onChange={aoSelecionarNovaCapa} />
                {
                  indicadorExisteFotoDaCapa ?
                    <img
                      src={novaFotoCapaPrevia64 ? novaFotoCapaPrevia64 : informacoesUsuario.fotoCapa}
                      alt="Imagem capa"
                      id='modalEditarPerfil__divCampoImagem__capa'
                    /> :
                    <div id='modalEditarPerfil__divCampoImagem__capa'>

                    </div>
                }
              </div>

              <div id='modalEditarPerfil__divCampoTexto'>
                <label
                  id='modalEditarPerfil__divCampoTextoLabel'
                  htmlFor='modalEditarPerfil__divCampoTextoInput'
                >Nome</label>
                <input type="text" id='modalEditarPerfil__divCampoTextoInput' onChange={aoDigitarNome} value={nome} />
              </div>

              <div id='modalEditarPerfil__divCampoTexto'>
                <label
                  id='modalEditarPerfil__divCampoTextoLabel'
                  htmlFor='modalEditarPerfil__divCampoTextoInput'
                >Sobrenome</label>
                <input type="text" id='modalEditarPerfil__divCampoTextoInput' onChange={aoDigitarSobrenome} value={sobrenome} />
              </div>

              <div id='modalEditarPerfil__divCampoTexto'>
                <label
                  id='modalEditarPerfil__divCampoTextoLabel'
                  htmlFor='modalEditarPerfil__divCampoTextoInput'
                >Data de nascimento</label>
                <input type="date" id='modalEditarPerfil__divCampoTextoInput' onChange={aoDigitarDataDeNascimento} value={dataDeNascimento} />
              </div>

              <div id='modalEditarPerfil__divCampoTexto'>
                <label
                  id='modalEditarPerfil__divCampoTextoLabel'
                  htmlFor='modalEditarPerfil__divCampoTextoInput'
                >Gênero</label>

                <div id='modalEditarPerfil__divInputsRadio'>
                  <label id='modalEditarPerfil__labelInputRadioGenero'>
                    Feminino
                    <input type="radio" name='editarPerfil__genero' value="Feminino" checked={genero === "Feminino"} onChange={aoSelecionarGenero} />
                  </label>

                  <label id='modalEditarPerfil__labelInputRadioGenero'>
                    Masculino
                    <input type="radio" name='editarPerfil__genero' value="Masculino" checked={genero === "Masculino"} onChange={aoSelecionarGenero} />
                  </label>
                </div>
              </div>
              <div id='modalEditarPerfil__divCampoTexto'>
                <label
                  id='modalEditarPerfil__divCampoTextoLabel'
                  htmlFor='modalEditarPerfil__divCampoTextoInput'
                >Cidade natal</label>
                <input type="text" id='modalEditarPerfil__divCampoTextoInput' value={cidadeNatal} onChange={aoDigitarCidadeNatal} />
              </div>

              <div id='modalEditarPerfil__divCampoTexto'>
                <label
                  id='modalEditarPerfil__divCampoTextoLabel'
                  htmlFor='modalEditarPerfil__divCampoTextoInput'
                >Cidade atual</label>
                <input type="text" id='modalEditarPerfil__divCampoTextoInput' value={cidadeAtual} onChange={aoDigitarCidadeAtual} />
              </div>

              <div id='modalEditarPerfil__divCampoTexto'>
                <label
                  id='modalEditarPerfil__divCampoTextoLabel'
                  htmlFor='modalEditarPerfil__divCampoTextoInput'
                >Status de relacionamento</label>
                <select id='modalEditarPerfil__divCampoTextoSelect' value={statusDeRelacionamento} onChange={aoSelecionarStatusDeRelacionamento} >
                  <option value="Solteiro">Solteiro</option>
                  <option value="Namorando">Namorando</option>
                  <option value="Noivo">Noivo</option>
                  <option value="Casado">Casado</option>
                  <option value="Separado">Separado</option>
                  <option value="Viúvo">Viúvo</option>
                </select>
              </div>
            </div>
            <button
              id='modalEditarPerfil__btnSalvar'
              disabled={!indicadorModificacaoRealizada}
              className={!indicadorModificacaoRealizada ? "modalEditarPerfil__btnSalvarInativo" : ""}
              onClick={salvarAlteracoes}
            >Salvar</button>
          </div>
        </div>
      </div>
    </>

  )
}
