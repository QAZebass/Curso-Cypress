export class ShoppingCart {

    constructor(){

        this.ShowPricebutton= '//button[text()="Show total price"]';
        this.TotalPrice= '//b[text()="49"]';

    }


    CheckProduct(product){
         return cy.get(`[name="${product}"]`);

    }

    CheckPrice(price){
         return cy.get(`[name="${price}"]`);
    }

    ClickShowPrice(){
        cy.xpath(this.ShowPricebutton).click();
    }

    CheckPriceResult(){
        return cy.xpath(this.TotalPrice)

    } 
}