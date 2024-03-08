"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useRef, useState } from "react";
import Link from "next/link";

import { StyleClass } from "primereact/styleclass";
import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";
import { Divider } from "primereact/divider";
import { LayoutContext } from "../layout/context/layoutcontext";
import { NodeRef } from "@/types";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Logo } from "./components/form/logo";
import Image from "next/image";
import { AdvertsList } from "./components/list/advertsList";

const HomePage = () => {
    const [isHidden, setIsHidden] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const menuRef = useRef<HTMLElement | null>(null);

    const toggleMenuItemClick = () => {
        setIsHidden(prevState => !prevState);
    };

    return (
        <div className="surface-0 flex justify-content-center">
            <div id="home" className="landing-wrapper overflow-hidden w-full">
                {/* HEADER */} 
                <div className="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static">
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
                            "align-items-center surface-0 flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2",
                            { hidden: isHidden }
                        )}
                        style={{ top: "100%" }}
                    >
                        <div className="flex flex-column w-full">

                            <div className="m-0 mb-2 md:ml-5">
                                <span className="p-input-icon-right w-full">
                                    <InputText className="w-full" type="text" placeholder="Search" />
                                    <i className="pi pi-search" />
                                </span>
                            </div>
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
                            <Link href={{ pathname: "/login" }} className="flex justify-content-center">
                                <Button
                                    label="Login"
                                    text
                                    rounded
                                    className="border-none font-light line-height-2 text-violet-500"
                                ></Button>
                            </Link>
                            <Link href={{ pathname: "/register" }} className="flex justify-content-center">
                                <Button
                                    label="Regístrate"
                                    rounded
                                    className="border-none ml-5 font-light line-height-2 bg-violet-500 text-white md:ml-0"
                                ></Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* HERO */} 
                <div
                    id="hero"
                    className="flex flex-column pt-4 px-4 lg:px-8 overflow-hidden"
                    style={{
                        background:
                            "linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #EEEFAF 0%, #C3E3FA 100%)",
                        clipPath: "ellipse(150% 87% at 93% 13%)",
                    }}
                >
                    <div className="mx-4 md:mx-8 mt-0 md:mt-4">
                        <h1 className="text-6xl font-bold text-gray-900 line-height-2">
                            <span className="font-light block">
                            Explora 
                            </span>
                            Wallaclone!!!
                        </h1>
                        <p className="font-normal text-2xl line-height-3 md:mt-3 text-gray-700">
                        y Descubre Ofertas Únicas en Artículos Nuevos y Usados
                        </p>
                        <Link href={{ pathname: "/register" }}>
                        <Button
                            type="button"
                            label="¿Crear anuncio?"
                            rounded
                            className="text-xl border-none mt-3 bg-violet-500 font-normal line-height-3 px-3 text-white"
                            ></Button>
                        </Link>
                    </div>
                    <div className="flex justify-content-center md:justify-content-end mt-3">
                        <Image
                            fill
                            src="/images/screen-1.webp"
                            alt="Hero Image"
                            className="relative w-9 md:w-6"
                        />
                    </div>
                </div>

                {/* MAIN */}
                <div id="highlights" className="py-4 px-4 lg:px-8 mx-0 my-6 lg:mx-8">
                    <div className="text-center">
                        <h2 className="text-900 font-normal mb-2">Powerful Everywhere</h2>
                        <span className="text-600 text-2xl">Amet consectetur adipiscing elit...</span>
                    </div>

                    <div className="grid mt-8 pb-2 md:pb-8">
                        <AdvertsList />
                    </div>
                </div>


                    {/* FOOTER */}
                <div className="py-4 px-4 mx-0 mt-8 lg:mx-8">
                    <div className="grid justify-content-between">
                        <div className="col-12 md:col-2" style={{ marginTop: '-1.5rem' }}>
                            <Link href="/" className="flex flex-wrap align-items-center justify-content-center md:justify-content-start md:mb-0 mb-3 cursor-pointer">
                                <img src={`/layout/images/logo.png`} alt="footer sections" width="80" height="50" className="ml-4 mr-2" />
                                <span className="font-extralight text-1xl text-gray-500">Copyright © 2024</span>
                            </Link>
                        </div>

                        <div className="col-12 md:col-10 lg:col-7">
                            <div className="grid text-center md:text-left">
                                <div className="col-12 md:col-3">
                                    <h4 className="font-medium text-xl line-height-3 mb-3 text-700">Wallaclone</h4>
                                    <a className="line-height-3 text-l block cursor-pointer mb-2 text-gray-500">Quiénes somos</a>
                                    <a className="line-height-3 text-l block cursor-pointer mb-2 text-gray-500">Cómo funciona</a>
                                    <a className="line-height-3 text-l block cursor-pointer mb-2 text-gray-500">Trabaja con nosotros</a>
                                </div>

                                <div className="col-12 md:col-3 mt-4 md:mt-0">
                                    <h4 className="font-medium text-xl line-height-3 mb-3 text-700">Soporte</h4>
                                    <a className="line-height-3 text-l block cursor-pointer mb-2 text-gray-500">Centro de ayuda</a>
                                    <a className="line-height-3 text-l block cursor-pointer mb-2 text-gray-500">Reglas de publicación</a>
                                    <a className="line-height-3 text-l block cursor-pointer text-gray-500">Consejos de seguridad</a>
                                </div>

                                <div className="col-12 md:col-3 mt-4 md:mt-0">
                                    <h4 className="font-medium text-xl line-height-3 mb-3 text-700">Aviso legal</h4>
                                    <a className="line-height-3 text-l block cursor-pointer mb-2 text-gray-500">Condiciones de uso</a>
                                    <a className="line-height-3 text-l block cursor-pointer mb-2 text-gray-500">Política de privacidad</a>
                                    <a className="line-height-3 text-l block cursor-pointer text-gray-500">Política de Cookies</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
