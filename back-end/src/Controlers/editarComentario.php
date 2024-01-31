<?php

use Tiagozay\BackEnd\Domain\Models\Comentario;
use Tiagozay\BackEnd\Helpers\EntityManagerCreator;
use Tiagozay\BackEnd\Services\LoginService;
use Tiagozay\BackEnd\Utils\APIResponse;

require_once __DIR__ . '/../../vendor/autoload.php';

//Verificação realizada para que o código não seja executado em outros momentos (como quando rodar a CLI do doctrine), aí rodará somente quando for uma requisição HTTP com o método PUT
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === "PUT") {
    $authorizationHeader = $_SERVER['HTTP_AUTHORIZATION'];
    $token = str_replace('Bearer ', '', $authorizationHeader);

    try {
        if (!LoginService::verificaLogin($token)) {
            throw new Exception("Login inválido!");
        }

        $putData = file_get_contents("php://input");

        $data = json_decode($putData);

        $entityManager = EntityManagerCreator::create();

        /** @var Comentario */
        $comentario = $entityManager->find(Comentario::class, $idComentario);

        if(!$comentario){
            throw new Exception("Comentário não encontrado");
        }

        $comentario->editarComentario($data->comentario);

        $entityManager->flush();

        http_response_code(200);
        $response =  new APIResponse(
            true,
            false,
            "Comentário editado com sucesso",
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
            "Erro inesperado ao editar comentário",
        );
        echo json_encode($response);
    }
}
