<?php
    
namespace Tiagozay\BackEnd\Utils;

use JsonSerializable;

class APIResponse
{
    public bool $success;
    public bool $domainError;
    public string $message;
    public ?array $data;

    public function __construct(bool $success, bool $domainError, string $message, array $data = null)
    {
        $this->success = $success;
        $this->domainError = $domainError;
        $this->message = $message;
        $this->data = $data;
    }

}


?>