import React, { useEffect, useState } from 'react';
import logo from './logo.jpg';
import './LogoEInputPesquisa.css';
import { Link } from 'react-router-dom';
import { TAMANHO_DE_TELA_MOBILE } from '../../../config';
import { useMediaQuery } from 'react-responsive';

export default function LogoEInputPesquisa() {

    const [indicadorLayoutMobile, setIndicadorLayoutMobile] = useState(false);

    const isMobile = useMediaQuery({maxWidth: TAMANHO_DE_TELA_MOBILE});

    useEffect(() => {
        if(isMobile){
            setIndicadorLayoutMobile(true);
        }else{
            setIndicadorLayoutMobile(false);
        }
    }, [isMobile]);

    return (
        <div id='containerLogoEInput'>
            <img src={logo} alt="Logo ZayNet" id='logoHeader' />
            <div id='divInputPesquisarHeader'>

                {
                    indicadorLayoutMobile ?
                        <Link to="/pesquisar" className='material-symbols-outlined'>
                            search
                        </Link> :
                        <i className='material-symbols-outlined'>search</i>
                }

                <input type="text" placeholder='Pesquisar no ZayNet' id='inputPesquisarHeader' />
            </div>
        </div>
    )
}
