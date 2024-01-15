export default interface APIResponse
{
    success: boolean;
    domainError: boolean;
    message: string;
    data:  Record<string, any> | null;
}