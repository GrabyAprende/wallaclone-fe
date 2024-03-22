'use client';

import { Advert } from '@/types/general.types';
//import { FC, useReducer } from "react";
import React, { useEffect, useState } from 'react';
//import { classNames } from "primereact/utils";
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Avatar } from 'primereact/avatar';
import { useRouter } from 'next/navigation';

interface Props {
    params: {
        id: string;
    };
}

async function getData(id: string) {
    const res = await fetch(`http://35.169.246.52/api/advert/id/${id}`);
    if (!res.ok) {
        console.log(Error);
    }
    return res.json();
}

const Tags = ({ tags }: { tags: Advert['tags'] }) =>
    tags.map((tag, index) => (
        <Tag key={index} value={tag} className="p-element">
            <span className="p-tag p-component p-tag-rounded">
                <span className="p-tag-value"></span>
            </span>
        </Tag>
    ));

export default async function Page({ params: { id } }: Props) {
    const router = useRouter();
    const product = (await getData(id)) as Advert;

    const handleHeartButtonClick = (e: any) => {
        e.preventDefault();
        console.log('Btn cliick!');
        router.push('/register');
    };

    return (
        <div className="align-items-center flex justify-content-center lg:px-8 md:px-6 px-4 py-8 surface-ground ng-star-inserted">
            <div className="shadow-2 p-3 h-full flex flex-column surface-card lg:w-7">
                <div className="flex justify-content-between align-items-center mb-3">
                    <div className="flex justify-content-between align-items-center">
                        <Avatar
                            size="large"
                            shape="circle"
                            className="p-avatar p-element p-avatar-circle flex align-items-center justify-content-center"
                        >
                            <span className="p-component p-avatar-text ng-star-inserted p-avatar-l">
                                U
                            </span>
                        </Avatar>
                        <span className="px-3">Dulce</span>
                    </div>
                    <Button
                        onClick={handleHeartButtonClick}
                        icon="pi pi-heart"
                        className="cursor-pointer p-element p-ripple p-button p-button-rounded p-button-help p-button-outlined p-button p-component p-button-icon-only"
                    >
                        <span
                            className="p-ink"
                            aria-hidden="true"
                            role="presentation"
                        ></span>
                    </Button>
                </div>

                <hr className="mb-3 mx-0 border-top-1 border-none surface-border mt-auto" />
                <div className="relative mb-3">
                    <img
                        src={product.image}
                        alt="product image"
                        className="w-full"
                    />
                    {/* <Image
                        width={600}
                        height={400}
                        src={"images/screen6.jpeg"}
                        className="w-full"
                        alt="Product Image"
                    /> */}
                </div>
                <div className="flex align-items-center">
                    <span className="font-bold text-2xl text-900">
                        {product.price} €
                    </span>
                </div>
                <div className="flex justify-content-between align-items-center mb-3">
                    <span className="text-900 font-medium text-xl">
                        {product.name}
                    </span>
                    <span>
                        <i className="pi pi-star-fill text-yellow-500 mr-1"></i>
                        <span className="font-medium">5.0</span>
                    </span>
                </div>
                <p className="mt-0 mb-3 text-600 line-height-3">
                    {product.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                    <Tags tags={product.tags} />
                </div>
                <hr className="my-3 mx-0 border-top-1 border-none surface-border" />
                <ul className="list-none p-0 m-0 flex-grow-1">
                    <li className="flex align-items-center mb-3">
                        <i className="pi pi-globe text-green-500 mr-2"></i>
                        <span>En punto de recogida desde 2.59 EUR</span>
                    </li>
                    <li className="flex align-items-center mb-3">
                        <i className="pi pi-globe text-green-500 mr-2"></i>
                        <span>En mi dirección desde 3.49 EUR</span>
                    </li>
                </ul>
                <hr className="mb-3 mx-0 border-top-1 border-none surface-border mt-auto" />
                <div className="mb-3">
                    <div className="flex align-items-center mb-3">
                        <i className="pi pi-check-circle text-green-500 mr-2"></i>
                        <h4 className="my-0">Protección Wallaclone</h4>
                    </div>
                    <p>
                        Compra sin preocupaciones mediante nuestro servicio de
                        envíos. Transacción protegida con reembolso, pagos
                        seguros y ayuda siempre que la necesites.
                    </p>
                </div>
                <Button
                    label="Buy Now"
                    className="p-3 w-full mt-auto cursor-pointer"
                ></Button>
            </div>
        </div>
    );
}
