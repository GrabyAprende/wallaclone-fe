'use client'
import { PasswordFieldsSet } from '@/components/passwordFieldSet/PasswordFieldSet';
import { MessagesContext } from '@/context/messagesContext';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { useContext, useState } from 'react';
import { FieldErrors, SubmitHandler, UseFormRegister, UseFormWatch, useForm } from 'react-hook-form';

interface Props {
    params: {
        token: string;
        watch: UseFormWatch<any>;
        register: UseFormRegister<any>;
        errors: FieldErrors<any>;
        label: string;
    };
}

type Inputs = {
    password: string;
    confirmPassword: string;
};

const PasswordReset = ({ params: { token } }: Props) => {
    const {
        register,
        formState: { errors },
        watch,
        handleSubmit,
    } = useForm<Inputs>();

    const { showSuccessMessage, showErrorMessage } = useContext(MessagesContext);
    const { layoutConfig } = useContext(LayoutContext); //accedemos al estado global de la app

    const router = useRouter();

    const containerClassName = classNames(
        'surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden',
        { 'p-input-filled': layoutConfig.inputStyle === 'filled' }
    );

    const onSubmit: SubmitHandler<Inputs> = async (formData) => {

        const { password } = formData;

        try {
            const response = await fetch(`https://coderstrikeback.es/api/passwordreset/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword: password }),
            });

            if (response.ok) {
                showSuccessMessage("Contraseña actualizada");
                router.push('/login');
            } else {
                const errorData = await response.json();
                showErrorMessage(`Hubo un error intentando actualizar contraseña: ${errorData.error}`);
                console.log({ error: errorData.error });
            }
        } catch (err) {
            showErrorMessage("Algo inesperado ocurrió al intentar actualizar contraseña")
            console.log({ err })
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
                                Restablezca su contraseña
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <PasswordFieldsSet watch={watch} register={register} errors={errors} label={"Nueva contraseña"} />
                            <Button
                                label="Restablecer contraseña"
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

export default PasswordReset;
