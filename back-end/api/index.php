<?php
header("Access-Control-Allow-Origin: *");

$method = $_SERVER['REQUEST_METHOD'];

$caminho = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$caminho = ltrim($caminho, '/');

switch ($method) {
    case 'GET':
        break;
    case 'POST':

        switch ($caminho) {
            case 'api/usuarios':
                require_once '../src/Controlers/cadastrarUsuario.php';
                break;
            case 'api/login':
                require_once '../src/Controlers/login.php';
                break;
            default:
                http_response_code(404);
                echo json_encode(['error' => 'Recusro não encontrado']);
                break;
        }

        break;
    case 'PUT':
        break;
    case 'DELETE':
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método não permitido']);
        break;
}
