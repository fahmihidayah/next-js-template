export interface Result<T> {
    data : T;
    redirect : string;
    success : boolean;
    message : string;

}