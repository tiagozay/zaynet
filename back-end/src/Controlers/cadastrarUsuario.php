<?php

use Tiagozay\BackEnd\Domain\Models\Usuario;
use Tiagozay\BackEnd\Helpers\EntityManagerCreator;
use Tiagozay\BackEnd\Services\LoginService;
use Tiagozay\BackEnd\Utils\APIResponse;
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
    $miniaturaFotoDoPerfil = isset($_FILES['miniaturaFotoDoPerfil']) ? $_FILES['miniaturaFotoDoPerfil'] : null;
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

        if ($miniaturaFotoDoPerfil) {
            $miniaturaFotoDoPerfil = new ArquivoUpado(
                $miniaturaFotoDoPerfil['name'],
                $miniaturaFotoDoPerfil['type'],
                $miniaturaFotoDoPerfil['size'],
                $miniaturaFotoDoPerfil['tmp_name'],
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
            $miniaturaFotoDoPerfil,
            $fotoDaCapa
        );

        $entityManager = EntityManagerCreator::create();

        //Antes de realizar a persistência do novo usuário, faz a busca pelo e-email na base para verificar se já esta cadatrado. (Relizamos a busca antes para que o e-mail recebido seja coerente com as regras de negócio)
        $usuarioRepository = $entityManager->getRepository(Usuario::class);

        $usuarioComEmail = $usuarioRepository->findOneBy(['email' => $email]);

        if($usuarioComEmail){
            throw new DomainException("Este e-mail já foi cadastrado");
        }    
        
        $entityManager->persist($usuario);

        $entityManager->flush();

        //Após o cadastro ser realizado, realiza o login do usuário.
        $dataLogin = LoginService::login($usuario, $senha);

        http_response_code(200);

        $response =  new APIResponse(
            true,
            false,
            "Usuário cadastrado com sucesso!",
            ['dataLogin' => $dataLogin]
        );
        echo json_encode($response);
    }catch( DomainException $e ){
        http_response_code(500);

        $response =  new APIResponse(
            false,
            true,
            $e->getMessage(),
        );
        echo json_encode($response);
    }catch (Throwable $e) {

        http_response_code(500);

        $response =  new APIResponse(
            false,
            false,
            "Erro inesperado ao cadastrar usuário: ".$e->getMessage() ,
        );
        echo json_encode($response);
    }
}