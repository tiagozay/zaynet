<?php

use Tiagozay\BackEnd\Domain\Models\Usuario;
use Tiagozay\BackEnd\Helpers\EntityManagerCreator;
use Tiagozay\BackEnd\Utils\ArquivoUpado;

require_once __DIR__ . '/../../vendor/autoload.php';

//Verificação realizada para que o código não seja executado em outros momentos (como quando rodar a CLI do doctrine), aí rodará somente quando for uma requisição HTTP com o método POST
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === "POST") {
    $nome = $_POST['nome'];
    $sobrenome = $_POST['sobrenome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $dataDeNascimento = $_POST['dataDeNascimento'];
    $genero = $_POST['genero'];
    $cidadeNatal = $_POST['cidadeNatal'];
    $cidadeAtual = $_POST['cidadeAtual'];
    $statusDeRelacionamento = $_POST['statusDeRelacionamento'];
    $fotoDoPerfil = isset($_FILES['fotoDoPerfil']) ? $_FILES['fotoDoPerfil'] : null;
    $fotoDaCapa = isset($_FILES['fotoDaCapa']) ? $_FILES['fotoDaCapa'] : null;

    try {

        $dataDeNascimento = new DateTime($dataDeNascimento, new DateTimeZone('America/Sao_Paulo'));

        if ($fotoDoPerfil) {
            $fotoDoPerfil = new ArquivoUpado(
                $fotoDoPerfil['name'],
                $fotoDoPerfil['type'],
                $fotoDoPerfil['size'],
                $fotoDoPerfil['tmp_name'],
            );
        }

        if ($fotoDaCapa) {
            $fotoDaCapa = new ArquivoUpado(
                $fotoDaCapa['name'],
                $fotoDaCapa['type'],
                $fotoDaCapa['size'],
                $fotoDaCapa['tmp_name'],
            );
        }

        $usuario = new Usuario(
            $nome,
            $sobrenome,
            $email,
            $senha,
            $dataDeNascimento,
            $genero,
            $cidadeNatal,
            $cidadeAtual,
            $statusDeRelacionamento,
            $fotoDoPerfil,
            $fotoDaCapa
        );

        $entityManager = EntityManagerCreator::create();

        $entityManager->persist($usuario);

        $entityManager->flush();

        http_response_code(200);
        $resposnse = [
            'success' => true,
            'message' => "Usuário cadastrado com sucesso!"
        ];
        echo json_encode($resposnse);
    } catch (Throwable $e) {

        http_response_code(500);
        $resposnse = [
            'success' => false,
            'message' => "Erro ao cadastrar usuário: "
        ];
        echo json_encode($resposnse);
    }
}