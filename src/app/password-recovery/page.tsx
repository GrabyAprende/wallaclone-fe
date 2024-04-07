"use client"
import { FormField } from '@/components/form/formField';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
    email: string;
};

const PasswordResetRequest = () => {
    const [message, setMessage] = useState('');

    const { layoutConfig } = useContext(LayoutContext); //accedemos al estado global de la app
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    const {
        register, // registra los imputs
        handleSubmit, // maneja los datos del formulario al hacer submit
        formState: { errors } 
    } = useForm<Inputs>();


    const onSubmit: SubmitHandler<Inputs>= async (formData) => {
        const { email } = formData

        try {
            const response = await fetch('https://coderstrikeback.es/api/passwordresetrequest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });   
            
            if (response.ok) {
                setMessage('Te hemos enviado un correo para restablecer tu contraseña.');
            } else {
                setMessage('Ha ocurrido un error. Por favor, inténtalo de nuevo.');
            }
        } catch (err) {
            console.error('Error al realizar la solicitud:', err);
            setMessage('Ha ocurrido un error al procesar tu solicitud. Por favor, verifica tu conexión a internet e inténtalo de nuevo.');
        }
    };

    return (
        <>
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
                            <div className="text-900 text-3xl font-medium mb-3">Restablece tu contraseña</div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* INPUT EMAIL */}
                            <FormField
                                fieldId="email"
                                label="Email"
                                type="email"
                                placeholder='Escribe tu email'
                                register={register}
                                errorMessage={errors.email?.message || ""}
                                rules={{ required: "Email requerido" }}
                            />
                            {message && <p>{message}</p>}
                            
                            {/* BOTON PARA ACCEDER */}
                            <Button label="Solicitar restablecimiento" className="w-full p-3 text-xl" type='submit'></Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default PasswordResetRequest;
