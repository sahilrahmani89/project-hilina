interface Pagination {
    hasNext: boolean;
    next?: string | null;  
    prev?: string | null;  
    total: number;        
}

interface ApiResponse<T> {
    statusCode: number;
    message: string;
    data?: T | null;
    pagination?: Pagination; 
}
export function createApiResponse<T>(
    statusCode: number,
    message: string,
    data: T | null = null,
    pagination?: Pagination 
): ApiResponse<T> {
    const response: ApiResponse<T> = {
        statusCode,
        message,
        data
    };
    if (pagination) {
        response.pagination = pagination;
    }
    return response;
}