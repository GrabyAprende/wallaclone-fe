'use client';

import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import React, { useEffect, useState } from 'react';
import { ProductService } from './ProductService';
import type { Demo } from '@/types';
import Image from 'next/image';

export const AdvertsList = () => {
    const [products, setProducts] = useState<Demo.Product[]>([]);

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

    useEffect(() => {
        // TODO: CUANDO USEMOS EL BACKEND, BORRAR PRODUCTSERVICE 
        ProductService.getProductsSmall().then((products) => setProducts(products));

    }, []);

    const carouselItemTemplate = (product: Demo.Product) => {
        return (

            <div className="border-1 surface-border border-round m-1 text-center py-5">
                <div className="mb-3">
                    {/* TODO: LAS IMAGENES PEQUEÑAS TIENEN QUE SER 177PX POR 118 */}
                    <Image width={177} height={118} src={`/photo/${product.image}`} alt={product.name} className="shadow-2" />
                </div>
                <div>
                    <h4 className="p-mb-1">{product.name}</h4>
                    <h6 className="mt-0 mb-3">${product.price}</h6>
                    <span className={`product-badge status-${product.inventoryStatus?.toLowerCase()}`}>{product.inventoryStatus}</span>
                    <div className="car-buttons mt-5">
                        <Button type="button" className="mr-2" rounded icon="pi pi-search"></Button>
                        <Button type="button" className="mr-2" severity="success" rounded icon="pi pi-star"></Button>
                        <Button type="button" severity="help" rounded icon="pi pi-cog"></Button>
                    </div>
                </div>
            </div>
        );
    };

    return (
            <div className="col-12">
                <Carousel value={products} numVisible={3} numScroll={3} responsiveOptions={carouselResponsiveOptions} itemTemplate={carouselItemTemplate}></Carousel>
            </div>
    );
};


