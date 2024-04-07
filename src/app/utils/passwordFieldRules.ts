import { isStrongPassword } from "validator"

export const getPasswordRules = () => {
    
    return {
    required: "Contraseña requerida",
    minLength: {
        value: 8,
        message: "Mínimo 8 caracteres",
    },
    validate: (value: string) =>
        isStrongPassword(value, {
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        }) ||
        "La contraseña debe tener mayúscula, número, símbolos y minúscula",
}}