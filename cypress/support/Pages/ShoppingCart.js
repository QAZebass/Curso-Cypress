export class ShoppingCart {

    constructor(){

        this.ShowPricebutton= '//button[text()="Show total price"]';
        
    }


    CheckProductandPrice(product, price){
         return cy.get(`[name="${product}"]`)
         .siblings(`[name="${price}"]`);
    }


    ClickShowPrice(){
        cy.xpath(this.ShowPricebutton).click();
    }

    CheckPriceResult(suma){
        return cy.contains(`${suma}`)

    } 
}