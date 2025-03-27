
interface InputTypes {
    type: string, // type of input field
    name: string, // name of input field used for collecting the state
    placeholder: string,
    value: string,
    errorMessage: string, // the error message
    error: boolean, // whether the input field has errors
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}


const Input = ({ type, name, placeholder, value, errorMessage, error, onInputChange }: InputTypes) => {
  return (
    <label className=" relative">
      <input 
        type={type} // change the type based on the icon being shown
        name={name} 
        value={value} 
        onChange={onInputChange}
        placeholder={placeholder}
        className={`text-[16px] xl:text-[20px] 2xl:text-[24px] placeholder:text-gray-600 font-urbanist placeholder:text-[16px] leading-relaxed placeholder:font-light autofill:bg-clip-padding text-[#0D3833] w-[100%] px-6 py-2 border  rounded-md focus:outline-gray-500 focus:outline ${error ? 'border-red-500' : 'border-[#ADB1B1]'}`}
      />
      <p className="text-[14px] xl:text-[16px] 2xl:text-[18px] text-red-600 font-light">
        {errorMessage}
      </p>
    </label>
  );
};



export default Input