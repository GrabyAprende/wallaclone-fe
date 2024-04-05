'use client';
import { Advert, UserDetails } from '@/types/general.types';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Avatar } from 'primereact/avatar';
import { redirect } from 'next/navigation';
import Image from 'next/image';

import { useContext, useState, useEffect } from 'react';
import { SessionContext } from '@/context/sessionContext';

import { ConfirmDialog } from 'primereact/confirmdialog';

interface Props {
    params: {
        id: string;
    };
}

async function getData(id: string) {
    const res = await fetch(`https://coderstrikeback.es/api/advert/id/${id}`);
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

//Probando con ConfirmDialog
export default async function Page({ params: { id } }: Props) {
    const { isLogged, userDetails, token } = useContext(SessionContext); //accedemos al estado global de la app
    const [visible, setVisible] = useState(false); //State para manejar el dialog/popup
    //const [ownerName, setOwnerName] = useState('');

    const product = (await getData(id)) as Advert;

    //Obtengo el nombre del usuario creador del anuncio
    // useEffect(() => {
    //     async function fetchOwnerName() {
    //         try {
    //             const response = await fetch(
    //                 'https://coderstrikeback.es/api/adverts-user',
    //                 {
    //                     method: 'GET',
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                 }
    //             );

    //             if (!response.ok) {
    //                 console.error(
    //                     'Error fetching user details:',
    //                     response.status
    //                 );
    //                 return;
    //             }

    //             const userDetails: UserDetails = await response.json();
    //             const advert = userDetails.adverts.find(
    //                 (advert) => advert._id === id
    //             );

    //             if (advert) {
    //                 setOwnerName(userDetails.user.username);
    //             } else {
    //                 console.error(
    //                     'Anuncio no encontrado en la lista de anuncios del usuario'
    //                 );
    //             }
    //         } catch (error) {
    //             console.error('Error trayendo datos del usuario:', error);
    //         }
    //     }

    //     if (isLogged && token) {
    //         fetchOwnerName();
    //     }
    // }, [id, isLogged, token]);

    //Redirige a home al hacer click en el heart Button
    const handleHeartButtonClick = (e: any) => {
        e.preventDefault();

        console.log('Heart button clicked');
        redirect('/register');
    };

    //Borrar un anuncio
    const handleDeleteAdvert = () => {
        setVisible(true); // muestro el dialog/popup para confirmar el borrado
    };

    const hideDialog = () => {
        setVisible(false);
    };

    const confirmDeleteAdvert = async () => {
        try {
            console.log('Token:', token);
            if (!token) {
                console.error('Token no disponible');
                return;
            }

            const response = await fetch(
                `https://coderstrikeback.es/api/advert/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                console.error('Error eliminando el anuncio:', response.status);
                return;
            }

            redirect('/');
        } catch (error) {
            console.error(
                'Un error ha ocurrido al intentar eliminar el anuncio:',
                error
            );
        }
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
                            {userDetails?.user.username && (
                                <span className="p-component p-avatar-text ng-star-inserted p-avatar-l">
                                    {userDetails.user.username.charAt(0)}
                                </span>
                            )}
                        </Avatar>
                        <span className="px-3">
                            {userDetails?.user.username}
                        </span>
                        {/* <Avatar
                            size="large"
                            shape="circle"
                            className="p-avatar p-element p-avatar-circle flex align-items-center justify-content-center"
                        >
                            {ownerName && (
                                <span className="p-component p-avatar-text ng-star-inserted p-avatar-l">
                                    {ownerName.charAt(0)}
                                </span>
                            )}
                        </Avatar>
                        <span className="px-3">{ownerName}</span> */}
                    </div>
                    <div className="flex justify-content-between align-items-center gap-2">
                        {isLogged ? (
                            <div className="flex justify-content-between align-items-center gap-2">
                                <Button
                                    onClick={(e) => handleHeartButtonClick(e)}
                                    icon="pi pi-heart"
                                    className="cursor-pointer p-element p-ripple p-button p-button-rounded p-button-help p-button-outlined p-button p-component p-button-icon-only"
                                />
                                <Button
                                    icon="pi pi-pencil"
                                    className="cursor-pointer p-element p-ripple p-button p-button-rounded p-button-secondary p-button-outlined p-button p-component p-button-icon-only"
                                    //onClick={handleEditAdvert}
                                />
                                <Button
                                    icon="pi pi-trash"
                                    className="cursor-pointer p-element p-ripple p-button p-button-rounded p-button-danger p-button-outlined p-button p-component p-button-icon-only"
                                    onClick={handleDeleteAdvert}
                                />
                            </div>
                        ) : (
                            <div>
                                <Button
                                    onClick={(e) => handleHeartButtonClick(e)}
                                    icon="pi pi-heart"
                                    className="cursor-pointer p-element p-ripple p-button p-button-rounded p-button-help p-button-outlined p-button p-component p-button-icon-only"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <hr className="mb-3 mx-0 border-top-1 border-none surface-border mt-auto" />
                <div className="relative mb-3">
                    <Image
                        src={product.image}
                        width={600}
                        height={500}
                        alt="product image"
                        className="w-full"
                        style={{ objectFit: 'cover' }}
                    />
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
            {/* Confirm Popup */}
            <ConfirmDialog
                visible={visible}
                onHide={hideDialog}
                message="¿Deseas eliminar este anuncio?"
                header="Confirmación"
                icon="pi pi-exclamation-triangle"
                pt={{
                    headerTitle: {
                        className: 'text-primary',
                    },
                }}
                accept={confirmDeleteAdvert}
            />
        </div>
    );
}
