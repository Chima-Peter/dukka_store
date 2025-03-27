interface ProfileInputTypes {
    type: string
    name: string
    value: string
    placeholder: string
    autoComplete: string
    collectInput: (event: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: ()=> void
}

const ProfileInput = (props: ProfileInputTypes) => {
    return (
        <input 
            type={props.type} 
            value={props.value}
            name={props.name} 
            placeholder={props.placeholder}
            onChange={props.collectInput}
            onBlur={props.onBlur}
            autoComplete=""
            className="w-[100%] py-3 px-5 bg-[#F9F9F9] rounded-lg placeholder:py-1 placeholder:px-3 placeholder:bg-white placeholder:text-[14px] placeholder:w-fit text-[16px] font-urbanist md:text-[18px] text-black border border-[#ADB1B1] outline-none focus:shadow-lg" />
    )
}

export default ProfileInput