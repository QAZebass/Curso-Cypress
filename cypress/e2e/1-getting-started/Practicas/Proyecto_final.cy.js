/// <reference types="cypress" />

import {RegisterPage} from '../../../support/Pages/RegisterPage'
import {LoginPage} from '../../../support/Pages/LoginPage'
import {HomePage} from '../../../support/Pages/HomePage'
import {ProductsPage} from '../../../support/Pages/ProductsPage'
import {ShoppingCart} from '../../../support/Pages/ShoppingCart'


describe('Page Object Model',()=>{

    let credentials;
    let productInfo;
    const registerpage= new RegisterPage();
    const loginpage= new LoginPage();
    const homepage= new HomePage();
    const productspage= new ProductsPage();
    const shoppingcart= new ShoppingCart(); 
 

    before('Preconditions',()=>{

        cy.fixture('DatosUsuario').then(credencial=>{
              credentials=credencial;
        })

        cy.fixture('productos_precios').then(productprice=>{
              productInfo= productprice;
        })
        
        cy.visit('/');  
    })

    it('Log In, Purchase and Price Checking',()=>{
        
        registerpage.GotoLogin();
        
        loginpage.TypeUser(credentials.user);
        loginpage.TypePass(credentials.password);
        loginpage.LogIn();

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

    })

})