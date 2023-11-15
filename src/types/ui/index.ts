export enum UiState {
    INITIAL,
    PROGRESS,
    DONE,
    ERROR
}

export interface UiStateWithData<T> { 
    errorMessage : string | null | undefined, 
    state : UiState,
    data : T
}

export function isLoading(state : UiState) : Boolean{
    return state === UiState.PROGRESS
}