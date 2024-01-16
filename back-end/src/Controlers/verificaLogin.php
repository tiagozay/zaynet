<?php

use Tiagozay\BackEnd\Services\LoginService;
use Tiagozay\BackEnd\Utils\APIResponse;

require_once __DIR__ . '/../../vendor/autoload.php';

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === "POST") {
    $authorizationHeader = $_SERVER['HTTP_AUTHORIZATION'];
    $token = str_replace('Bearer ', '', $authorizationHeader);

    try {

        if (!LoginService::verificaLogin($token)) {
            throw new DomainException("Não existe login no sistema");
        } else {
            http_response_code(200);

            $response =  new APIResponse(
                true,
                false,
                "Usuário logado corretamente",
            );
            echo json_encode($response);
        }
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
            "Erro inesperado ao buscar login",
        );
        echo json_encode($response);
    }
}
