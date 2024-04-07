import { isStrongPassword } from "validator"
import { PasswordField } from "../form/passwordField"
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { register } from "module";

interface Props {
    watch: UseFormWatch<any>;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
    label?: string;
}


export const PasswordFieldsSet = ({watch, register, errors, label = "Contraseña"}: Props) => {
    const password = watch("password"); //para asegurarme que las passwords sean las mismas

    return (
        <>
        {/* PASSWORD */}
        <PasswordField
            fieldId="password"
            label={label}
            placeholder="Contraseña"
            register={register}
            errorMessage={errors.password?.message as string || ""}
            toggleMask
            rules={{
                required: "Contraseña requerida",
                minLength: {
                    value: 8,
                    message: "Mínimo 8 caracteres",
                },
                    validate: value =>
                    isStrongPassword(value, {
                            minLowercase: 1,
                            minUppercase: 1,
                            minNumbers: 1,
                            minSymbols: 1,
                    }) || "La contraseña debe tener mayúscula, número, símbolos y minúscula",
            }}
        />

        {/* PASSWORD CONFIRMATION */}
        <PasswordField
            fieldId="confirmPassword"
            label="Repite la contraseña"
            placeholder="Repite la contraseña"
            register={register}
            errorMessage={
                errors.confirmPassword?.message as string || ""
            }
            toggleMask
            rules={{
            required:
                "Confirmación de Password requerida",
                validate: value =>
                    value === password || "Passwords no coinciden",
            }}
        />
        </>
    )
}