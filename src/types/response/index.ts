export interface BaseResponse<T> {
    message : string;
    statusCode : number;
    data : T
}

export interface PaginateResponse<T> extends BaseResponse<T> {
    count? : number;
    page? : number;
    totalPage? : number;
}