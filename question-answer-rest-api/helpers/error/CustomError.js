class CustomError extends Error{
    constructor(messaga,status){
        super(messaga);
        this.status = status;
    }
}
module.exports = CustomError;