import { FaArrowLeft } from "react-icons/fa6"

const EditProfile = ({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>>}) => {
    return (
        <section className="w-[74%] h-fit flex flex-col pb-4 border border-[#ADB1B1] rounded-xl font-urbanist">
            <div className="flex gap-4 py-6 border-b border-[#ADB1B1] items-center w-[100%] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <button className="" onClick={() => setStep(0)}>
                    <FaArrowLeft className="w-[20px] h-[20px]" />
                </button>
                <h1 className="font-[500] min-lg:text-[20px] xl:text-[22px] 2xl:text-[24px] tracking-wide capitalize">
                    Edit profile
                </h1>
            </div>
        </section>
    )
}

export default EditProfile