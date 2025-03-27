const OrderDetailsCustomer = () => {
    const customerBillingFields = [
        "Street Address", "City", "State", "Zip Code", "Mobile Number", "Email"
    ];
    const customerBillingInfo = [
        "32, Gidaado street, Alausa", "Ikeja", "Lagos", "01", "+234 8012 3456 789", "samplemail@sample.com"
    ];

    const customerShippingFields = [
        "Street Address", "City", "State", "Zip Code", "Mobile Number", "Email", "Shipping Method", "Expected Delivery Date"
    ];
    const customerShippingInfo = [
        "32, Gidaado street, Alausa", "Ikeja", "Lagos", "01", "+234 8012 3456 789", "samplemail@sample.com", "Air Cargo", "In View"
    ];

    

    return (
        <section className="flex flex-col gap-6 pb-6 w-full font-urbanist">
            {/* Billing Address */}
            <section className="flex flex-col gap-6 w-full">
                <h3 className="font-medium text-lg xl:text-xl tracking-wide py-3 px-6 bg-[#F9F9F9] border-b border-[#ADB1B1]">
                    Billing Address
                </h3>
                <div className="w-full px-6">
                    <div className="flex flex-col gap-4">
                        {customerBillingFields.map((field, index) => (
                            <div key={field} className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 w-full">
                                <span className="font-[500] text-sm sm:text-[16px] xs:text-base sm:text-lg xl:text-xl text-[#75716F]">
                                    {field}
                                </span>
                                <span className="font-[500] text-sm sm:text-[16px] xs:text-base sm:text-lg xl:text-xl text-[#101111] sm:w-[60%]">
                                    {customerBillingInfo[index]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Shipping Address */}
            <section className="flex flex-col gap-6 w-full">
                <h3 className="font-medium text-lg xl:text-xl tracking-wide py-3 px-6 bg-[#F9F9F9] border-b border-[#ADB1B1]">
                    Shipping Address
                </h3>
                <div className="w-full px-6">
                    <div className="flex flex-col gap-4">
                        {customerShippingFields.map((field, index) => (
                            <div key={field} className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 w-full">
                                <span className="font-[500] text-[14px] sm:text-[16px] xs:text-base sm:text-lg xl:text-xl text-[#75716F]">
                                    {field}
                                </span>
                                <span className="font-[500] text-sm sm:text-[16px] xs:text-base sm:text-lg xl:text-xl text-[#101111] sm:w-[60%]">
                                    {customerShippingInfo[index]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </section>
    );
};

export default OrderDetailsCustomer;
