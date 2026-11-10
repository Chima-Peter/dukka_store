"use client";

import BackButton from "@/components/ui/back_button";

const MessagesSmall = () => {
    return (
        <main className="flex flex-col w-[100%] pt-[120px] gap-6 sm:pt-[130px] bg-[#F0F0F0] font-urbanist">
            <section className="w-[100%] h-fit flex flex-col gap-6 pb-4 pt-4 bg-white">
                <section className="bg-white px-4 sm:px-6 md:px-8 flex justify-between relative w-[100%] items-center">
                    <BackButton />
                    <h1 className="text-[20px] md:text-[22px] font-[500] self-center">
                        Messages
                    </h1>
                    <span />
                </section>
                <section className="px-4 sm:px-6 md:px-8 py-8">
                    <p className="text-sm text-gray-600">
                        No messages yet. Inbox will appear here when notifications are
                        available from Dukka.
                    </p>
                </section>
            </section>
        </main>
    );
};

export default MessagesSmall;
