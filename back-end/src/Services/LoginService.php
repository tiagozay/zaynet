<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Tiagozay\BackEnd\Domain\Models\Usuario;
use Tiagozay\BackEnd\Services\PasswordService;

require_once __DIR__ . "/../../env.php";

abstract class LoginService
{
    /**
     * @throws Exception
     */
    public static function login(Usuario $usuario, string $senha): array
    {
        $chaveSecreta = getenv('JWT_KEY');

        if (!PasswordService::validaSenha($senha, $usuario->getSenha())) {
            throw new Exception("Senha inválida");
        }

        $payLoad = [
            'exp' => time() + 14400,
            'iat' => time(),
            'id' => $usuario->getId(),
        ];

        $token = JWT::encode($payLoad, $chaveSecreta, 'HS256');

        return [
            "token" => $token,
            "usuario" => $usuario,
        ];
    }

    public static function verificaLogin(string $token): bool
    {
        if (empty(trim($token))) {
            return false;
        }

        $chaveSecreta = getenv('JWT_KEY');

        try {
            $decoded = JWT::decode($token, new Key($chaveSecreta, 'HS256'));
        } catch (Exception) {
            return false;
        }

        $expiracao = $decoded->exp;

        $timestamp_atual = time();

        if ($timestamp_atual > $expiracao) {
            return false;
        }

        return true;
    }
}
