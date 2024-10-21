export class ServiceResult<T> {
    private readonly isSuccess: boolean;
    private readonly data?: T;
    private readonly errorMessage?: string;
    private readonly errorOrigin?: string;

    constructor(
        isSuccess: boolean,
        data?: T,
        errorMessage?: string,
        errorOrigin?: string
    ) {
        this.isSuccess = isSuccess;
        this.data = data;
        this.errorMessage = errorMessage;
        this.errorOrigin = errorOrigin;
    }
    
    get IsSuccess(): boolean {
        return this.isSuccess;
    }

    get IsFailure(): boolean {
        return !this.isSuccess;
    }

    get Data(): T | undefined {
        return this.data;
    }

    get ErrorMessage(): string | undefined {
        return this.errorMessage;
    }

    get ErrorOrigin(): string | undefined {
        return this.errorOrigin;
    }

    static Success<T>(data: T): ServiceResult<T> {
        return new ServiceResult<T>(true, data);
    }

    static Failure<T>(errorMessage: string, errorOrigin: string): ServiceResult<T> {
        // TODO: Log all failed service results here
        return new ServiceResult<T>(false, undefined, errorMessage, errorOrigin);
    }
}