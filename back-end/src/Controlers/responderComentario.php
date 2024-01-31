<?php

use Tiagozay\BackEnd\Domain\Models\Comentario;
use Tiagozay\BackEnd\Domain\Models\ComentarioResposta;
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
        $conteudo = isset($_POST['conteudo']) ? $_POST['conteudo'] : null;

        $entityManager = EntityManagerCreator::create();

        /** @var Comentario */
        $comentario = $entityManager->find(Comentario::class, $idComentario);

        if(!$comentario){
            throw new Exception("Comentário não encontado");
        }

        $autor = $entityManager->find(Usuario::class, $idAutor);

        $resposta = new ComentarioResposta($comentario, $autor, $conteudo);

        $entityManager->persist($resposta);

        $entityManager->flush();

        http_response_code(200);
        $response =  new APIResponse(
            true,
            false,
            "Resposta cadastrada com sucesso",
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
            "Erro inesperado ao responder comentário: ".$e->getMessage(),
        );
        echo json_encode($response);
    }
}
