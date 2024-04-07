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
    
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    //Creo el estado inicial del anuncio nuevo
    const [advertData, setAdvertData] = useState<{
        name: string;
        description: string;
        price: string;
        file: File | null;
        tags: string[];
        status: boolean;
    }>({
        name: '',
        description: '',
        price: '0',
        file: null,
        tags: [],
        status: true,
    });

    const fetchTags = async () => {
        try {
            const response = await fetch('https://coderstrikeback.es/api/tags', {
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
        if (!isLogged) router.push('/register')
        fetchTags();
    }, []);

    //Actualizo los cambios
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (e.target) { // Verificar que e.target no sea null
            const { name, value } = e.target;
            let newValue: string | File | null = value;
            if ((e.target as HTMLInputElement).files && (e.target as HTMLInputElement).files?.length) {
                newValue = ((e.target as HTMLInputElement).files as FileList)[0];
            }
            setAdvertData((prevState) => ({
                ...prevState,
                [name]: newValue,
            }));
        }
    };

    //Manejo el envío del form
    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            // utilizamos formData porque vamos a manejar un fichero
            const formData = new FormData();

            // Agregar todos los campos de adverData excepto 'image' a formData
            for (const key in advertData) {

                // safeKey nos asegura que la key es una key de adverData (para TypeScript)
                const safeKey = key as keyof typeof advertData;

                // Como tags es un array, lo trataremos diferente
                if (safeKey === 'tags') {
                    // Para los arrays, agregamos cada elemento individualmente.
                    advertData[safeKey].forEach(tag => {
                        formData.append(safeKey, tag);
                    });

                // Convertimos todos los valores a string, excepto los Files/Blobs.
                } else if (safeKey !== 'file') {
                    // Obtenemos el valor de adverData[safeKey] (nombre, precio, etc)
                    const value = advertData[safeKey];

                    // Convertimos valores booleanos y numéricos a string.
                    if (typeof value === 'boolean' || typeof value === 'number') {
                        formData.append(safeKey, value.toString());

                    // Los strings se pueden añadir directamente.
                    } else if (typeof value === 'string') {
                        formData.append(safeKey, value);
                    } 
                }
            }

            // Agregamos el archivo a formData, si existe
            if (advertData.file) {
                formData.append('image', advertData.file, advertData.file.name);
            }

            // Ahora haremos el fetch sin la cabecera de json, porque la haremos con formData (tampoco haremos stringify)
           const response = await fetch('https://coderstrikeback.es/api/advert/new', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });


            // Si todo va bien y hay respuesta, redireccionamos al detalle del nuevo anuncio
            // si no, pues lanzamos error
            if (response.ok) {
                const newAdvert: Advert = await response.json();
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
                                onChange={(event) =>{
                                    setAdvertData((oldData) => ({
                                        ...oldData,
                                        file: (event.target.files as FileList)[0]
                                    }))
                                }}
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
                                onChange={(e) => {
                                    setSelectedTags(e.value)
                                    setAdvertData((oldData) => ({
                                        ...oldData,
                                        tags: e.value
                                    }))
                                
                                }
                                    
                                }
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
