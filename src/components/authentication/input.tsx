interface InputTypes {
    type: string; // type of input field
    name: string; // name of input field used for collecting the state
    placeholder: string;
    value: string;
    errorMessage: string; // the error message
    error: boolean; // whether the input field has errors
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
    type,
    name,
    placeholder,
    value,
    errorMessage,
    error,
    onInputChange,
}: InputTypes) => {
    const isPassword = type === "password";

    return (
        <label className="relative">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onInputChange}
                placeholder={placeholder}
                className={`w-full rounded-md border px-6 py-2.5 text-[16px] leading-normal text-[#0D3833] placeholder:text-[16px] placeholder:font-light placeholder:text-gray-600 autofill:bg-clip-padding focus:outline focus:outline-gray-500 xl:text-[20px] 2xl:text-[24px] ${
                    isPassword
                        ? "font-sans tracking-[0.12em]"
                        : "font-urbanist"
                } ${error ? "border-red-500" : "border-[#ADB1B1]"}`}
            />
            <p className="text-[14px] font-light text-red-600 xl:text-[16px] 2xl:text-[18px]">
                {errorMessage}
            </p>
        </label>
    );
};

export default Input;