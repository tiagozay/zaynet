import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import { APIService } from '../../services/APIService';
import { PublicacaoFactory } from '../../services/PublicacaoFactory';
import { FeedContext } from '../../contexts/FeedContext';
import { PublicacaoModel } from '../../models/Publicacao/PublicacaoModel';
import { PublicacaoCompartilhadaModel } from '../../models/Publicacao/PublicacaoCompartilhadaModel';
import ListaDePublicacoes from '../../components/ListaDePublicacoes';

export default function Home() {

  const { posicaoFeed } = useContext(FeedContext);

  const [publicacoes, setPublicacoes] = useState<Array<PublicacaoModel | PublicacaoCompartilhadaModel>>();

  useEffect(() => {
    //Toda vez que cair nesta página Home ou mudar o state de publicacoes, buscará a posição do feed que está armazenada no contexto. Esta posição é gravada toda vez que nevegamos desta página home para outra, aí quando volta para cá, já se sabe a posição anterior e retorna para ela (este armazenamento é feito nas publicações, pois é nelas que ocorrem essas mudanças, como ao abrir carrossel de imagens, clicar em compartilhar(para mobile), clicar em editar (para mobile))
    window.scrollTo(0, posicaoFeed);
  }, [publicacoes]);

  useEffect(() => {
    APIService.get('publicacoes')
      .then(res => {

        if (!res.data) {
          return;
        }

        const objetosPublicacoes = res.data;

        const publicacoesMapeadas = objetosPublicacoes.map((objetoPublicacao: any) => {

          return PublicacaoFactory.create(objetoPublicacao);

        });

        setPublicacoes(publicacoesMapeadas);

      })
      .catch(() => { });
  }, []);

  return (
    <>
      <section id='feed'>
        {
          publicacoes &&
          <ListaDePublicacoes
            publicacoesParaListar={publicacoes}
          />
        }
      </section>
    </>
  )
}
