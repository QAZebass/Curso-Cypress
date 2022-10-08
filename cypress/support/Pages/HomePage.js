export class HomePage{

    constructor(){

        this.onlineshopbutton= '[id="onlineshoplink"]';
    }

    GoShopping(){
        cy.get(this.onlineshopbutton).click();

    }

}