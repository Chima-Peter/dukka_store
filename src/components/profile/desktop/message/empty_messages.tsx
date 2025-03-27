import React from "react"
import { IoMailOutline } from "react-icons/io5"

const EmptyMessageBox = ({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>>}) => {

    const backToProfile = () => {
        setStep(0)
    }


    return (
        <main className="flex flex-col gap-8 w-[100%] bg-[#F0F0F0] font-urbanist">
            <section className="w-[100%] self-center flex justify-center items-center bg-white h-[600px] xl:h-[700px] 2xl:h-[800px]">
                <div className="flex flex-col gap-4 py-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16 border border-gray-100 items-center w-[90%] sm:w-[400px] min-lg:w-[500px] shadow-lg xl:w-[600px]">
                    <IoMailOutline className="text-[#FEB100] w-16 h-16" />
                    <h2 className="text-lg min-lg:text-xl xl:text-2xl font-medium">
                        No result could be found for 
                    </h2>
                    <p className="text-[14px] min-lg:text-[16px] xl:text-[18px] 2xl:text-[20px] leading-relaxed tracking-wide font-[400] w-[100%] sm:w-[80%] text-center">
                        All the messages we sent to you will appear here, Stay tuned.
                    </p>
                    <p className="text-[14px] min-lg:text-[16px] xl:text-[18px] 2xl:text-[20px] leading-relaxed tracking-wide font-[400] w-[80%] text-center">
                        Or
                    </p>
                    <button onClick={backToProfile} className="text-[14px] xs:text-[16px] xl:text-[24px] 2xl:text-[36px] text-black bg-[#FEB100] rounded-md py-3  w-[150px] font-urbanist">
                        Go back
                    </button>
                </div>
            </section>
        </main>
    )
}

export default EmptyMessageBox