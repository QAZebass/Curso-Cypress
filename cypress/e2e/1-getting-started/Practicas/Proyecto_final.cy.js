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

        shoppingcart.CheckProduct(infoproductos.ProductOne)
        .should('include.text', infoproductos.ProductOne);

        shoppingcart.CheckProduct(infoproductos.ProductTwo)
        .invoke('text')
        .then(producto=>{
            expect(producto).includes(infoproductos.ProductTwo);
        })


        shoppingcart.CheckPrice(infoproductos.PriceOne)
        .should('include.text', infoproductos.PriceOne)

        shoppingcart.CheckPrice(infoproductos.PriceTwo)
        .invoke('text')
        .then(precio=>{
             assert.include(precio, infoproductos.PriceTwo)
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