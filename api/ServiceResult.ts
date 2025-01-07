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

    static Failure<T>(errorMessage: string, errorOrigin: string, error?: Error): ServiceResult<T> {
        // TODO: Log all failed service results here
        if (error)
        {
            console.log("Error: " + error.name);
            console.log("Message: " + error.message);
            console.log("Cause: " + error.cause ? error.cause : "None");
            console.log("Stack: " + error.stack ? error.stack : "None");
        }
        console.log("Custom: " + errorMessage + "\nOrigin: " + errorOrigin);
        return new ServiceResult<T>(false, undefined, error, errorMessage, errorOrigin);
    }
}