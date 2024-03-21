"use client";

import React, { useState } from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

export default function NewAdvertPage() {
    const router = useRouter();

    //Creo el estado inicial del anuncio nuevo
    const [advertData, setAdvertData] = useState({
        name: "",
        description: "",
        price: 0,
        image: "",
        tags: [],
        status: true,
    });

    //Actualizo los cambios
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setAdvertData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    //Manejo la subida de imágen y convierto la url a string
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Me aseguro de que se tome solo el primer archivo
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setAdvertData(prevState => ({
                    ...prevState,
                    image: reader.result as string, // Guardo como string
                }));
            };
        }
    };

    //Manejo el envío del form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://35.169.246.52/api/advert/new",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(advertData),
                }
            );
            if (response.ok) {
                const newAdvert = await response.json();
                //Mejor redireccionar al detalle?
                router.push(`http://35.169.246.52/api/adverts`);
            } else {
                console.error("Failed to create advert");
            }
        } catch (error) {
            console.error("Error creating advert:", error);
        }
    };

    return (
        <div
            style={{
                flexDirection: "column",
            }}
            className="align-items-center flex justify-content-center lg:px-8 md:px-6 px-4 py-8 surface-ground ng-star-inserted"
        >
            <h2>Sube tu anuncio</h2>
            <div
                className="px-3 py-4 w-full h-full flex flex-column surface-card lg:w-7"
                style={{
                    borderRadius: "20px",
                }}
            >
                <h5>Información del producto</h5>
                <div className="mt-4 p-col-6">
                    <form onSubmit={handleSubmit}>
                        <div className="p-field mb-3">
                            <label
                                className="block font-medium mb-2"
                                htmlFor="name"
                            >
                                Nombre
                            </label>
                            <input
                                className="p-inputtext p-component p-element w-full"
                                type="text"
                                id="name"
                                name="name"
                                value={advertData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="p-field mb-3">
                            <label
                                htmlFor="description"
                                className="block font-medium mb-2"
                            >
                                Descripción
                            </label>
                            <textarea
                                className="p-inputtextarea p-inputtext p-component p-element w-full"
                                id="description"
                                name="description"
                                value={advertData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="p-field mb-3">
                            <label
                                htmlFor="price"
                                className="block font-medium mb-2"
                            >
                                Precio
                            </label>
                            <span className="p-inputnumber p-component p-inputnumber-buttons-stacked">
                                <input
                                    className="p-inputtext p-component p-element p-inputnumber-input w-full"
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={advertData.price}
                                    onChange={handleChange}
                                />
                            </span>
                        </div>
                        <div className="p-field mb-3">
                            <label
                                className="block font-medium mb-2"
                                htmlFor="image"
                            >
                                Imagen
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="p-field mb-3">
                            <label
                                className="block font-medium mb-2"
                                htmlFor="tags"
                            >
                                Tags
                            </label>
                            <input
                                className="p-inputtext p-component p-element w-full"
                                type="text"
                                id="tags"
                                name="tags"
                                value={
                                    advertData.tags
                                        ? advertData.tags.join(",")
                                        : ""
                                }
                                onChange={handleChange}
                            />
                        </div>
                        <Button label="Crear Anuncio" type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
}
