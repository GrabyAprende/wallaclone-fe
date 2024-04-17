import { MessagesContext } from "@/context/messagesContext";
import { SessionContext } from "@/context/sessionContext";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormField } from "../form/formField";
import { Dialog } from "primereact/dialog";


type Inputs = {
    username: string;
};

const DeleteAccount = ({ username }: { username: string }) => {
    const router = useRouter();
    const { showErrorMessage } = useContext(MessagesContext);
    const { token, logout } = useContext(SessionContext)

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const [visible, setVisible] = useState<boolean>(false);

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">Borrar cuenta</span>
        </div>
    );

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { username } = data;

        try {
            const response = await fetch('https://coderstrikeback.es/api/deleteuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ username }),
            });
            if (response.ok) {
                logout();
                router.push('/login');
            } else {
                const data = await response.json();
                // Así mostramos los mensajes de error al usuario
                showErrorMessage(data.message);
                console.error({ error: data.message });
                
            }

        } catch (err) {
            console.log({ err });
            showErrorMessage('Error al eliminar usuario');
        } finally {
            setVisible(false)
        }
    };
    return (
        <div>
            <div className="card flex justify-content-center">
                <Button label="Borrar cuenta" className="p-button-danger w-full" onClick={() => setVisible(true)} />
                <Dialog visible={visible} modal header={headerElement} style={{ width: '50rem' }} onHide={() => setVisible(false)}>
                    <p className="m-0">Para borrar tu cuenta debes agregar tu nombre de usuario
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* INPUT USERNAME */}
                        <FormField
                            fieldId="username"
                            label=""
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
                        <Button
                            label="Eliminar usuario"
                            className="w-full p-3 text-xl p-button-danger"
                            type="submit">
                        </Button>
                    </form>
                </Dialog>
            </div>
        </div>
    );
};

export default DeleteAccount;

