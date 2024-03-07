<?php

use Tiagozay\BackEnd\Domain\Models\SolicitacaoDeAmizade;
use Tiagozay\BackEnd\Domain\Models\Usuario;
use Tiagozay\BackEnd\Helpers\EntityManagerCreator;
use Tiagozay\BackEnd\Services\LoginService;
use Tiagozay\BackEnd\Utils\APIResponse;

require_once __DIR__ . '/../../vendor/autoload.php';

//Verificação realizada para que o código não seja executado em outros momentos (como quando rodar a CLI do doctrine), aí rodará somente quando for uma requisição HTTP com o método POST
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === "POST") {
    $authorizationHeader = $_SERVER['HTTP_AUTHORIZATION'];
    $token = str_replace('Bearer ', '', $authorizationHeader);

    try {
        if (!LoginService::verificaLogin($token)) {
            throw new Exception("Login inválido!");
        }

        $idAutor = LoginService::obtemIdUsuarioLogado($token);

        $entityManager = EntityManagerCreator::create();

        /** @var Usuario */
        $autor = $entityManager->find(Usuario::class, $idAutor);

        if(!$autor){
            throw new DomainException("Autor não encontrado");
        }

        /** @var Usuario */
        $alvo = $entityManager->find(Usuario::class, $idUsuario);

        $solicitacao = new SolicitacaoDeAmizade($alvo, $autor);

        $entityManager->persist($solicitacao);

        $entityManager->flush();

        http_response_code(200);
        $response =  new APIResponse(
            true,
            false,
            "Solicitação de amizade enviada com sucesso",
        );
        echo json_encode($response);
    } catch (DomainException $e) {
        http_response_code(500);

        $response =  new APIResponse(
            false,
            true,
            $e->getMessage(),
        );
        echo json_encode($response);
    } catch (Throwable $e) {

        http_response_code(500);

        print_r($e->getMessage());

        exit();

        $response =  new APIResponse(
            false,
            false,
            "Erro inesperado ao enviar solicitação de amizade ".$e->getTrace(),
        );
        echo json_encode($response);
    }
}
