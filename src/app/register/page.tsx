"use client";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { Button } from "primereact/button";
import { LayoutContext } from "../../layout/context/layoutcontext";
import { classNames } from "primereact/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormField } from "../../components/form/formField";
import Link from "next/link";
import { PasswordFieldsSet } from "@/components/passwordFieldSet/PasswordFieldSet";
import { MessagesContext } from "@/context/messagesContext";

type Inputs = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const SignUpPage = () => {
    const { layoutConfig } = useContext(LayoutContext);

    // Recogemos del contexto MessageContext, 
    // las estructuras (funciones) de mensajes que usaremos
    const { 
        showErrorMessage
    } = useContext(MessagesContext); 
    

    const router = useRouter();
    const containerClassName = classNames(
        'surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden',
        { 'p-input-filled': layoutConfig.inputStyle === 'filled' }
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch,
    } = useForm<Inputs>();

    const password = watch('password'); //para asegurarme que las passwords sean las mismas

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { username, email, password, confirmPassword } = data;

        try {
            const response = await fetch(
                'https://coderstrikeback.es/api/register',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                        confirmPassword,
                    }),
                }
            );
            if (response.ok) {
                return router.push('/');
            } else {
                const data = await response.json();
                // Así mostramos los mensajes de error al usuario
                showErrorMessage(data.message);
                console.log({ error: data.message });
            }
        } catch (err) {
            console.log({ err });
            // Así mostramos los mensajes de error al usuario
            showErrorMessage("Error inesperado intentando registrar");
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
                            <div className="text-700 text-3xl font-medium mb-3">
                                ¡Compra y vende cerca de ti!
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* INPUT USERNAME */}
                            <FormField
                                fieldId="username"
                                label="Usuario"
                                type="text"
                                placeholder="Nombre de usuario"
                                register={register}
                                errorMessage={errors.username?.message || ''}
                                rules={{
                                    required: 'Nombre de usuario requerido',
                                    minLength: {
                                        value: 3,
                                        message: 'Mínimo 3 caracteres',
                                    },
                                }}
                            />

                            {/* INPUT EMAIL */}
                            <FormField
                                fieldId="email"
                                label="Email"
                                type="email"
                                placeholder="Dirección de email"
                                register={register}
                                errorMessage={errors.email?.message || ''}
                                rules={{ required: 'Email requerido' }}
                            />

                            {/* PASSWORD */}
                            <PasswordFieldsSet watch={watch} register={register} errors={errors} />


                            {/* <PasswordField
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
                                    validate: (value) =>
                                        isStrongPassword(value, {
                                            minLowercase: 1,
                                            minUppercase: 1,
                                            minNumbers: 1,
                                            minSymbols: 1,
                                        }) ||
                                        'La contraseña debe tener mayúscula, número, símbolos y minúscula',
                                }}
                            />

                            {/* PASSWORD CONFIRMATION */}
                            {/* <PasswordField 
                                fieldId="confirmPassword"
                                label="Repite la contraseña"
                                placeholder="Repite la contraseña"
                                register={register}
                                errorMessage={
                                    errors.confirmPassword?.message || ''
                                }
                                toggleMask
                                rules={{
                                    required:
                                        'Confirmación de Password requerida',
                                    validate: (value) =>
                                        value === password ||
                                        'Passwords no coinciden',
                                }}
                            /> */}

                            {/* BOTON PARA REGISTRARSE */}
                            <Button
                                label="Regístrate en Wallaclone"
                                className="w-full p-3 text-xl"
                                type="submit"
                            ></Button>
                            <div className="flex justify-content-center mt-4">
                                <span className="font-extralight text-2xl text-black-500 mr-2">
                                    ¿Ya tienes una cuenta?
                                </span>
                                <Link
                                    href="/login"
                                    className="text-2xl cursor-pointer"
                                >
                                    Inicia sesión
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
