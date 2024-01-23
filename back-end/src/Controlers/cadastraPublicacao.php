<?php

use Tiagozay\BackEnd\Domain\Models\Publicacao;
use Tiagozay\BackEnd\Domain\Models\Usuario;
use Tiagozay\BackEnd\Helpers\EntityManagerCreator;
use Tiagozay\BackEnd\Services\LoginService;
use Tiagozay\BackEnd\Utils\APIResponse;
use Tiagozay\BackEnd\Utils\ArquivoPublicacao;
use Tiagozay\BackEnd\Utils\ArquivoPublicacaoOriginalEMiniatura;

require_once __DIR__ . '/../../vendor/autoload.php';

//Verificação realizada para que o código não seja executado em outros momentos (como quando rodar a CLI do doctrine), aí rodará somente quando for uma requisição HTTP com o método POST
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === "POST") {
    $authorizationHeader = $_SERVER['HTTP_AUTHORIZATION'];
    $token = str_replace('Bearer ', '', $authorizationHeader);

    $texto = isset($_POST['texto']) ? $_POST['texto'] : null;
    $arquivos = isset($_POST['arquivos']) ? $_POST['arquivos'] : null;

    try {
        if (!LoginService::verificaLogin($token)) {
            throw new Exception("Login inválido!");
        }

        $idAutor = LoginService::obtemIdUsuarioLogado($token);

        $entityManager = EntityManagerCreator::create();

        $autor = $entityManager->find(Usuario::class, 19);

        //Se há arquivos de midia da publicação, neste momento será feito o tratamento dos dados que vem do cliente. Os arquivos virão em um formato JSON no campo 'arquivos' do POST, aí é feita a decodificação do JSON e obtem se um array de objetos, onde cada objeto possui 2 propriedades: arquivoOriginal e miniatura, ambas são a representação do arquivo em base 64. Aí para cada onjeto de arquivo, instancio 2 obejtos do tipo ArquivoPublicacao (Um para o arquivo original e outro para a miniatura), onde cada 1 terá suas propriedades de arquivo, como tamanho, tipo, e o código base64, e aí com esses 2 crio um objeto do tipo ArquivoPublicacaoOriginalEMiniatura passando os dois novos criados para ela, assim formando uma lista de ArquivoPublicacaoOriginalEMiniatura que será passada para o construtor da publicação, onde será feita a validação das regras de negócio e a persistência das mesmas.
        if ($arquivos) {
            $arquivosDecoded = json_decode($arquivos);

            $arquivos = [];

            foreach ($arquivosDecoded as $arquivo) {
                $arquivoOriginal = new ArquivoPublicacao($arquivo->arquivoOriginal);
                $miniatura = new ArquivoPublicacao($arquivo->miniatura);

                $arquivos[] = new ArquivoPublicacaoOriginalEMiniatura($arquivoOriginal, $miniatura);
            }
        }

        $publicacao = new Publicacao($autor, $texto, $arquivos);

        $entityManager->persist($publicacao);

        $entityManager->flush();


        http_response_code(200);
        $response =  new APIResponse(
            true,
            false,
            "Publicação cadastrada com sucesso",
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
            "Erro inesperado ao publicar",
        );
        echo json_encode($response);
    }
}
