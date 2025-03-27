import addCommasToInt from "../../../../utils/add_commas_to_int";

const OrderDetails_Order = () => {
    const detailHeader = [
        "Product", "Sku", "Qty", "Price", "Total"
    ]

    const detailData = [
        { Product: "Laptop", Sku: "LTP-1234", Qty: 2, Price: 800, Total: 1600 },
        { Product: "Smartphone", Sku: "SMP-5678", Qty: 1, Price: 500, Total: 500 },
        { Product: "Headphones", Sku: "HP-9012", Qty: 3, Price: 50, Total: 150 },
        { Product: "Keyboard", Sku: "KB-3456", Qty: 1, Price: 70, Total: 70 },
        { Product: "Monitor", Sku: "MN-7890", Qty: 200, Price: 200000, Total: 400000 },
        { Product: "Mouse", Sku: "MS-1122", Qty: 4, Price: 25, Total: 100 },
        { Product: "Tablet", Sku: "TBL-3344", Qty: 2, Price: 350, Total: 700 },
        { Product: "External Hard Drive", Sku: "EHD-5566", Qty: 1, Price: 120, Total: 120 },
        { Product: "Gaming Console", Sku: "GC-7788", Qty: 1, Price: 450, Total: 450 },
        { Product: "Smartwatch", Sku: "SW-9900", Qty: 3, Price: 150, Total: 450 },
        { Product: "Printer", Sku: "PR-2233", Qty: 1, Price: 200, Total: 200 },
        { Product: "Router", Sku: "RT-4455", Qty: 2, Price: 90, Total: 180 },
        { Product: "USB Flash Drive", Sku: "USB-6677", Qty: 5, Price: 15, Total: 75 },
        { Product: "Graphics Card", Sku: "GC-8899", Qty: 1, Price: 900, Total: 900 },
        { Product: "Webcam", Sku: "WC-1010", Qty: 2, Price: 60, Total: 120 }
    ];    
    


    return (
        <section className="pt-4 flex flex-col gap-6 w-[100%]">
            <ul className="w-[100%] flex justify-between items-center bg-[#F9F9F9] py-4 px-6">
                {
                    detailHeader.map((header, index: number) => (
                        <li className={`text-[16px] xl:text-[18px] 2xl:text-[20px] text-[#646767] tracking-wide ${index === 0 ? 'w-[25%]' : 'text-left w-[18%]'} font-[400] hover:text-black`} key={header}>
                            {header}
                        </li>
                    ))
                }
            </ul>
            <section className="flex flex-col w-[100%] border-t border-t-[#ADB1B1] overflow-y-auto h-[300px] scrollbar-hide">
                {
                    detailData.map((detail) => (
                        <ul className="w-[100%] bg-white even:bg-[#F6F6F6] border-b border-b-[#ADB1B1] flex justify-between py-4 px-6 items-center" key={detail.Product} >
                            <li className="text-[16px] xl:text-[18px] 2xl:text-[20px] text-[#101111] text-left font-[400] w-[25%]">
                                {detail.Product}
                            </li>
                            <li className="text-[16px] xl:text-[18px] 2xl:text-[20px] text-[#101111] text-left font-[400] w-[20%]">
                                {detail.Sku}
                            </li>
                            <li className="text-[16px] text-left xl:text-[18px] 2xl:text-[20px] text-[#101111] font-[400] w-[17%]">
                                {detail.Qty}
                            </li>
                            <li className="text-[16px] text-left xl:text-[18px] 2xl:text-[20px] text-[#101111] font-[400] w-[17%]">
                            &#8358;{addCommasToInt(detail.Price)}
                            </li>
                            <li className="text-[17px] text-left xl:text-[19px] 2xl:text-[21px] text-[#101111] font-[600] w-[17%]">
                                &#8358;{addCommasToInt(detail.Total)}
                            </li>
                        </ul>
                    ))
                }
            </section>
        </section>
    )
}

export default OrderDetails_Order