export class ServiceResult<T> {
    private readonly isSuccess: boolean;
    private readonly data?: T;
    private readonly error?: Error;
    private readonly errorMessage?: string;
    private readonly errorOrigin?: string;

    constructor(
        isSuccess: boolean,
        data?: T,
        error?: Error,
        errorMessage?: string,
        errorOrigin?: string
    ) {
        this.isSuccess = isSuccess;
        this.data = data;
        this.error = error;
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

    get Error(): Error | undefined {
        return this.error;
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

    static Failure<T>(error: Error, errorMessage: string, errorOrigin: string): ServiceResult<T> {
        // TODO: Log all failed service results here
        console.log("Error: " + errorMessage + "\nOrigin: " + errorOrigin);
        return new ServiceResult<T>(false, undefined, error, errorMessage, errorOrigin);
    }
}