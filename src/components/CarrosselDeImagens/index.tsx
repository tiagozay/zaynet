import React, { useRef } from 'react';
import './CarrosselDeImagens.css';
import { useCarrosselContext } from '../../contexts/CarrosselDeImagens';
import { useState, useEffect } from 'react';

export default function CarrosselDeImagens() {

  const overlay = useRef(null);

  const [indicadorImagensCarregadas, setIndicadorImagensCarregadas] = useState(false);

  const {
    carrosselAberto,
    imagensDoCarrossel,
    indiceImagemAtual,
    setIndiceImagemAtual,
    fechar
  } = useCarrosselContext();


  useEffect(() => {
    document.addEventListener('keydown', (event: KeyboardEvent) => event.key === 'Escape' && fechar());
  }, []);


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
    if (event.target === overlay.current) {
      fechar();
    }
  }

  let contador = 0;
  function imagemCarregada() {
    contador++;
    if (contador === imagensDoCarrossel.length) {
      setIndicadorImagensCarregadas(true);
    }
  }

  return (

    carrosselAberto &&

    <div id='carrosselImagens__overlay' onClick={clickOverlay} ref={overlay} >

      <div id='carrosselImagens__loader' className={`${indicadorImagensCarregadas && 'displayNone'}`}>
        <div id='laoder'>

        </div>
      </div>

      <div id='carrosselImagens__imagens' className={`${!indicadorImagensCarregadas && 'displayNone'}`}>
        <button onClick={voltarImagem}>Voltar</button>
        {
          imagensDoCarrossel.map((imagem, index) => {
            return <img
              key={index}
              src={imagem}
              alt="Imagem publicação"
              id="carrosselImagens__imagem"
              className={`${(index === indiceImagemAtual) && 'imagemExibida'}`}
              onLoad={imagemCarregada}
            />
          })
        }
        <button onClick={avancarImagem}>Avançar</button>
      </div>


    </div>

  )
}
