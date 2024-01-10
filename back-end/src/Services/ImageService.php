<?php

namespace Tiagozay\BackEnd\Services;

use Tiagozay\BackEnd\Utils\ArquivoUpado;

class ImageService
{   
    static public function persisteImagemEGeraNome(ArquivoUpado $imagem, string $diretorio): string
    {
        $diretorio = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $diretorio);

        $novoNome = ImageService::geraNomeParaImagem($imagem);

        move_uploaded_file(
            $imagem->tmp_name,
            $diretorio.$novoNome
        );

        return $novoNome;
    }

    static public function geraNomeParaImagem(ArquivoUpado $imagem): string
    {
        $nomeSeparadoPorPontos = explode('.', $imagem->name);
        $extencao = end($nomeSeparadoPorPontos);

        $textoAleatorio = bin2hex(random_bytes(8));

        return $textoAleatorio . "." . $extencao;
    }
}
