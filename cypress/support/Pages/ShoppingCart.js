export class ShoppingCart {

    constructor(){

        this.ShowPricebutton= '//button[text()="Show total price"]';
        

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

    CheckPriceResult(suma){
        return cy.contains(`${suma}`)

    } 
}