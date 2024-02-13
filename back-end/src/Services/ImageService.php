<?php

namespace Tiagozay\BackEnd\Services;

use Tiagozay\BackEnd\Utils\ArquivoPublicacao;
use Tiagozay\BackEnd\Utils\ArquivoUpado;

abstract class ImageService
{
    static public function persisteImagemEGeraNome(ArquivoUpado $imagem, string $diretorio): string
    {
        $diretorio = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $diretorio);

        $novoNome = ImageService::geraNomeParaMidia($imagem);

        move_uploaded_file(
            $imagem->tmp_name,
            $diretorio . $novoNome
        );

        return $novoNome;
    }

    static public function persisteMidiaBinariaPublicacaoEGeraNome(
        ArquivoPublicacao $arquivo,
        string $diretorio
    ): string {
        $diretorio = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $diretorio);

        $novoNome = ImageService::geraNomeParaMidiaBase64($arquivo->fileBase64);

        file_put_contents(
            $diretorio.$novoNome,
            $arquivo->fileDecodificado
        );

        return $novoNome;
    }

    static public function geraNomeParaMidia(ArquivoUpado $imagem): string
    {
        $nomeSeparadoPorPontos = explode('.', $imagem->name);
        $extencao = end($nomeSeparadoPorPontos);

        $textoAleatorio = bin2hex(random_bytes(8));

        return $textoAleatorio . "." . $extencao;
    }

    static public function geraNomeParaMidiaBase64(string $arquivoBase64): string
    {
        preg_match('/^data:(.*?);base64,/', $arquivoBase64, $matches);

        $extencao = explode("/", $matches[1])[1];

        $textoAleatorio = bin2hex(random_bytes(8));

        return $textoAleatorio . "." . $extencao;
    }

    static public function removeImagemDoDiretorio(string $diretorioDoArquivo)
    {
        unlink($diretorioDoArquivo);
    }
}
