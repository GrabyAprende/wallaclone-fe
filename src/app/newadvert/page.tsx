'use client';

import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { MultiSelect } from 'primereact/multiselect';
import { Advert, UserDetails } from '@/types/general.types';
import { SessionContext } from '@/context/sessionContext';

export default function NewAdvertPage() {
    const { isLogged, token } = useContext(SessionContext);
    const router = useRouter();

    useEffect(() => {
        if (!isLogged) router.push('/register')
    }, [isLogged, router]);
    
    //Tags provisionales para probar:
    // const staticTags = [
    //     { label: 'Motor', value: 'motor' },
    //     { label: 'Lifestyle', value: 'lifestyle' },
    //     { label: 'Technology', value: 'technology' },
    // ];
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    //Creo el estado inicial del anuncio nuevo
    const [advertData, setAdvertData] = useState({
        name: '',
        description: '',
        price: 0,
        image: '',
        tags: [],
        status: true,
    });

    const fetchTags = async () => {
        try {
            const response = await fetch('http://35.169.246.52/api/tags', {
                method: 'GET',  
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok) {
                const { tags } = await response.json();
                setTags(tags.map((tag: any) => ({ label: tag, value: tag })));
            } else {
                console.error('Failed to fetch tags');
            }
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };

    //Llamo las tags
    useEffect(() => {
        fetchTags();
    }, []);

    //Actualizo los cambios
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setAdvertData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    //Manejo el envío del form
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(
                'http://35.169.246.52/api/advert/new',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(advertData),
                }
            );
            if (response.ok) {
                const newAdvert: Advert = await response.json();
                //Mejor redireccionar al detalle?
                router.push(`/adverts/${newAdvert._id}`);
            } else {
                console.error('Failed to create advert');
            }
        } catch (error) {
            console.error('Error creating advert:', error);
        }
    };

    return (
        <div
            style={{
                flexDirection: 'column',
            }}
            className="align-items-center flex justify-content-center lg:px-8 md:px-6 px-4 py-8 surface-ground ng-star-inserted"
        >
            <h2>Sube tu anuncio</h2>
            <div
                className="px-3 py-4 w-full h-full flex flex-column surface-card lg:w-7"
                style={{
                    borderRadius: '20px',
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
                                onChange={handleChange}
                            />
                        </div>

                        <div className="p-field mb-3">
                            <label
                                className="block font-medium mb-2"
                                htmlFor="tags"
                            >
                                Tags
                            </label>
                            <MultiSelect
                                id="tags"
                                name="tags"
                                value={selectedTags}
                                options={tags}
                                onChange={(e) => setSelectedTags(e.value)}
                                optionLabel="label"
                                className="w-full"
                                placeholder="Select Tags"
                            />
                        </div>

                        <Button label="Crear Anuncio" type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
}
