export default interface APIResponse
{
    success: boolean;
    domainError: boolean;
    message: string;
    data: object | null;
}