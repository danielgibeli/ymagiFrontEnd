import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { AnuncioInstDTO } from "../../models/anuncioinst.dto";

@Injectable()
export class CartService {

    constructor(public storage: StorageService) {
    }

    createOrClearCart() : Cart {
        let cart: Cart = {items: []};
        this.storage.setCart(cart);
        return cart;
    }

    getCart() : Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addDoacao(anuncioInstituicao: AnuncioInstDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.anuncioInstituicao.id == anuncioInstituicao.id);
        if (position == -1) {
            cart.items.push({quantidade: 1, anuncioInstituicao: anuncioInstituicao});
        }
        this.storage.setCart(cart);
        return cart;
    }

    removeDoacao(anuncioInstituicao: AnuncioInstDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.anuncioInstituicao.id == anuncioInstituicao.id);
        if (position != -1) {
            cart.items.splice(position,1);
        }
        this.storage.setCart(cart);
        return cart;
    }

    increaseQuantity(anuncioInstituicao: AnuncioInstDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.anuncioInstituicao.id == anuncioInstituicao.id);
        if (position != -1) {
            cart.items[position].quantidade++;
        }
        this.storage.setCart(cart);
        return cart;
    }

    decreaseQuantity(anuncioInstituicao: AnuncioInstDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.anuncioInstituicao.id == anuncioInstituicao.id);
        if (position != -1) {
            cart.items[position].quantidade--;
            if (cart.items[position].quantidade < 1) {
                cart = this.removeDoacao(anuncioInstituicao);
            }
        }
        this.storage.setCart(cart);
        return cart;
    }

    total() : number {
        let cart = this.getCart();
        let sum = 0;
        for (var i=0; i<cart.items.length; i++) {
            sum += cart.items[i].anuncioInstituicao.preco * cart.items[i].quantidade;
        }
        return sum;
    }
}