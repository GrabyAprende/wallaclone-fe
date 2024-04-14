'use client';
import { Advert, UserDetails } from '@/types/general.types';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Avatar } from 'primereact/avatar';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '@/context/sessionContext';

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { MessagesContext } from '@/context/messagesContext';

interface Props {
    params: {
        id: string;
    };
}

async function getData(id: string) {
    const res = await fetch(`https://coderstrikeback.es/api/advert/id/${id}`);
    if (!res.ok) {
        console.log(res);
    }
    return res.json();
}

async function getUserData(id: string) {
    const res = await fetch(`https://coderstrikeback.es/api/get-user/${id}`);
    if (!res.ok) {
        console.log(res);
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

export default function Page({ params: { id } }: Props) {
    const { isLogged, userDetails, token } = useContext(SessionContext); //accedemos al estado global de la app
    const router = useRouter();

    // Recogemos del contexto MessageContext,
    // las estructuras (funciones) de mensajes que usaremos
    const { showSuccessMessage, showInfoMessage, showErrorMessage } =
        useContext(MessagesContext);

    // Como vamos a usar useContext, este componente será de parte del cliente
    // Por eso, ya no puede ser async Page, y por eso vamos a usar las herramientas
    // de React como useState, en este caso, creatremos dos states: product y owner
    const [product, setProduct] = useState<Advert>();
    const [owner, setOwner] = useState<UserDetails['user']>();

    //Estate de Favorito
    const [isFavorite, setIsFavorite] = useState(false);

    //Para compartir el anuncio
    const [twitterText, setTwitterText] = useState('');

    // Crearemos una función asíncrona para obtener el producto
    // Si no hay error, lo asignamos a su state product
    const fetchProduct = async () => {
        try {
            const fetchedProduct: Advert = (await getData(id)) as Advert;
            setProduct(fetchedProduct);
        } catch (error) {
            // Así mostramos los mensajes de error al usuario
            showErrorMessage('Error fetching product');
        }
    };

    // Cuando el componente cargue, llamamos a la funcion
    // para hacer la carga del producto
    useEffect(() => {
        fetchProduct();
    }, []);

    // Verifico si el anuncio es favorito
    useEffect(() => {
        if (userDetails && product) {
            setIsFavorite(userDetails.user.favorites.includes(product._id));
        }
    }, [userDetails, product]);

    // Creamos el texto del tweet
    useEffect(() => {
        if (product) {
            const tweetText = `¡Mira este producto increíble! ${product.name} - ${product.price} € ${window.location.href}`;
            setTwitterText(encodeURIComponent(tweetText));
        }
    }, [product]);

    // Cuando el producto cambie (la primera vez de null al producto obtenido)
    // Si hay producto, obtendremos los datos del propietario (owner) y lo pondremos en su estado con setOwner
    useEffect(() => {
        if (product) {
            const fetchUserData = async () => {
                try {
                    const fetchedUserData: UserDetails['user'][] =
                        await getUserData(product.owner);
                    setOwner(fetchedUserData[0]);
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            };
            fetchUserData();
        }
    }, [product]);

    //Comprobar que el usuario loggeado sea el mismo que el creador del anuncio
    const isOwner = userDetails?.user._id === product?.owner;

    //Lógica para que el usuario añada como el anuncio como Favorito
    async function toggleFavoriteAdvert(advertId: string, token: string) {
        try {
            const response = await fetch(
                `https://coderstrikeback.es/api/user/favorite/${advertId}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                showSuccessMessage(
                    'Anuncio agregado/eliminado de favoritos exitosamente'
                );
            } else {
                const responseData = await response.json();
                showErrorMessage(responseData.message);
            }
        } catch (error) {
            console.error(error);
            showErrorMessage(
                'Error inesperando intentando agregar/eliminar anuncio a Favoritos'
            );
        }
    }

    const handleToggleFavorite = async (advertId: string) => {
        try {
            if (!token) {
                console.error('Token no disponible');
                return;
            }
            await toggleFavoriteAdvert(advertId, token);
            setIsFavorite((prevState) => !prevState);
        } catch (error) {
            console.error('Error al agregar/eliminar de favoritos:', error);
        }
    };

    //Borrar un anuncio
    const confirmDeleteAdvert = async () => {
        try {
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

            // Así mostramos los mensajes de éxito al usuario
            showSuccessMessage('Borrado exitoso');
            router.push(`/`);
        } catch (error) {
            console.error(
                'Un error ha ocurrido al intentar eliminar el anuncio:',
                error
            );
        }
    };

    // Esta es la función que se encargará de mostrar el mensaje del popUp (leer documentacion de primeReact)
    const confirm1 = () => {
        confirmDialog({
            message: '¿Estás seguro que quieres eliminar el anuncio?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => confirmDeleteAdvert(),
        });
    };

    // Si no hay product o no hay owner, el componente mostrará un loading (porque aún se está cargando)
    const isLoading = !product || !owner;

    // Si está cargando mostraremos un ... is loading (Esto puede ser temporal o mostrar un componente loader)
    // Si tenemos producto y owner, mostramos el componente con los detalles del producto
    return isLoading ? (
        <p>... is loading</p>
    ) : (
        <div className="align-items-center flex justify-content-center lg:px-8 md:px-6 px-4 py-8 surface-ground ng-star-inserted">
            <div className="shadow-2 p-3 h-full flex flex-column surface-card lg:w-7">
                <div className="flex justify-content-between align-items-center mb-3">
                    <div className="flex justify-content-between align-items-center">
                        <Avatar
                            size="large"
                            shape="circle"
                            className="p-avatar p-element p-avatar-circle flex align-items-center justify-content-center"
                        >
                            {owner.username && (
                                <span className="p-component p-avatar-text ng-star-inserted p-avatar-l">
                                    {owner.username.charAt(0)}
                                </span>
                            )}
                        </Avatar>
                        <span className="px-3">{owner.username}</span>
                    </div>

                    <div className="flex justify-content-between align-items-center gap-2">
                        {isLogged ? (
                            isOwner ? (
                                // Si está logueado y es propietario del anuncio
                                <div className="flex justify-content-between align-items-center gap-2">
                                    <Link
                                        href={{
                                            pathname: `/editAdvert/${id}`,
                                        }}
                                    >
                                        <Button
                                            icon="pi pi-pencil"
                                            className="cursor-pointer p-element p-ripple p-button p-button-rounded p-button-secondary p-button-outlined p-button p-component p-button-icon-only"
                                        />
                                    </Link>
                                    <Button
                                        icon="pi pi-trash"
                                        className="cursor-pointer p-element p-ripple p-button p-button-rounded p-button-danger p-button-outlined p-button p-component p-button-icon-only"
                                        onClick={confirm1}
                                    />
                                    <Button
                                        icon="pi pi-twitter"
                                        className="cursor-pointer p-element p-ripple p-button p-button-rounded p-button-secondary p-button-info p-button p-component p-button-icon-only"
                                        onClick={() => {
                                            const twitterUrl = `https://twitter.com/intent/tweet?text=${twitterText}`;
                                            window.open(twitterUrl, '_blank');
                                        }}
                                    />
                                </div>
                            ) : (
                                // Si está logueado pero no es propietario del anuncio
                                <div className="flex justify-content-between align-items-center gap-2">
                                    <Button
                                        onClick={() =>
                                            handleToggleFavorite(product?._id)
                                        }
                                        icon="pi pi-heart"
                                        className={`cursor-pointer p-element p-ripple p-button p-button-rounded ${
                                            isFavorite
                                                ? ''
                                                : 'p-button-outlined'
                                        } p-button p-component p-button-icon-only`}
                                    />
                                    <Button
                                        icon="pi pi-twitter"
                                        className="cursor-pointer p-element p-ripple p-button p-button-rounded p-button-secondary p-button-info p-button p-component p-button-icon-only"
                                        onClick={() => {
                                            const twitterUrl = `https://twitter.com/intent/tweet?text=${twitterText}`;
                                            window.open(twitterUrl, '_blank');
                                        }}
                                    />
                                    <Button
                                        className="p-button-outlined"
                                        style={{
                                            backgroundColor:
                                                'rgb(226, 226, 255)',
                                        }}
                                        label="Contacta con el vendedor"
                                    ></Button>
                                </div>
                            )
                        ) : (
                            // Si no está logueado
                            <div className="flex justify-content-between align-items-center gap-2">
                                <Link
                                    href={{
                                        pathname: `/login`,
                                    }}
                                >
                                    <Button
                                        icon="pi pi-heart"
                                        className="cursor-pointer p-element p-ripple p-button p-button-rounded p-button-help p-button-outlined p-button p-component p-button-icon-only"
                                    />
                                </Link>
                                <Button
                                    icon="pi pi-twitter"
                                    className="cursor-pointer p-element p-ripple p-button p-button-rounded p-button-secondary p-button-info p-button p-component p-button-icon-only"
                                    onClick={() => {
                                        const twitterUrl = `https://twitter.com/intent/tweet?text=${twitterText}`;
                                        window.open(twitterUrl, '_blank');
                                    }}
                                />
                                <Button
                                    className="p-button-outlined"
                                    style={{
                                        backgroundColor: 'rgb(226, 226, 255)',
                                    }}
                                    label="Contacta con el vendedor"
                                ></Button>
                            </div>
                        )}
                    </div>
                </div>

                <hr className="mb-3 mx-0 border-top-1 border-none surface-border mt-auto" />
                <div className="relative mb-3">
                    <Image
                        width={600}
                        height={400}
                        src={product.image}
                        alt="product image"
                        className="w-full"
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className="flex gap-4 align-items-center">
                    <span className="font-bold text-2xl text-900">
                        {product.price} €
                    </span>
                    {product.status ? (
                        <span className="flex align-items-center">
                            <i
                                className="pi pi-cart-plus text-gray-500 mr-1"
                                style={{ fontSize: '1.5rem' }}
                            ></i>
                            <span className="font-medium">En venta</span>
                        </span>
                    ) : (
                        <span className="flex align-items-center">
                            <i
                                className="pi pi-money-bill text-gray-500 mr-1"
                                style={{ fontSize: '1.5rem' }}
                            ></i>
                            <span className="font-medium">Comprando</span>
                        </span>
                    )}
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
                <div className="flex flex-wrap align-items-center gap-2 mb-3">
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
            <ConfirmDialog />
        </div>
    );
}
