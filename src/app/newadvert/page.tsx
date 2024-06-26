'use client';

import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { MultiSelect } from 'primereact/multiselect';
import { SelectButton } from 'primereact/selectbutton';
import { Advert, UserDetails } from '@/types/general.types';
import { SessionContext } from '@/context/sessionContext';
import { MessagesContext } from '@/context/messagesContext';

const statusOptions = [
    { label: 'En venta', value: true },
    { label: 'Comprando', value: false },
];

export default function NewAdvertPage() {
    const { token } = useContext(SessionContext);
    // Recogemos del contexto MessageContext,
    // las estructuras (funciones) de mensajes que usaremos
    const { showSuccessMessage, showErrorMessage } =
        useContext(MessagesContext);
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
                // Así mostramos los mensajes de error al usuario
                showErrorMessage('Fallo al recuperar tags');
                console.error('Failed to fetch tags');
            }
        } catch (error) {
            console.error('Error fetching tags:', error);
            // Así mostramos los mensajes de error al usuario
            showErrorMessage('Fallo al recuperar tags');
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
        if (e.target) {
            // Verificar que e.target no sea null
            const { name, value } = e.target;
            let newValue: string | File | null = value;
            if (
                (e.target as HTMLInputElement).files &&
                (e.target as HTMLInputElement).files?.length
            ) {
                newValue = (
                    (e.target as HTMLInputElement).files as FileList
                )[0];
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

        // Validar que los campos obligatorios estén completos
        if (!advertData.name || !advertData.description || !advertData.price) {
            showErrorMessage(
                'Por favor, completa todos los campos obligatorios.'
            );
            return;
        }

        // Validar que el precio sea mayor a 0
        if (parseFloat(advertData.price) <= 0) {
            showErrorMessage('El precio debe ser mayor a 0.');
            return;
        }

        // Validar la longitud del nombre y descripción
        if (advertData.name.length < 3) {
            showErrorMessage(
                'El nombre del artículo debe tener al menos 3 caracteres.'
            );
            return;
        }
        if (
            advertData.description.length < 10 ||
            advertData.description.length > 200
        ) {
            showErrorMessage(
                'La descripción debe tener entre 10 y 200 caracteres.'
            );
            return;
        }

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
                    advertData[safeKey].forEach((tag) => {
                        formData.append(safeKey, tag);
                    });

                    // Convertimos todos los valores a string, excepto los Files/Blobs.
                } else if (safeKey !== 'file') {
                    // Obtenemos el valor de adverData[safeKey] (nombre, precio, etc)
                    const value = advertData[safeKey];

                    // Convertimos valores booleanos y numéricos a string.
                    if (
                        typeof value === 'boolean' ||
                        typeof value === 'number'
                    ) {
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
            const response = await fetch(
                'https://coderstrikeback.es/api/advert/new',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            // Si todo va bien y hay respuesta, redireccionamos al detalle del nuevo anuncio
            // si no, pues lanzamos error
            if (response.ok) {
                const newAdvert: Advert = await response.json();
                router.push(`/adverts/${newAdvert._id}`);
                // Así mostramos los mensajes de exito al usuario
                showSuccessMessage('Nuevo anuncio creado');
            } else {
                console.error('Failed to create advert');
                // Así mostramos los mensajes de error al usuario
                showSuccessMessage('Fallo al crear anuncio');
            }
        } catch (error) {
            console.error('Error creating advert:', error);
            // Así mostramos los mensajes de error al usuario
            showSuccessMessage('Fallo inesperado al crear anuncio');
        }
    };

    return (
        <div className="flex flex-column align-items-center justify-content-center">
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background:
                            'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)',
                    }}
                    className="lg:w-4"
                >
                    <div
                        className="w-full surface-card py-8 px-5 sm:px-8"
                        style={{ borderRadius: '53px' }}
                    >
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">
                                Sube tu anuncio
                            </div>
                        </div>

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
                                required
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
                                required
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
                                    required
                                />
                            </span>
                        </div>

                        <div className="p-field mb-3">
                            <label
                                className="block font-medium mb-2"
                                htmlFor="status"
                            >
                                Estado
                            </label>
                            <SelectButton
                                value={advertData.status}
                                options={statusOptions}
                                onChange={(e) => {
                                    // Cuando cambia la selección, actualizamos el estado de advertData
                                    setAdvertData((prevState) => ({
                                        ...prevState,
                                        status: e.value, // El nuevo valor seleccionado
                                    }));
                                }}
                            />
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
                                onChange={(event) => {
                                    setAdvertData((oldData) => ({
                                        ...oldData,
                                        file: (
                                            event.target.files as FileList
                                        )[0],
                                    }));
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
                                    setSelectedTags(e.value);
                                    setAdvertData((oldData) => ({
                                        ...oldData,
                                        tags: e.value,
                                    }));
                                }}
                                optionLabel="label"
                                className="w-full"
                                placeholder="Select Tags"
                            />
                        </div>

                        <Button
                            className="w-full"
                            label="Crear Anuncio"
                            type="submit"
                        />
                    </form>
                    </div>
                </div>
        </div>
    );
}
