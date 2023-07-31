

const FormGroup = ({
    labelName,
    inputName,
    register,
    errorField,
    inputType,
    placeholder,
    required,
    isReadOnly = false,
    isDefaultValue = false,
    defaultValue,
    isRequirePattern = false,
    requirePattern,
    isTextArea = false,
}) => {
    return (
        <div className="mb-3">
            <label
                htmlFor={inputName}
                className="block mb-2 text-sm font-medium text-white"
            >
                {labelName}
            </label>
            {isReadOnly ? (
                isDefaultValue ? (
                    <input
                        {...register(
                            inputName,
                            !isRequirePattern
                                ? {
                                      required: `${required}`,
                                  }
                                : requirePattern
                        )}
                        type={inputType}
                        readOnly
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        className="input input-bordered input-success w-full text-gray-700"
                    />
                ) : (
                    <input
                        {...register(
                            inputName,
                            !isRequirePattern
                                ? {
                                      required: `${required}`,
                                  }
                                : requirePattern
                        )}
                        type={inputType}
                        readOnly
                        placeholder={placeholder}
                        className="block p-2.5 w-full text-sm text-primary bg-gray-50 rounded-lg border border-success focus:ring-green-500 focus:border-green-500 focus:outline focus:outline-offset-2 focus:outline-green-500"
                    />
                )
            ) : isDefaultValue ? (
                <input
                    {...register(
                        inputName,
                        !isRequirePattern
                            ? {
                                  required: `${required}`,
                              }
                            : requirePattern
                    )}
                    defaultValue={defaultValue}
                    type={inputType}
                    placeholder={placeholder}
                    className="block p-2.5 w-full text-sm text-primary bg-gray-50 rounded-lg border border-success focus:ring-green-500 focus:border-green-500 focus:outline focus:outline-offset-2 focus:outline-green-600"
                />
            ) : (
                <input
                    {...register(
                        inputName,
                        !isRequirePattern
                            ? {
                                  required: `${required}`,
                              }
                            : requirePattern
                    )}
                    type={inputType}
                    placeholder={placeholder}
                    className="block p-2.5 w-full text-sm text-primary bg-gray-50 rounded-lg border border-success focus:ring-green-300 <focus:border-green-53></focus:border-green-53>00 focus:outline focus:outline-offset-2 focus:outline-green-400"
                />
            )}
            {isTextArea && (
                <textarea
                    {...register(inputName, {
                        required: `${required}`,
                    })}
                    className="textarea textarea-success w-full text-primary"
                    placeholder={placeholder}
                ></textarea>
            )}
            {errorField && (
                <p className="text-red-600 sm:text-sm md:text-sm">{errorField?.message}</p>
            )}
        </div>
    );
};

export default FormGroup;
