export class LoginPage{

    constructor(){

        
        this.inputuser= '#user';
        this.inputpass='[id="pass"]';
        this.LoginButton='[id="submitForm"]';
    }
    
    TypeUser(usuario){

        cy.get(this.inputuser).type(usuario);
    }

    TypePass(password){
        cy.get(this.inputpass).type(password);
    }

    LogIn(){
        cy.get(this.LoginButton).click();
    }

}