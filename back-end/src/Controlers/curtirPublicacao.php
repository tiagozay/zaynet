<?php

use Tiagozay\BackEnd\Domain\Models\Curtida;
use Tiagozay\BackEnd\Domain\Models\Publicacao;
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

        /** @var Publicacao */
        $publicacao = $entityManager->find(Publicacao::class, $idPublicacao);

        if(!$publicacao){
            throw new Exception("Publicação não encontada");
        }

        $autor = $entityManager->find(Usuario::class, $idAutor);

        $curtidaRepository = $entityManager->getRepository(Curtida::class);

        /** @var Curtida */
        $curtida = $curtidaRepository->findOneBy(['autor' => $autor, 'publicacao' => $publicacao]);

        if(!$curtida){

            $curtida = new Curtida($publicacao , $autor);

            $publicacao->adicionarCurtida($curtida);

        }else{

            $entityManager->remove($curtida);

        }

        $entityManager->persist($publicacao);

        $entityManager->flush();

        http_response_code(200);
        $response =  new APIResponse(
            true,
            false,
            "Curtida na publicação realizada com sucesso",
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
            "Erro inesperado ao curtir publicação: ".$e->getMessage(),
        );
        echo json_encode($response);
    }
}
