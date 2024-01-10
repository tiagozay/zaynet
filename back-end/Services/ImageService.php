<?php
class ImagemService
{   
    static public function persisteImagemEGeraNome(ArquivoUpado $imagem, string $diretorio): string
    {
        $diretorio = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $diretorio);

        $novoNome = ImagemService::geraNomeParaImagem($imagem);

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

        $textoAleatorio = date('dmYHis' . uniqid());

        return $textoAleatorio . "." . $extencao;
    }
}
