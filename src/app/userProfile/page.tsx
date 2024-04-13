'use client';
import { useState, useEffect, useContext } from 'react';
import { SessionContext } from '@/context/sessionContext';
import { Advert } from '@/types/general.types';
import Link from 'next/link';
import { Button } from 'primereact/button';
import Image from 'next/image';
import { TabView, TabPanel } from 'primereact/tabview';

const UserPage = () => {
    const { token, userDetails } = useContext(SessionContext);
    const [userAdverts, setUserAdverts] = useState<Advert[]>([]);
    const [favoriteAdverts, setFavoriteAdverts] = useState<Advert[]>([]);

    useEffect(() => {
        const fetchUserAdverts = async () => {
            try {
                const response = await fetch(
                    'https://coderstrikeback.es/api/adverts-user',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Error al traer los anuncios del usuario');
                }

                const data = await response.json();
                setUserAdverts(data.adverts);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserAdverts();
    }, [token]);

    useEffect(() => {
        const fetchFavoriteAdverts = async () => {
            try {
                const response = await fetch(
                    'https://coderstrikeback.es/api/adverts-user',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        'Error al obtener los anuncios favoritos del usuario'
                    );
                }

                const data = await response.json();
                const favoriteIds = data.user.favorites;

                const advertPromises = favoriteIds.map(
                    async (advertId: string) => {
                        const advertResponse = await fetch(
                            `https://coderstrikeback.es/api/advert/id/${advertId}`
                        );
                        if (!advertResponse.ok) {
                            throw new Error(
                                'Error al obtener el detalle del anuncio favorito'
                            );
                        }
                        return advertResponse.json();
                    }
                );

                const favoriteAdvertsData = await Promise.all(advertPromises);
                setFavoriteAdverts(favoriteAdvertsData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFavoriteAdverts();
    }, [token]);

    return (
        <div>
            <div className="flex">
                <div
                    style={{
                        borderRight: 'solid',
                        borderRightWidth: '1px',
                        borderRightColor: 'rgb(207 216 226 / 90%)',
                        flexDirection: 'column',
                    }}
                    className="flex col-2 py-4 px-4 surface-section h-screen border-right-1 surface-border flex flex-column w-18rem select-none left-0 top-0"
                >
                    <span className="text-900 font-medium text-xl">
                        {userDetails?.user.username}
                    </span>
                    <span className="py-2">{userDetails?.user.email}</span>
                </div>
                <div className="col-10 xl:col-10">
                    <TabView>
                        <TabPanel header="Mis anuncios">
                            <div className="flex justify-content-center text-1xl">
                                <div className="col-10 xl:col-10">
                                    <h5 className="text-1xl font-small text-900 mt-6 mb-2">
                                        Mis Anuncios
                                    </h5>
                                    <div className="surface-card p-4 shadow-2 border-round">
                                        <table
                                            style={{
                                                width: '100%',
                                            }}
                                            role="table"
                                            className=" p-datatable p-datatable-table ng-star-inserted"
                                        >
                                            <thead
                                                style={{
                                                    textAlign: 'left',
                                                }}
                                                role="rowgroup"
                                                className="p-datatable-thead text-align-left"
                                            >
                                                <tr className="ng-star-inserted">
                                                    <th role="columnheader">
                                                        Foto
                                                    </th>
                                                    <th role="columnheader">
                                                        Nombre del producto
                                                    </th>
                                                    <th role="columnheader">
                                                        Precio
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                role="rowgroup"
                                                className="p-element p-datatable-tbody"
                                            >
                                                {userAdverts.map((advert) => (
                                                    <tr
                                                        key={advert._id}
                                                        className="ng-star-inserted"
                                                    >
                                                        <td>
                                                            <Image
                                                                width={80}
                                                                height={80}
                                                                src={
                                                                    advert.image
                                                                }
                                                                alt="product image"
                                                                className="shadow-4"
                                                                style={{
                                                                    objectFit:
                                                                        'cover',
                                                                }}
                                                            />
                                                        </td>
                                                        <td>{advert.name}</td>
                                                        <td>{advert.price}€</td>
                                                        <td>
                                                            <Link
                                                                href={{
                                                                    pathname: `/adverts/${advert._id}`,
                                                                }}
                                                            >
                                                                <Button
                                                                    icon="pi pi-pencil"
                                                                    className="cursor-pointer p-element p-ripple p-button p-button-secondary p-button-outlined p-button p-component p-button-icon-only"
                                                                />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel header="Favoritos">
                            <div className="flex justify-content-center">
                                <div className="col-10 xl:col-10">
                                    <h5 className="text-1xl font-medium text-900 mt-6 mb-2">
                                        Favoritos
                                    </h5>
                                    <div className="surface-card p-4 shadow-2 border-round grid grid-nogutter ng-star-inserted">
                                        {favoriteAdverts.map((advert) => (
                                            <div
                                                key={advert._id}
                                                className="card m-3 border-1 surface-border"
                                            >
                                                <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-2">
                                                    <div className="flex align-items-center">
                                                        <i className="pi pi-tags mr-2"></i>
                                                        <span className="font-semibold">
                                                            {advert.tags}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-column align-items-center text-center mb-3">
                                                    <Image
                                                        width={200}
                                                        height={200}
                                                        src={advert.image}
                                                        alt={advert.name}
                                                        className="shadow-4 mb-2"
                                                        style={{
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                    <span className="font-semibold">
                                                        {advert.name}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-2">
                                                    <p
                                                        style={{
                                                            lineClamp: '1',
                                                        }}
                                                    >
                                                        {advert.description}
                                                    </p>
                                                </div>
                                                <div className="flex align-items-center justify-content-between">
                                                    <span className="text-1l font-bold mt-2">
                                                        {advert.price}€
                                                    </span>
                                                    <button
                                                        className="p-ripple p-element p-button p-component p-button-icon-only"
                                                        type="button"
                                                    >
                                                        <span className="pi pi-heart-fill p-button-icon ng-star-inserted"></span>
                                                        <span
                                                            className="p-ink"
                                                            aria-hidden="true"
                                                            role="presentation"
                                                        ></span>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
