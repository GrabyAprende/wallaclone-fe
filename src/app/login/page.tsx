/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Checkbox } from 'primereact/checkbox'; //primereact: libreria de react
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormField } from '../components/form/formField';
import Link from 'next/link';
import { PasswordField } from '../components/form/passwordField';
//import { Logo } from './atoms/Logo/logo';

//los tipos de los inputs del formulario
type Inputs = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const [checked, setChecked] = useState(false); //almacenamiento del estado checkbox
    const { layoutConfig } = useContext(LayoutContext); //accedemos al estado global de la app

    const router = useRouter(); // accedemos al obj router para la navegación
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
    //classNames: función que proporciona la librería de PrimeReact, genera CSS según argumentos

    // useForm nos ayuda a manejar los formularios
    const {
        register, // registra los imputs
        handleSubmit, // maneja los datos del formulario al hacer submit
        formState: { errors } // manejador de errores ej: errors.email.message tiene el mensaje de error
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log({ data })
    }

    return (
        <div className={containerClassName}>
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

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* INPUT EMAIL */}
                            <FormField
                                fieldId="email"
                                label="Email"
                                type="email"
                                placeholder='Dirección de email'
                                register={register}
                                errorMessage={errors.email?.message || ""}
                                rules={{ required: "Email requerido" }}
                            />
                        
                            {/* PASSWORD */}
                            <PasswordField
                                fieldId="password"
                                label="Contraseña"
                                placeholder='Contraseña'
                                register={register}
                                errorMessage={errors.password?.message || ""}
                                toggleMask
                                rules={{ required: "Contraseña requerida",
                                minLength: { value: 8, message: "Mínimo 8 caracteres"},
                            }}
                            />
                            {/* RECORDAR CONTRASEÑA */}
                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <div className="flex align-items-center">
                                    <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">Recordar</label>
                                </div>
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    ¿Has olvidado tu contraseña?
                                </a>
                            </div>
                            
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

export default LoginPage;
