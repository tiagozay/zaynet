<?php

use Tiagozay\BackEnd\Domain\Models\Publicacao;
use Tiagozay\BackEnd\Helpers\EntityManagerCreator;
use Tiagozay\BackEnd\Services\LoginService;
use Tiagozay\BackEnd\Utils\APIResponse;

require_once __DIR__ . '/../../vendor/autoload.php';

//Verificação realizada para que o código não seja executado em outros momentos (como quando rodar a CLI do doctrine), aí rodará somente quando for uma requisição HTTP com o método GET
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === "GET") {
    $authorizationHeader = $_SERVER['HTTP_AUTHORIZATION'];
    $token = str_replace('Bearer ', '', $authorizationHeader);

    try {
        if (!LoginService::verificaLogin($token)) {
            throw new Exception("Login inválido!");
        }

        $entityManager = EntityManagerCreator::create();

        $publicacaoRepository = $entityManager->getRepository(Publicacao::class);

        $publicacoes = $publicacaoRepository->findBy([], orderBy: ['dataDePublicacao' => 'DESC']);

        http_response_code(200);

        $response =  new APIResponse(
            true,
            false,
            "Busca realizada com sucesso",
            $publicacoes
        );

        echo json_encode($response);

    }catch (DomainException $e) {
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
            "Erro inesperado ao buscar publicações",
        );
        echo json_encode($response);
    }
}
