<?php
    namespace Tiagozay\BackEnd\Services;

    abstract class PasswordService
    {
        public static function geraHashParaSenha(string $senha): string
        {
            return password_hash($senha, PASSWORD_DEFAULT);
        }

        public static function validaSenha(string $senha, string $hash): bool
        {
            return password_verify($senha, $hash);
        }
    }
?>