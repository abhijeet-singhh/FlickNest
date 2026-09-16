export interface ApiError {
  message: string;
  code?: string;
}

export interface ApiResponse<T> {
  data: T;
  error: null;
}

export interface ApiErrorResponse {
  data: null;
  error: ApiError;
}

export type ApiResult<T> = ApiResponse<T> | ApiErrorResponse;
