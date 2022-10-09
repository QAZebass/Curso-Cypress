/// <reference types="cypress" />

import {RegisterPage} from '../../../support/Pages/RegisterPage'
import {LoginPage} from '../../../support/Pages/LoginPage'
import {HomePage} from '../../../support/Pages/HomePage'
import {ProductsPage} from '../../../support/Pages/ProductsPage'
import {ShoppingCart} from '../../../support/Pages/ShoppingCart'


describe('Proyecto final',()=>{

    let credenciales;
    let infoproductos;
    const registerpage= new RegisterPage();
    const loginpage= new LoginPage();
    const homepage= new HomePage();
    const productspage= new ProductsPage();
    const shoppingcart= new ShoppingCart(); 
 

    before('Preconditions',()=>{

        cy.fixture('DatosUsuario').then(credencial=>{
              credenciales=credencial
        })

        cy.fixture('productos_precios').then(productosPrecio=>{
              infoproductos= productosPrecio
        })
        
        cy.visit('/');  
    })

    it('Desarrollo Proyecto',()=>{
        
        registerpage.GotoLogin();
        
        loginpage.TypeUser(credenciales.usuario);
        loginpage.TypePass(credenciales.contraseña);
        loginpage.LogIn();

        homepage.GoShopping();

        productspage.Purchase(infoproductos.ProductOne);
        productspage.Purchase(infoproductos.ProductTwo);

        productspage.GotoShoppingCart();

        shoppingcart.CheckProductandPrice(infoproductos.ProductOne, infoproductos.PriceOne)
        .should('include.text', infoproductos.PriceOne);

        shoppingcart.CheckProductandPrice(infoproductos.ProductTwo, infoproductos.PriceTwo)
        .invoke('text')
        .should(precio=>{
            expect(precio).includes(infoproductos.PriceTwo);
        })
        


        shoppingcart.ClickShowPrice();

        shoppingcart.CheckPriceResult(infoproductos.PriceOne+infoproductos.PriceTwo)
        .invoke('text')
        .should(total=>{
          expect(total)
        .include(infoproductos.PriceOne+infoproductos.PriceTwo)
        })

    })

})