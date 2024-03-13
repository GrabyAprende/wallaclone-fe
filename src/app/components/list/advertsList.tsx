// import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
// import React, { useEffect, useState } from 'react';
// import { ProductService } from './ProductService';
// import type { Demo } from '@/types';
import Image from 'next/image';
// import { link } from 'fs';
import Link from 'next/link';
// import { error } from 'console';

async function getData() {
    const res = await fetch("http://35.169.246.52/api/adverts");

    if (!res.ok){
        console.log("error")
    }

    return res.json()
}

// async function getData() {
//     try {
//         const response = await axios("http://35.169.246.52/api/adverts")
        
//         return response.data as Advert[];

//     } catch (err) {
//         console.error({err})
//         return []
//     }
// }

// export const AdvertsListFetch = async () => {
export default async function AdvertsListFetch(){
    // const [products, setProducts] = useState<Demo.Product[]>([]);

    const products = await getData();

    // useEffect(() => console.log({ data }), [data])

    const carouselResponsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    // useEffect(() => {
    //     // TODO: CUANDO USEMOS EL BACKEND, BORRAR PRODUCTSERVICE 
    //     ProductService.getProductsSmall().then((products) => setProducts(products));

    // }, []);

    const carouselItemTemplate = (product: any) => {
        return (

        <Link href={{pathname: `/adverts/${product._id}`}}>
            <div className="border-1 surface-border border-round m-1 text-center py-5">
                <div className="mb-3">
                    {/* TODO: LAS IMAGENES PEQUEÑAS TIENEN QUE SER 177PX POR 118 */}
                    <Image width={177} height={118} src={product.image} alt={product.name} className="shadow-2" />
                </div>
                <div>
                    <h4 className="p-mb-1">{product.name}</h4>
                    <h6 className="mt-0 mb-3">{product.price} €</h6>
                </div>
            </div>
        </Link>
        );
    };

    return (
            <div className="col-12">
                <Carousel value={products} numVisible={3} numScroll={3} responsiveOptions={carouselResponsiveOptions} itemTemplate={carouselItemTemplate}></Carousel>
            </div>
    );
};