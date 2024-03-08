import { Demo } from '@/types';


export const ProductService = {
    getProductsSmall() {
        return fetch("/jsons-para-borrar/products.json", { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Product[]);
    },

    getProducts() {
        return fetch('/jsons-para-borrar/products.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Product[]);
    },

    // getProductsWithOrdersSmall() {
    //     return fetch('/demo/data/products-orders-small.json', { headers: { 'Cache-Control': 'no-cache' } })
    //         .then((res) => res.json())
    //         .then((d) => d.data as Demo.Product[]);
    // }
};

