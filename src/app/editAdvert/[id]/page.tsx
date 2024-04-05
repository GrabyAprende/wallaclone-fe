'use client';
import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { MultiSelect } from 'primereact/multiselect';
import { Advert } from '@/types/general.types';
import { SessionContext } from '@/context/sessionContext';

interface Props {
    params: {
        id: string;
    };
}

export default function Page({ params: { id } }: Props) {
    const { token } = useContext(SessionContext);
    const router = useRouter();

    // Estado para almacenar los datos del anuncio a editar
    const [newAdvertData, setNewAdvertData] = useState<Advert | null>(null);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    // Función para cargar los datos del anuncio a editar
    const fetchAdvertData = async () => {
        try {
            const response = await fetch(
                `https://coderstrikeback.es/api/advert/id/${id}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.ok) {
                const advertData = await response.json();
                setNewAdvertData(advertData);
                setSelectedTags(advertData.tags);
            } else {
                console.error('Error al traer datos del anuncio');
            }
        } catch (error) {
            console.error('Error al traer datos del anuncio:', error);
        }
    };

    // Función para cargar las etiquetas disponibles
    const fetchTags = async () => {
        try {
            const response = await fetch(
                'https://coderstrikeback.es/api/tags',
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
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

    useEffect(() => {
        fetchAdvertData();
        fetchTags();
    }, []);

    // Función para manejar los cambios en los campos del formulario
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setNewAdvertData((prevState) => ({
            ...(prevState as Advert),
            [name]: value,
        }));
    };

    // Función para manejar el envío del formulario de edición
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `https://coderstrikeback.es/api/advert/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newAdvertData),
                }
            );
            if (response.ok) {
                router.push(`/adverts/${id}`);
            } else {
                console.error('Error al actualizar el anuncio');
            }
        } catch (error) {
            console.error('Error actualizando anuncio:', error);
        }
    };

    return (
        <div
            style={{
                flexDirection: 'column',
            }}
            className="align-items-center flex justify-content-center lg:px-8 md:px-6 px-4 py-8 surface-ground ng-star-inserted"
        >
            <h2>Edita tu anuncio</h2>
            <div className="px-3 py-4 w-full h-full flex flex-column surface-card lg:w-7">
                <h5>Información del producto</h5>
                <div className="mt-4 p-col-6">
                    <form onSubmit={handleSubmit}>
                        {/* Nombre */}
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
                                value={newAdvertData ? newAdvertData.name : ''}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Descripción */}
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
                                value={
                                    newAdvertData
                                        ? newAdvertData.description
                                        : ''
                                }
                                onChange={handleChange}
                            />
                        </div>
                        {/* Precio */}
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
                                    value={
                                        newAdvertData ? newAdvertData.price : ''
                                    }
                                    onChange={handleChange}
                                />
                            </span>
                        </div>
                        {/* Imagen */}
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
                                //value={newAdvertData ? newAdvertData.image : ''}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Tags */}
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
                        <Button label="Actualizar Anuncio" type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
}
