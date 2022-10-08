export class RegisterPage{

    constructor(){
        this.iniciosesion= '#registertoggle';
    }

    GotoLogin(){
        
        cy.get(this.iniciosesion).dblclick();
    }

}