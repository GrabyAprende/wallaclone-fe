
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { FC } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props {
    fieldId: string;
    label: string;
    placeholder: string;
    register: UseFormRegister<any>;
    errorMessage: string;
    rules?: RegisterOptions<any, any> | undefined;
    toggleMask?: boolean;
}

export const PasswordField: FC<Props> = ({
    fieldId,
    label,
    placeholder,
    register,
    errorMessage,
    rules,
    toggleMask = false
}) => {
    return (
        <div className="mb-5">
            <label
                htmlFor={fieldId}
                className="block text-900 text-xl font-medium mb-2"
            >
                {label}
            </label>
            <Password
                id={fieldId}
                placeholder={placeholder}
                toggleMask={toggleMask}
                feedback={false}
                inputClassName={classNames("w-full", "md:w-30rem", "p-3", {
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

{/* <Password inputId="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password> */}
