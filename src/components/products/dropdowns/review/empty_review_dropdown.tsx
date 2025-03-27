import { FaStar } from "react-icons/fa6"

const EmptyReviewDropdown = () => {
    return (
        <div className="w-[100%] bg-white flex flex-col gap-4 py-5 px-4 justify-between rounded-md drop-shadow-md absolute top-[50px] z-20 left-0 font-urbanist">
            <div className="w-[100%] flex items-center justify-between">
                <h5 className="font-semibold tracking-wide">
                    Reviews (0)
                </h5>
                <button className="w-fit h-hit px-5 py-2 text-white rounded-md bg-[#FEB100] font-[400] text-[16px] xl:text-[18px]">
                    Write a review
                </button>
            </div>
            <div className="flex flex-col gap-2 w-[100%] rounded-lg p-4 border border-[#ADB1B1]">
                <div className="w-[100%] flex justify-between items-center">
                    <div className="flex gap-0">
                        {Array.from({ length: 5 }, (_, index) => (
                            <FaStar key={index} className="text-[#888B8B] w-[16px] h-[16px]" />
                        ))}
                    </div>
                    <p className="font-[500] font-NotoSans text-[20px]">
                        -------------------------
                    </p>
                </div>
                <p className="text-[16px] xl:text-[18px] font-semibold tracking-wider text-left">
                    No reviews yet. Be the first to write a review.
                </p>
            </div>
        </div>        
    )
}

export default EmptyReviewDropdown