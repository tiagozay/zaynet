<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    exit();
}

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
// header('Access-Control-Allow-Credentials: true');

$method = $_SERVER['REQUEST_METHOD'];

$caminho = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$caminho = ltrim($caminho, '/');

//Alteração feita para rodar em produção, pois lá o caminho chega completo, com o back-end no início
$caminho = str_replace('back-end/', "", $caminho);

switch ($method) {
    case 'GET':

        preg_match('/^api\/publicacoes\/(?<idPublicacao>\d+)\/comentarios$/', $caminho, $matches);

        if (!empty($matches['idPublicacao'])) {
            $idPublicacao = $matches['idPublicacao'];
            require_once '../src/Controlers/buscaComentariosDePublicacao.php';
            exit();
        }
        switch ($caminho) {
            case 'api/publicacoes':
                require_once '../src/Controlers/buscaPublicacoes.php';
                break;
            default:
                http_response_code(404);
                echo json_encode(['error' => 'Recusro não encontrado']);
                break;
        }

        break;
    case 'POST':

        preg_match('/^api\/comentarios\/(?<idComentario>\d+)\/curtir$/', $caminho, $matches);

        if (!empty($matches['idComentario'])) {
            $idComentario = $matches['idComentario'];
            require_once '../src/Controlers/curtirComentario.php';
            exit();
        }

        preg_match('/^api\/comentarios\/(?<idComentario>\d+)\/respostas$/', $caminho, $matches);

        if (!empty($matches['idComentario'])) {
            $idComentario = $matches['idComentario'];
            require_once '../src/Controlers/responderComentario.php';
            exit();
        }

        preg_match('/^api\/publicacoes\/(?<idPublicacao>\d+)\/curtir$/', $caminho, $matches);

        if (!empty($matches['idPublicacao'])) {
            $idPublicacao = $matches['idPublicacao'];
            require_once '../src/Controlers/curtirPublicacao.php';
            exit();
        }

        preg_match('/^api\/publicacoes\/(?<idPublicacao>\d+)\/compartilhar$/', $caminho, $matches);

        if (!empty($matches['idPublicacao'])) {
            $idPublicacao = $matches['idPublicacao'];
            require_once '../src/Controlers/compartilharPublicacao.php';
            exit();
        }

        switch ($caminho) {
            case 'api/usuarios':
                require_once '../src/Controlers/cadastrarUsuario.php';
                break;
            case 'api/login':
                require_once '../src/Controlers/login.php';
                break;
            case 'api/verificaLogin':
                require_once '../src/Controlers/verificaLogin.php';
                break;
            case 'api/publicacoes':
                require_once '../src/Controlers/cadastraPublicacao.php';
                break;
            case 'api/comentarios':
                require_once '../src/Controlers/comentarEmPublicacao.php';
                break;
            default:
                http_response_code(404);
                echo json_encode(['error' => 'Recusro não encontrado']);
                break;
        }

        break;
    case 'PUT':

        preg_match('/^api\/comentarios\/(?<idComentario>\d+)$/', $caminho, $matches);

        if (!empty($matches['idComentario'])) {
            $idComentario = $matches['idComentario'];
            require_once '../src/Controlers/editarComentario.php';
            exit();
        }

        preg_match('/^api\/publicacoes\/(?<idPublicacao>\d+)$/', $caminho, $matches);

        if (!empty($matches['idPublicacao'])) {
            $idPublicacao = $matches['idPublicacao'];
            require_once '../src/Controlers/editarPublicacao.php';
            exit();
        }

        break;
    case 'DELETE':

        preg_match('/^api\/comentarios\/(?<idComentario>\d+)$/', $caminho, $matches);

        if (!empty($matches['idComentario'])) {
            $idComentario = $matches['idComentario'];
            require_once '../src/Controlers/excluirComentario.php';
            exit();
        }

        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método não permitido']);
        break;
}
