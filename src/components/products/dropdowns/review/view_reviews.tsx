import { IoIosStar } from "react-icons/io"
import { MdOutlineCancel } from "react-icons/md"

interface ViewReviewsTypes {
    setWriteReview: React.Dispatch<React.SetStateAction<boolean>>
    setViewReview: React.Dispatch<React.SetStateAction<boolean>>
}


const ViewReviews = ({ setWriteReview, setViewReview }: ViewReviewsTypes ) => {
    //  method to open write review modal
    const openWriteReviewModal = () => {
        setWriteReview(true)
        closeViewReviewModal()
    }

    //  method to close view review modal
    const closeViewReviewModal = () => {
        setViewReview(false)
    }

    const reviewList = [
        {
            text: "It is super dry and crunchy. It slaps beyond recognition.",
            star: 5,
            author: "Habeeb March 27, 2024."
        },
        {
            text: "Absolutely delicious! The texture is perfect, and the flavor is rich.",
            star: 5,
            author: "Aisha April 5, 2024."
        },
        {
            text: "Pretty good, but I wish it had a little more seasoning. Still worth it!",
            star: 4,
            author: "David April 10, 2024."
        },
        {
            text: "Not bad at all! It has a nice crunch, but it could be a bit fresher.",
            star: 3,
            author: "Chinedu April 15, 2024."
        },
        {
            text: "Amazing quality! I love how crispy it is. Definitely buying again.",
            star: 5,
            author: "Fatima April 20, 2024."
        },
        {
            text: "The taste is good, but it's slightly too hard for my liking.",
            star: 3,
            author: "James April 25, 2024."
        },
        {
            text: "Perfectly made! The balance of flavor and crunch is spot on.",
            star: 5,
            author: "Sophia May 1, 2024."
        },
        {
            text: "It was okay, but I expected it to be a bit more flavorful.",
            star: 3,
            author: "Emeka May 5, 2024."
        },
        {
            text: "One of the best I've had in a while! Worth every penny.",
            star: 5,
            author: "Zainab May 10, 2024."
        },
        {
            text: "Decent, but not my favorite. Might give it another try though.",
            star: 4,
            author: "Joshua May 15, 2024."
        }
    ];
    


    return (
        <section className="min-h-[100vh] backdrop-brightness-50 w-[100%] z-40 fixed backdrop-blur-sm left-0 top-0 flex items-center justify-center">
            <div className="w-[90%] sm:w-[500px] md:w-[600px] min-lg:w-[700px] h-[500px] px-2 text-black z-50 flex flex-col gap-6 rounded-md drop-shadow-md bg-white">
                <div className="w-[100%] flex justify-between sticky top-0 py-3 pt-4 px-8 border-b border-b-[#ADB1B1]">
                    <h4 className="font-[500] text-[18px] xl:text-[20px] tracking-wide">
                        Reviews ({reviewList.length})
                    </h4>
                    <button className="w-fit hidden h-hit px-5 py-2 text-white rounded-md bg-[#FEB100] font-[400] text-[16px] xl:text-[18px]" onClick={openWriteReviewModal}>
                        Write a review
                    </button>
                    <button onClick={closeViewReviewModal}>
                        <MdOutlineCancel className="w-[30px] h-[30px] text-[#75716F]" />
                    </button>
                </div>
                <ul className="flex flex-col gap-3 px-2 pb-8 overflow-y-auto customScroll">
                    {
                        reviewList.map((review) => (
                            <li className="flex flex-col gap-4 w-[100%] rounded-lg items-center py-4 px-8 border border-[#ADB1B1]" key={review.text}>
                                <div className="w-[100%] flex justify-between items-center">
                                    <div className="flex gap-0">
                                        {Array.from({ length: review.star }, (_, index) => (
                                            <IoIosStar key={index} className="text-[#FFA500] w-[26px] h-[26px]" />
                                        ))}
                                    </div>
                                    <p className="text-[16px] xl:text-[18px] font-semibold text-[#888B8B] tracking-wide">
                                        {review.author}
                                    </p>
                                </div>
                                <p className="text-[16px] xl:text-[18px] font-semibold tracking-wider text-left">
                                    {review.text}
                                </p>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}

export default ViewReviews