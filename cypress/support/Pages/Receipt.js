import {timeout} from '../Utilidades/constantes'
export class Receipt{

    constructor(){
        this.creditcardnumber= 'p[id="creditCard"]';
        this.totalprice= '//p[@id="totalPrice"]';
        this.thankyou= '//button[text()="Thank you"]';
    }

    CheckName(name){
        return cy.get('div').find('p[id="name"]', {timeout:timeout})
    }

    CheckProduct(product){
        return cy.xpath(`//p[@id="${product}"]`)
    }

    CheckCreditcard(creditnumber){
        return cy.get(this.creditcardnumber).contains(creditnumber)

    }
    CheckTotal(){
        return cy.xpath(this.totalprice)
    }

    Thankyou(){
        cy.xpath(this.thankyou).click();
    }
}