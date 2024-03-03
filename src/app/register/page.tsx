"use client";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { Button } from "primereact/button";
//import { Password } from "primereact/password";
import { LayoutContext } from "../../layout/context/layoutcontext";
//import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { FormField } from "../components/form/formField";
import isStrongPassword from "validator/lib/isStrongPassword";


type Inputs = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const SignUpPage = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const router = useRouter();
    const containerClassName = classNames(
        "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
        { "p-input-filled": layoutConfig.inputStyle === "filled" }
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch,
    } = useForm<Inputs>();

    const password = watch("password"); //para asegurarme que las passwords sean las mismas

    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log({ data });
    };

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <div
                    style={{
                        borderRadius: "56px",
                        padding: "0.3rem",
                        background:
                            "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
                    }}
                >
                    <div
                        className="w-full surface-card py-8 px-5 sm:px-8"
                        style={{ borderRadius: "53px" }}
                    >
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">
                                ¡Te damos la bienvenida!
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
                                errorMessage={errors.username?.message || ""}
                                rules={{
                                    required: "Nombre de usuario requerido",
                                    minLength: {
                                        value: 3,
                                        message: "Mínimo 3 caracteres",
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
                                errorMessage={errors.email?.message || ""}
                                rules={{ required: "Email requerido" }}
                            />

                            {/* PASSWORD */}
                            <FormField
                                fieldId="password"
                                label="Contraseña"
                                type="password"
                                placeholder="Contraseña"
                                register={register}
                                errorMessage={errors.password?.message || ""}
                                rules={{
                                    required: "Contraseña requerida",
                                    minLength: {
                                        value: 8,
                                        message: "Mínimo 8 caracteres",
                                    },
                                    validate: value => isStrongPassword(value, {minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}) || "La contraseña debe tener mayúscula, número, símbolos y minúscula"
                                }}
                            />

                            {/* PASSWORD CONFIRMATION */}
                            <FormField
                                fieldId="confirmPassword"
                                label="Repite la contraseña"
                                type="password"
                                placeholder="Repite la contraseña"
                                register={register}
                                errorMessage={
                                    errors.confirmPassword?.message || ""
                                }
                                rules={{
                                    required:
                                        "Confirmación de Password requerida",
                                    validate: value =>
                                        value === password ||
                                        "Passwords no coinciden",
                                }}
                            />

                            {/* BOTON PARA REGISTRARSE */}
                            <Button
                                label="Registrate en Wallaclone"
                                className="w-full p-3 text-xl"
                                type="submit"
                            ></Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
