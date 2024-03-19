/* eslint-disable @next/next/no-img-element */
import { redirect } from 'next/navigation';
import { Button } from 'primereact/button';
import Link from 'next/link';
import { getSession, login } from '../../../lib';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

// TO DO
// - VER COMO MANEJAR LOS ERRORES (LIBRERIA ZOD, ECHAR UN VISTAZO)
// - OBTENER EL USUSARIO REAL
// - CAMBIAR 10 SEGUNDOS A UNA HORA Y REDIRECCIONES CORRECTAS (/register cuando no haya sesion y quitarla de la page principal)
// - CREAR EL HOOK DE AUTORIZACION
// - HACER UNA LÓGICA SIMILAR EN REGISTRO POR CONSISTENCIA (NO PRIORITARIO PORQUE ALLI FUNCIONA!!!!!!!!)


export default async function LoginPage() {
    const session = await getSession();

    if(session) redirect("/");

    return (
        <div className={'surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden p-input-filled'}>
            <div className="flex flex-column align-items-center justify-content-center">
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">¡Te damos la bienvenida!</div>
                        </div>

                        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                        <form action={
                            // Esta funcion se ejecutara cuando clickemos en el boton submit dentro del formulario
                            async (formData) => { // formData serán todos los inputs que tengan el atributo name
                                "use server"
                                // formData.username y formData.password porque son los names de sus inputs
                                await login(formData);
                            }
                        }>
                            {/* INPUT EMAIL */}
                            <div className="mb-5">
                                <label
                                    htmlFor={"username"}
                                    className="block text-900 text-xl font-medium mb-2"
                                >
                                    {"Usuario"}
                                </label>
                                <InputText
                                    id={"username"}
                                    name={"username"}
                                    placeholder={"Escribe tu usuario"}
                                    className={"w-full md:w-30rem p-3"}
                                />
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor={"username"}
                                    className="block text-900 text-xl font-medium mb-2"
                                >
                                    {"Contraseña"}
                                </label>
                                <Password
                                    inputId={"password"}
                                    name="password"
                                    placeholder={"Escribe tu contraseña"}
                                    inputClassName={"w-full md:w-30rem p-3"}
                                    feedback={false}
                                    toggleMask
                                />
                            </div>
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    ¿Has olvidado tu contraseña?
                                </a>
                            
                            {/* BOTON PARA ACCEDER */}
                            <Button label="Acceder a Wallaclone" className="w-full p-3 text-xl" type='submit'></Button>
                            <div className="flex justify-content-center mt-4">
                                <span className="font-extralight text-1xl text-black-500 mr-2">¿Aún no eres miembro?</span> 
                                <Link href="/register" className="text-1xl cursor-pointer">Regístrate</Link>        
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
