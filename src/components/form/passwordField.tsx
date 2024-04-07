
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
    const {ref, ...rest} = register(fieldId, rules);

    return (
        <div className="mb-5">
            <label
                htmlFor={fieldId}
                className="block text-900 text-xl font-medium mb-2"
            >
                {label}
            </label>
            <Password
                inputRef={ref}
                inputId={fieldId}
                placeholder={placeholder}
                toggleMask={toggleMask}
                feedback={false}
                inputClassName={classNames("w-full", "md:w-30rem", "p-3", {
                    "p-invalid": !!errorMessage,
                })}
                {...rest}
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
