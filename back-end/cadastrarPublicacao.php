<?php
header("Access-Control-Allow-Origin: *"); // Permitir qualquer origem
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Verifica se foi enviado algum arquivo
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_FILES['arquivos'])) {

    $diretorioParaImagensNormais = 'midiasDinamicas/publicacoes/normais/';
    $diretorioParaMiniaturas = 'midiasDinamicas/publicacoes/miniaturas/';

    $arquivos = organizaArrayDeArquivosDeOutraForma($_FILES['arquivos']);

    for($i = 0; $i < count($arquivos); $i++){

        if($i % 2 === 0){
            move_uploaded_file(
                $arquivos[$i]['tmp_name'], 
                $diretorioParaImagensNormais.$arquivos[$i]['name']
            );
        }else{
            move_uploaded_file(
                $arquivos[$i]['tmp_name'], 
                $diretorioParaMiniaturas.$arquivos[$i]['name']
            ); 
        }
        
    }
} else {
    echo "Nenhum arquivo enviado.";
}

function organizaArrayDeArquivosDeOutraForma($arquivos)
{
    $novoArray = [];

    for($i = 0; $i < count($arquivos['name']); $i++){
        $novoArray[] = [
            'name' => $arquivos['name'][$i],
            'full_path' => $arquivos['full_path'][$i],
            'type' => $arquivos['type'][$i],
            'tmp_name' => $arquivos['tmp_name'][$i],
            'error' => $arquivos['error'][$i],
            'size' => $arquivos['size'][$i],
        ];
    }

    return $novoArray;
}

// if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['arquivos'])) {
//     $targetDir = 'midiasDinamicas/publicacoes/miniaturas/';
//     $targetFile = $targetDir . basename($_FILES['arquivos']['name']);
//     move_uploaded_file($_FILES['arquivos']['tmp_name'], $targetFile);
// } else {
//     echo "Nenhum arquivo enviado.";
// }
?>
