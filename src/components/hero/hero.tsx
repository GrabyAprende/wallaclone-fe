import { SessionContext } from "@/context/sessionContext";
import Image from "next/image"
import Link from "next/link"
import { Button } from "primereact/button"
import { useContext } from "react";

export const Hero = () => {

    const { isLogged, token } = useContext(SessionContext);

    return (
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
                <div className="flex justify-content-end py-3 md:flex-column">
                    {isLogged ? (
                        <div className="flex justify-content-start align-items-start flex-column">
                            <Link href={{ pathname: "/newadvert" }} className="flex justify-content-center">
                                    <Button
                                        label="¿Crear anuncio?"
                                        rounded
                                        className="text-xl border-none mt-3 bg-violet-500 font-normal line-height-3 px-3 text-white"
                                    ></Button>
                                </Link>
                        </div>
                    ) :
                        (
                            <>
                                
                                <Link href={{ pathname: "/register" }} className="flex justify-content-center">
                                <Button
                                        label="¿Crear anuncio?"
                                        rounded
                                        className="text-xl border-none mt-3 bg-violet-500 font-normal line-height-3 px-3 text-white"
                                    ></Button>
                                </Link>
                            </>
                        )}
                </div>
            
            </div>
            <div className="flex justify-content-center md:justify-content-end mt-3 relative">
                <Image
                    fill
                    src="/images/screen-1.webp"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt="Hero Image"
                    className="relative w-9 md:w-6"
                />
            </div>
        </div>
    )
}




