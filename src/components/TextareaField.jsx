import React from 'react';

const TextareaField = React.forwardRef(({ label, name, placeholder, error, ...remain }, ref) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-500" htmlFor={name}>{label}</label>
            <textarea
                id={name}
                ref={ref}
                name={name}
                placeholder={placeholder}
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...remain}
            />
            {error && (
                <p className="font-semibold text-red-500 text-sm">
                    Lỗi: {error}
                </p>
            )}
        </div>
    )
})

export default TextareaField;