export class CheckoutPage{

    constructor(){
        this.name= '#FirstName';
        this.surname= '//input[@id="lastName"]';
        this.cardnumber= '//input[@id="cardNumber"]';
        this.purchasebutton= '[class="chakra-button css-13zsa"]'
    }

    NameInput(name){
        cy.get(this.name).type(name);
    }

    SurnameInput(surname){
        cy.xpath(this.surname).type(surname);
    }

    CardNumber(number){
        cy.xpath(this.cardnumber).type(number);
    }

    CompletePurchase(){
        cy.get(this.purchasebutton).click();
    }

}