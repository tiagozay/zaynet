<?php

use Tiagozay\BackEnd\Domain\Models\Usuario;
use Tiagozay\BackEnd\Helpers\EntityManagerCreator;
use Tiagozay\BackEnd\Services\LoginService;
use Tiagozay\BackEnd\Utils\APIResponse;

require_once __DIR__ . '/../../vendor/autoload.php';

//Verificação realizada para que o código não seja executado em outros momentos (como quando rodar a CLI do doctrine), aí rodará somente quando for uma requisição HTTP com o método POST
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === "POST") {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    try {

        $entityManager = EntityManagerCreator::create();

        $usuarioRepository = $entityManager->getRepository(Usuario::class);

        $usuario = $usuarioRepository->findOneBy(['email' => $email]);

        if(!$usuario){
            //Neste caso, só vai cair nesta condição se o usuário não for encontrado, porém eu não posso informar isso diretamente por questões de segurança, por isso retorno essa mensagem mais genérica
            throw new DomainException("E-mail ou senha inválidos");
        }

        $dataLogin = LoginService::login($usuario, $senha);

        http_response_code(200);

        $response =  new APIResponse(
            true,
            false,
            "Login realizado com sucesso!",
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
            "Erro inesparado ao realizar login: "
        );
        echo json_encode($response);
        
    }
}