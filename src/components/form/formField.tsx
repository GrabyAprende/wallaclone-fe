import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { FC } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props {
    fieldId: string;
    label: string;
    type: "text" | "password" | "email" | "number";
    placeholder: string;
    register: UseFormRegister<any>;
    errorMessage: string;
    rules?: RegisterOptions<any, any> | undefined;
}

export const FormField: FC<Props> = ({
    fieldId,
    label,
    type,
    placeholder,
    register,
    errorMessage,
    rules,
}) => {
    return (
        <div className="mb-5">
            <label
                htmlFor={fieldId}
                className="block text-900 text-xl font-medium mb-2"
            >
                {label}
            </label>
            <InputText
                id={fieldId}
                type={type}
                placeholder={placeholder}
                className={classNames("w-full", "p-3", {
                    "p-invalid": !!errorMessage,
                })}
                {...register(fieldId, rules)}
            />
            {!!errorMessage && (
                <div>
                    {" "}
                    <small className="p-error">{errorMessage}</small>
                </div>
            )}
        </div>
    );
};
