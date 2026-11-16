import { useState } from "react";

// хранит значения и ошибки формы и запускает проверку перед отправкой
export default function useForm<T extends Record<string, string>>(
    initialValues: T,
    validate: (values: T) => Partial<Record<keyof T, string>>
) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

    function handleChange(field: keyof T, value: string) {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    function handleSubmit(onValid: (validValues: T) => void) {
        const nextErrors = validate(values);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length === 0) {
            onValid(values);
        }
    }

    function resetForm() {
        setValues(initialValues);
        setErrors({});
    }

    return { values, errors, handleChange, handleSubmit, resetForm };
}
