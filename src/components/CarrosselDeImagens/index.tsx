import React, { useRef } from 'react';
import './CarrosselDeImagens.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function CarrosselDeImagens() {
  const [indiceImagemAtual, setIndiceImagemAtual] = useState(0);
  const [imagensDoCarrossel, setImagensDoCarrossel] = useState<string[]>([]);
  const [indicadorImagensCarregadas, setIndicadorImagensCarregadas] = useState(false);

  const navigate = useNavigate();

  const container = useRef(null);

  useEffect(() => {

    let handleEscKey = (event: KeyboardEvent) => {
      event.key === 'Escape' && fechar();
    }

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  let paramsInfo;

  const params = useParams();

  useEffect(() => {
    if (params.objInfoCarrosel) {
      paramsInfo = JSON.parse(
        params.objInfoCarrosel
      ) as { imagensDoCarrossel: string[], indiceImagemInicial: number };
    } else {
      return;
    }

    setIndiceImagemAtual(paramsInfo.indiceImagemInicial);
    setImagensDoCarrossel(paramsInfo.imagensDoCarrossel);

  }, []);

  function clickNaImagem(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    const larguraImagem = Number(getComputedStyle(e.target as Element).width.replace("px", ''));
    const posicaoDoClique = e.nativeEvent.offsetX;

    if (posicaoDoClique > larguraImagem / 2) {
      avancarImagem();
    } else {
      voltarImagem();
    }

  }

  let touchStartX: null | number = null;

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;

    const touchCurrentX = e.touches[0].clientX;
    const deltaX = touchCurrentX - touchStartX;

    if (deltaX > 10) {
      voltarImagem();
    } else if (deltaX < -10) {
      avancarImagem();
    }

    touchStartX = null;
  };

  const handleTouchEnd = () => {
    touchStartX = null;
  };

  function fechar() {
    navigate(-1);
  }

  function selecionarImagemEspecifica(indiceImagem: number)
  {
    setIndiceImagemAtual(indiceImagem);
  }

  function avancarImagem() {
    if (indiceImagemAtual === imagensDoCarrossel.length - 1) {
      setIndiceImagemAtual(0);
      return;
    }
    setIndiceImagemAtual(state => state + 1);
  }

  function voltarImagem() {
    if (indiceImagemAtual === 0) {
      setIndiceImagemAtual(imagensDoCarrossel.length - 1);
      return;
    }
    setIndiceImagemAtual(state => state - 1);
  }

  function clickOverlay(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (event.target === container.current) {
      fechar();
    }
  }

  let contador = 0;
  function imagemCarregada() {
    contador++;

    //Valor multiplicado por 2 pois somente será totalmente carregado quando tanto as imagens normais quanto as previas forem carregadas
    const quantidadeDeImagensParaRenderizar = imagensDoCarrossel.length * 2;

    if (contador === quantidadeDeImagensParaRenderizar) {
      setIndicadorImagensCarregadas(true);
    }
  }

  return (
    <div id='carrosselImagens__overlay' onClick={clickOverlay} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>

      <div id='carrosselImagens__loader' className={`${indicadorImagensCarregadas ? 'displayNone' : ""}`}>
        <div id='laoder'>

        </div>
      </div>

      <div id='carrosselImagens__imagens' className={`${!indicadorImagensCarregadas ? 'displayNone' : ""}`}>
        <div id='divIconeFecharCarrossel'>
          <button className='material-symbols-outlined' id='divIconeFecharCarrossel__icone' onClick={fechar}>close</button>
        </div>
        <div id='carrosselImagens__imagens__container'  ref={container} >
          <button onClick={voltarImagem} className='material-symbols-outlined carrosselImagens__btnAvancarEVoltar '>arrow_back_ios</button>
          {
            imagensDoCarrossel.map((imagem: string, index: number) => {
              return <img
                key={index}
                src={imagem}
                alt="Imagem publicação"
                id="carrosselImagens__imagem"
                className={`${(index === indiceImagemAtual) && 'imagemExibida'}`}
                onLoad={imagemCarregada}
                onClick={clickNaImagem}
              />
            })
          }
          <button onClick={avancarImagem} className='material-symbols-outlined carrosselImagens__btnAvancarEVoltar'>arrow_forward_ios</button>
        </div>
        <div id='listaPreviasDasImagens'>
          {
            imagensDoCarrossel.map((imagem: string, index: number) => {
              return <img
                key={index}
                src={imagem}
                alt="Imagem publicação"
                id="listaPreviasDasImagens__imagem"
                className={`${(index === indiceImagemAtual) && 'listaPreviasDasImagens__imagemSelecionada'}`}
                onLoad={imagemCarregada}
                onClick={ () => selecionarImagemEspecifica(index)}
              />
            })
          }
        </div>

      </div>
    </div>

  )
}
