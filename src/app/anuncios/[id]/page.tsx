import { Anuncio } from "@/types/general.types";
import { FC } from "react";
import React, { useContext, useEffect } from "react";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import Image from "next/image";

interface Props {
    params: {
        id: string;
    };
}

const productDetails = {
    name: "Sample Product",
    price: "200",
    description: "Product description",
    image: "screen6.jpeg",
    seller: "Dulce",
    tags: ["Smartphones", "New"],
};

const AdvertDetail: FC<Props> = ({ params }) => {
    return (
        <div className="align-items-center flex justify-content-center lg:px-8 md:px-6 px-4 py-8 surface-ground ng-star-inserted">
            <div className="shadow-2 p-3 h-full flex flex-column surface-card lg:w-7">
                <div>
                    <h6>User: {productDetails.seller}</h6>
                    <span>{params.id}</span>
                </div>

                <hr className="mb-3 mx-0 border-top-1 border-none surface-border mt-auto" />
                <div className="relative mb-3">
                    <span
                        className="surface-card text-900 shadow-2 px-3 py-2 absolute"
                        style={{
                            borderRadius: "1.5rem",
                            left: "1rem",
                            top: "1rem",
                        }}
                    >
                        Category
                    </span>
                    <img
                        src="/images/screen6.jpeg"
                        alt="product image"
                        className="w-full"
                    />
                    {/* <Image
                        fill
                        src={`/images/${productDetails.image}`}
                        className="w-full"
                        alt="Product Image"
                    /> */}
                </div>
                <div className="flex align-items-center">
                    <span className="font-bold text-2xl text-900">
                        {productDetails.price} €
                    </span>
                </div>
                <div className="flex justify-content-between align-items-center mb-3">
                    <span className="text-900 font-medium text-xl">
                        {productDetails.name}
                    </span>
                    <span>
                        <i className="pi pi-star-fill text-yellow-500 mr-1"></i>
                        <span className="font-medium">5.0</span>
                    </span>
                </div>
                <p className="mt-0 mb-3 text-600 line-height-3">
                    {productDetails.description}
                    <p>Seller: {productDetails.seller}</p>
                    <p>Tags: {productDetails.tags.join(", ")}</p>
                </p>
                <hr className="my-3 mx-0 border-top-1 border-none surface-border" />
                <ul className="list-none p-0 m-0 flex-grow-1">
                    <li className="flex align-items-center mb-3">
                        <i className="pi pi-check-circle text-green-500 mr-2"></i>
                        <span>Arcu vitae elementum</span>
                    </li>
                    <li className="flex align-items-center mb-3">
                        <i className="pi pi-check-circle text-green-500 mr-2"></i>
                        <span>Dui faucibus in ornare</span>
                    </li>
                    <li className="flex align-items-center mb-3">
                        <i className="pi pi-check-circle text-green-500 mr-2"></i>
                        <span>Morbi tincidunt augue</span>
                    </li>
                </ul>
                <Button label="Buy Now" className="p-3 w-full mt-auto"></Button>
            </div>
        </div>
    );
};

export default AdvertDetail;
