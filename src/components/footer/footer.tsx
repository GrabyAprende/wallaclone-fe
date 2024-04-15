import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
    return (
        <div className="py-8 px-8 mx-0 surface-ground .lg\:px-8">
            <div className="grid justify-content-between">
                <div
                    className="col-12 md:col-2"
                    style={{ marginTop: '-1.5rem' }}
                >
                    <Link
                        href="/"
                        className="flex flex-wrap align-items-center justify-content-center md:justify-content-start md:mb-0 mb-3 cursor-pointer"
                    >
                        <Image
                            width={80}
                            height={50}
                            src={`/layout/images/logo.png`}
                            alt="footer sections"
                            className="ml-4 mr-2"
                        />
                        <span className="font-extralight text-1xl text-gray-500">
                            Copyright © 2024
                        </span>
                    </Link>
                </div>

                <div className="col-12 md:col-10 lg:col-7">
                    <div className="grid text-center md:text-left">
                        <div className="col-12 md:col-3">
                            <h4 className="font-medium text-xl line-height-3 mb-3 text-700">
                                Wallaclone
                            </h4>
                            <a className="line-height-3 text-l block cursor-pointer mb-2 text-gray-500">
                                Quiénes somos
                            </a>
                            <a className="line-height-3 text-l block cursor-pointer mb-2 text-gray-500">
                                Cómo funciona
                            </a>
                            <a className="line-height-3 text-l block cursor-pointer mb-2 text-gray-500">
                                Trabaja con nosotros
                            </a>
                        </div>

                        <div className="col-12 md:col-3 mt-4 md:mt-0">
                            <h4 className="font-medium text-xl line-height-3 mb-3 text-700">
                                Soporte
                            </h4>
                            <a className="line-height-3 text-l block cursor-pointer mb-2 text-gray-500">
                                Centro de ayuda
                            </a>
                            <a className="line-height-3 text-l block cursor-pointer mb-2 text-gray-500">
                                Reglas de publicación
                            </a>
                            <a className="line-height-3 text-l block cursor-pointer text-gray-500">
                                Consejos de seguridad
                            </a>
                        </div>

                        <div className="col-12 md:col-3 mt-4 md:mt-0">
                            <h4 className="font-medium text-xl line-height-3 mb-3 text-700">
                                Aviso legal
                            </h4>
                            <a className="line-height-3 text-l block cursor-pointer mb-2 text-gray-500">
                                Condiciones de uso
                            </a>
                            <a className="line-height-3 text-l block cursor-pointer mb-2 text-gray-500">
                                Política de privacidad
                            </a>
                            <a className="line-height-3 text-l block cursor-pointer text-gray-500">
                                Política de Cookies
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
