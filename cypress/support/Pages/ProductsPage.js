export class ProductsPage{

    constructor(){

        this.purchaseconfirm= '//button[@id="closeModal"]';
        this.shoppingcartbutton='[id="goShoppingCart"]';
        
    }
    Purchase(producto){
        cy.xpath(`//button[@value="${producto}"]`).click();
        cy.xpath(this.purchaseconfirm).click()

    }
    
    GotoShoppingCart(){
        cy.get(this.shoppingcartbutton).click();
    }

}