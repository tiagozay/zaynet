<?php

use Tiagozay\BackEnd\Domain\Models\Comentario;
use Tiagozay\BackEnd\Helpers\EntityManagerCreator;
use Tiagozay\BackEnd\Services\LoginService;
use Tiagozay\BackEnd\Utils\APIResponse;

require_once __DIR__ . '/../../vendor/autoload.php';

//Verificação realizada para que o código não seja executado em outros momentos (como quando rodar a CLI do doctrine), aí rodará somente quando for uma requisição HTTP com o método POST
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === "DELETE") {
    $authorizationHeader = $_SERVER['HTTP_AUTHORIZATION'];
    $token = str_replace('Bearer ', '', $authorizationHeader);

    try {
        if (!LoginService::verificaLogin($token)) {
            throw new Exception("Login inválido!");
        }

        $idUsuarioLogado = LoginService::obtemIdUsuarioLogado($token);

        $entityManager = EntityManagerCreator::create();

        /** @var Comentario */
        $comentario = $entityManager->find(Comentario::class, $idComentario);

        //Verificação para que somente autor do comentário ou autor da publicação consiga excluir comentário
        if (
            $comentario->getAutor()->getId() !== $idUsuarioLogado &&
            $comentario->getPublicacao()->getAutor()->getId() !== $idUsuarioLogado
        ) {
            throw new Exception("Sem permisão para excluir comentário");
        }

        $entityManager->remove($comentario);

        $entityManager->flush();

        http_response_code(200);
        $response =  new APIResponse(
            true,
            false,
            "Comentário removido com sucesso",
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

        $response =  new APIResponse(
            false,
            false,
            "Erro inesperado ao excluir comentário",
        );
        echo json_encode($response);
    }
}
