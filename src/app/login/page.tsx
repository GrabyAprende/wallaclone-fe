/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { LayoutContext } from '../../layout/context/layoutcontext';
import { classNames } from 'primereact/utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormField } from '../../components/form/formField';
import Link from 'next/link';
import { PasswordField } from '../../components/form/passwordField';
import { SessionContext } from '@/context/sessionContext';
import { MessagesContext } from '@/context/messagesContext';

//los tipos de los inputs del formulario
type Inputs = {
    username: string;
    password: string;
};

const LoginPage = () => {
    const { handleNewToken } = useContext(SessionContext);
    const router = useRouter(); // accedemos al obj router para la navegación

    const { layoutConfig } = useContext(LayoutContext); //accedemos al estado global de la app
    // Recogemos del contexto MessageContext,
    // las estructuras (funciones) de mensajes que usaremos
    const { showSuccessMessage, showInfoMessage, showErrorMessage } =
        useContext(MessagesContext);

    const containerClassName = classNames(
        'surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden',
        { 'p-input-filled': layoutConfig.inputStyle === 'filled' }
    );

    const {
        register, // registra los imputs
        handleSubmit, // maneja los datos del formulario al hacer submit
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (formData) => {
        const { username, password } = formData;

        try {
            const loginResponse = await fetch(
                'https://coderstrikeback.es/api/login',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                }
            );

            if (loginResponse.ok) {
                const { token } = await loginResponse.json(); //desestructuramos el token

                handleNewToken(token);
                // Así mostramos los mensajes de exito al usuario
                showSuccessMessage('Login success');

                return router.push('/');
            } else {
                const errorLoginData = await loginResponse.json();
                // Así mostramos los mensajes de error al usuario
                showErrorMessage(errorLoginData.error);
            }
        } catch (err) {
            // Así mostramos los mensajes de error al usuario
            showErrorMessage('Hubo un error al intentar recuperar el usuario');
        }
    };

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background:
                            'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)',
                    }}
                >
                    <div
                        className="w-full surface-card py-8 px-5 sm:px-8"
                        style={{ borderRadius: '53px' }}
                    >
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">
                                ¡Te damos la bienvenida!
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* INPUT EMAIL */}
                            <FormField
                                fieldId="username"
                                label="Usuario"
                                type="text"
                                placeholder="Tu nombre de usuario"
                                register={register}
                                errorMessage={errors.username?.message || ''}
                                rules={{
                                    required: 'Nombre de usuario requerido',
                                }}
                            />

                            {/* PASSWORD */}
                            <PasswordField
                                fieldId="password"
                                label="Contraseña"
                                placeholder="Contraseña"
                                register={register}
                                errorMessage={errors.password?.message || ''}
                                toggleMask
                                rules={{
                                    required: 'Contraseña requerida',
                                    minLength: {
                                        value: 8,
                                        message: 'Mínimo 8 caracteres',
                                    },
                                }}
                            />
                            {/* RECORDAR CONTRASEÑA */}
                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                {/* <div className="flex align-items-center">
                                    <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">Recordar</label>
                                </div> */}
                                <Link
                                    href="/password-recovery"
                                    passHref
                                    className="font-medium no-underline ml-2 text-right cursor-pointer"
                                    style={{ color: 'var(--primary-color)' }}
                                >
                                    ¿Has olvidado tu contraseña?
                                </Link>
                            </div>

                            {/* BOTON PARA ACCEDER */}
                            <Button
                                label="Acceder a Wallaclone"
                                className="w-full p-3 text-xl"
                                type="submit"
                            ></Button>
                            <div className="flex justify-content-center mt-4">
                                <span className="font-extralight text-1xl text-black-500 mr-2">
                                    ¿Aún no eres miembro?
                                </span>
                                <Link
                                    href="/register"
                                    className="text-1xl cursor-pointer"
                                >
                                    Regístrate
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
