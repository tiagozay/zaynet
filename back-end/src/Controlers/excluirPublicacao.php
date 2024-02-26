<?php

use Tiagozay\BackEnd\Domain\Models\Publicacao;
use Tiagozay\BackEnd\Helpers\EntityManagerCreator;
use Tiagozay\BackEnd\Services\ImageService;
use Tiagozay\BackEnd\Services\LoginService;
use Tiagozay\BackEnd\Utils\APIResponse;

require_once __DIR__ . '/../../vendor/autoload.php';

//Verificação realizada para que o código não seja executado em outros momentos (como quando rodar a CLI do doctrine), aí rodará somente quando for uma requisição HTTP com o método DELETE
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === "DELETE") {
    $authorizationHeader = $_SERVER['HTTP_AUTHORIZATION'];
    $token = str_replace('Bearer ', '', $authorizationHeader);

    try {
        if (!LoginService::verificaLogin($token)) {
            throw new Exception("Login inválido!");
        }

        $idUsuarioLogado = LoginService::obtemIdUsuarioLogado($token);

        $entityManager = EntityManagerCreator::create();

        /** @var Publicacao */
        $publicacao = $entityManager->find(Publicacao::class, $idPublicacao);

        //Verificação para que somente autor da publicação consiga exclui-la
        if (
            $publicacao->getAutor()->getId() !== $idUsuarioLogado
        ) {
            throw new Exception("Sem permisão para excluir publicação");
        }

        ImageService::excluirMidiasDePublicacao($publicacao);

        $entityManager->remove($publicacao);

        $entityManager->flush();

        http_response_code(200);
        $response =  new APIResponse(
            true,
            false,
            "Publicação removida com sucesso",
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
            "Erro inesperado ao excluir publicação",
        );
        echo json_encode($response);
    }
}
