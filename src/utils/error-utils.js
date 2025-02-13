class CustomValidationError extends Error {
    constructor(errors) {
        super("Validation failed");
        this.name = "CustomValidationError";
        this.errors = errors;
    }
}

function getErrorMessage(err){
    if(err instanceof CustomValidationError){
        return err.errors;//.map(error => error.message);
    } else {
        return [err.message];
    }
};

export {getErrorMessage, CustomValidationError};