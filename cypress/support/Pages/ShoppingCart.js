export class ShoppingCart {

    constructor(){

        this.ShowPricebutton= '//button[text()="Show total price"]';
        
    }

    CheckProduct(price, product){
        return cy.xpath(`//p[@name="${price}"]//preceding-sibling::p[@name="${product}"]`)
    }


    CheckPrice(product, price){
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