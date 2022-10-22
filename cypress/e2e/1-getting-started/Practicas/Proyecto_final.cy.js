/// <reference types="cypress" />

import {CheckoutPage} from '../../../support/Pages/CheckoutPage'
import {HomePage} from '../../../support/Pages/HomePage'
import {ProductsPage} from '../../../support/Pages/ProductsPage'
import {Receipt} from '../../../support/Pages/Receipt'
import {ShoppingCart} from '../../../support/Pages/ShoppingCart'



describe('Page Object Model',()=>{

    let checkout
    let productInfo;
    const user= "ZebassZender";
    const pass= "123456!";
    const sex= "male";
    const day= 21;
    const month= "June";
    const year= 1985;
    const homepage= new HomePage();
    const productspage= new ProductsPage();
    const shoppingcart= new ShoppingCart(); 
    const checkoutpage= new CheckoutPage();
    const receipt= new Receipt(); 

    before('Preconditions',()=>{

        cy.fixture('Checkout').then(data=>{
              checkout =data;
        })

        cy.fixture('productos_precios').then(productprice=>{
              productInfo= productprice;
        })
        
        cy.request({
            url: 'https://pushing-it-backend.herokuapp.com/api/register',
            method: 'POST',
            body: {
                username: user,
                password: pass,
                gender: sex,
                day: day,
                month: month,
                year:year,
            }
        })
        
        cy.request({
            url: 'https://pushing-it-backend.herokuapp.com/api/login',
            method: 'POST',
            body:{
                username: user,
                password: pass
            }
        }).then(response=>{
            cy.log(response)
            window.localStorage.setItem('token',response.body.token);
            window.localStorage.setItem('user', response.body.user.username)
        })
        cy.visit('/'); 
    })    
    
    after('Deleting User',()=>{
            cy.request({
                url: `https://pushing-it-backend.herokuapp.com/api/deleteuser/${user}`,
                method: "DELETE"
            })
    })
        

    it('Log In, Purchase and Product and Price Checking',()=>{
        

        homepage.GoShopping();

        productspage.Purchase(productInfo.ProductOne);
        productspage.Purchase(productInfo.ProductTwo);

        productspage.GotoShoppingCart();

        shoppingcart.CheckProduct(productInfo.PriceOne, productInfo.ProductOne)
        .invoke('text')
        .should(product=>{
            assert.include(product, productInfo.ProductOne)
        })

        shoppingcart.CheckProduct(productInfo.PriceTwo, productInfo.ProductTwo)
        .invoke('text')
        .should(product=>{
            expect(product)
            .includes(product, productInfo.ProductTwo)
        })

       shoppingcart.CheckPrice(productInfo.ProductOne, productInfo.PriceOne)
       .should('include.text', productInfo.PriceOne)

       shoppingcart.CheckPrice(productInfo.ProductTwo, productInfo.PriceTwo)
       .should('include.text', productInfo.PriceTwo)
        


        shoppingcart.ClickShowPrice();

        shoppingcart.CheckPriceResult(productInfo.PriceOne+productInfo.PriceTwo)
        .invoke('text')
        .should(total=>{
          expect(total)
        .include(productInfo.PriceOne+productInfo.PriceTwo)
        })

        shoppingcart.GotoCheckout();

        checkoutpage.NameInput(checkout.name);
        checkoutpage.SurnameInput(checkout.surname);
        checkoutpage.CardNumber(checkout.creditcard);
        checkoutpage.CompletePurchase();

        receipt.CheckName(checkout.name)
        .should('includes.text', checkout.name);

        receipt.CheckName(checkout.surname)
        .should('includes.text', checkout.surname);

        receipt.CheckProduct(productInfo.ProductOne)
        .invoke('text')
        .should(info=>{
            expect(info).equal(productInfo.ProductOne)
        })

        receipt.CheckProduct(productInfo.ProductTwo)
        .invoke('text')
        .should(info=>{
            assert.equal(info, productInfo.ProductTwo)
        })

        receipt.CheckCreditcard(checkout.creditcard)
        .should('have.text', checkout.creditcard)

        receipt.CheckTotal()
        .invoke('text')
        .should(total=>{
            assert.include(total, productInfo.PriceOne+productInfo.PriceTwo)
        })

        receipt.Thankyou();
    })

})