'use client'
import { PasswordField } from '@/components/form/passwordField';
import { PasswordFieldsSet } from '@/components/passwordFieldSet/PasswordFieldSet';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormWatch, useForm } from 'react-hook-form';
import { isStrongPassword } from 'validator';

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

const PasswordReset = ({params: { token } }: Props) => {

    const {
        register,
        formState: { errors },
        watch,
    } = useForm<Inputs>();



    const password = watch("password"); //para asegurarme que las passwords sean las mismas

    // EL TOKEN VIENE COMO PARAMETRO

    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch(`https://coderstrikeback.es/api/passwordreset/${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newPassword }),
        });

        if (response.ok) {
            setMessage('Tu contraseña ha sido restablecida. Ahora puedes iniciar sesión.');
            router.push('/login');
        } else {
            setMessage('Ha ocurrido un error. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* DEBEMOS USAR USEFORM */}
                <PasswordFieldsSet watch={watch} register={register} errors={errors} label={"Nueva contraseña"}/>

                {/* SI USAMOS USEFORM, DEBEMOS PONER USE CLIENT AL PRINCIPIO */}
                {/* TENEMOS QUE PONER OTRO CAMPO DE REPETIR CONTRASEÑA */}
                {/* COPIAR LA LOGICA DE LAS CONTRASEÑAS DEL REGISTRO PARA LOS ERRORES */}
                {/* <label htmlFor="newPassword">Nueva contraseña</label>
                <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                /> */}
                <button type="submit">Restablecer contraseña</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PasswordReset;
