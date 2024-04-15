'use client';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

import { StyleClass } from "primereact/styleclass";
import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";
import { NodeRef } from "@/types";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Logo } from "../form/logo";
import { SessionContext } from "@/context/sessionContext";
import { useRouter } from "next/navigation";

export const Header = () => {
    const [isHidden, setIsHidden] = useState(false);
    const menuRef = useRef<HTMLElement | null>(null);
    const [search, setSearch] = useState("")
    const router = useRouter();

    const toggleMenuItemClick = () => {
        setIsHidden((prevState) => !prevState);
    };

    const { isLogged, userDetails, logout } = useContext(SessionContext); //accedemos al estado global de la app

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setSearch(e.target.value)
    }
    const handleSubmitSearch = (e: React.SyntheticEvent) => {
        e.preventDefault();
        router.push(`/search/${search}`);
    }

    return (
        <div className="py-4 px-4 mx-0 w-full bg-white lg:px-8 flex align-items-center justify-content-between relative lg:static">
            <Link href="/" className="flex align-items-center">
                <Logo />
            </Link>
            <StyleClass
                nodeRef={menuRef as NodeRef}
                selector="@next"
                enterClassName="hidden"
                leaveToClassName="hidden"
                hideOnOutsideClick
            >
                <i
                    ref={menuRef}
                    className="pi pi-bars text-4xl cursor-pointer block lg:hidden text-700"
                ></i>
            </StyleClass>
            <div
                className={classNames(
                    'align-items-center surface-0 flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2',
                    { hidden: isHidden }
                )}
                style={{ top: '100%' }}
            >
                <div className="flex flex-column w-full">
                    {/* BARRA DE BUSQUEDA */}
                    <div className="m-0 mb-2 md:ml-5">
                        <span className="w-full relative">
                            <form onSubmit={handleSubmitSearch}>
                            <InputText className="w-full" type="text" value={search} onChange={handleOnChange}  placeholder="Comienza a comprar o vender" />
                            </form>
                            <i className="pi pi-search absolute right-0 top-0 cursor-pointer text-400 p-3" onClick={handleSubmitSearch} />
                        </span>
                    </div>

                    {/* NAVEGACION */}
                    <ul className="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
                        <li>
                            <Link
                                href="/hogar-y-vida"
                                onClick={toggleMenuItemClick}
                                className="p-ripple flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3"
                            >
                                <span>Hogar y vida</span>
                                <Ripple />
                            </Link>
                        </li>
                        <li>
                            <a
                                href="#features"
                                onClick={toggleMenuItemClick}
                                className="p-ripple flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3"
                            >
                                <span>Moda y Accesorios</span>
                                <Ripple />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#highlights"
                                onClick={toggleMenuItemClick}
                                className="p-ripple flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3"
                            >
                                <span>Motor</span>
                                <Ripple />
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="flex justify-content-end py-3 md:flex-column md:ml-5">
                    {isLogged ? (
                        <div className="flex justify-content-center align-items-center flex-column">
                            <Link
                                href={{
                                    pathname: `/userProfile`,
                                }}
                            >
                                <div className="flex align-items-center cursor-pointer">
                                    <h4 className="mb-0 mr-2">
                                        {userDetails?.user.username}
                                    </h4>
                                    <i
                                        className="pi pi-user"
                                        style={{ fontSize: '2rem' }}
                                    ></i>
                                </div>
                            </Link>
                            <Button
                                onClick={logout}
                                label="Logout"
                                rounded
                                link
                                className="border-none ml-5 font-light line-height-2 bg-violet-500 text-black md:ml-0"
                            ></Button>
                        </div>
                    ) : (
                        <>
                            <Link
                                href={{ pathname: '/login' }}
                                className="flex justify-content-center"
                            >
                                <Button
                                    label="Login"
                                    text
                                    rounded
                                    className="border-none font-light line-height-2 text-violet-500 mb-2"
                                ></Button>
                            </Link>
                            <Link
                                href={{ pathname: '/register' }}
                                className="flex justify-content-center"
                            >
                                <Button
                                    label="Regístrate"
                                    rounded
                                    className="border-none ml-5 font-light line-height-2 bg-violet-500 text-white md:ml-0"
                                ></Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
