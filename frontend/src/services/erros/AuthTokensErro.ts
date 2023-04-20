export class AuthTokensErro extends Error{
    constructor(){
        super('Error with authentication token.')
    }

}