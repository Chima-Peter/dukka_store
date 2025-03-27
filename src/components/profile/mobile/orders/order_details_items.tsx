import addCommasToInt from "../../../../utils/add_commas_to_int";
import Image from "next/image";



const OrderDetailsItems = () => {
    const orderItemsList = [
        {
            sku: "SKU12345",
            qty: 2,
            item_price: 5000.99,
            total_price: 10001.98,
            product_name: "Wireless Mouse",
            product_size: "Medium"
        },
        {
            sku: "SKU12346",
            qty: 1,
            item_price: 25000.50,
            total_price: 25000.50,
            product_name: "Mechanical Keyboard",
            product_size: "Standard"
        },
        {
            sku: "SKU12347",
            qty: 3,
            item_price: 1200.00,
            total_price: 3600.00,
            product_name: "USB-C Cable",
            product_size: "1m"
        },
        {
            sku: "SKU12348",
            qty: 1,
            item_price: 150000.00,
            total_price: 150000.00,
            product_name: "Gaming Monitor",
            product_size: "27-inch"
        },
        {
            sku: "SKU12349",
            qty: 4,
            item_price: 500.75,
            total_price: 2003.00,
            product_name: "Notebook",
            product_size: "A5"
        },
        {
            sku: "SKU12350",
            qty: 2,
            item_price: 7500.99,
            total_price: 15001.98,
            product_name: "Bluetooth Speaker",
            product_size: "Compact"
        },
        {
            sku: "SKU12351",
            qty: 1,
            item_price: 185000.00,
            total_price: 185000.00,
            product_name: "Laptop",
            product_size: "15-inch"
        },
        {
            sku: "SKU12352",
            qty: 3,
            item_price: 350.00,
            total_price: 1050.00,
            product_name: "Ballpoint Pens",
            product_size: "Pack of 3"
        },
        {
            sku: "SKU12353",
            qty: 2,
            item_price: 1800.49,
            total_price: 3600.98,
            product_name: "Wireless Charger",
            product_size: "Fast Charge"
        },
        {
            sku: "SKU12354",
            qty: 5,
            item_price: 125.00,
            total_price: 625.00,
            product_name: "Phone Case",
            product_size: "iPhone 13"
        },
        {
            sku: "SKU12355",
            qty: 1,
            item_price: 45000.00,
            total_price: 45000.00,
            product_name: "Smartwatch",
            product_size: "42mm"
        },
        {
            sku: "SKU12356",
            qty: 3,
            item_price: 8999.99,
            total_price: 26999.97,
            product_name: "Wireless Earbuds",
            product_size: "Black"
        },
        {
            sku: "SKU12357",
            qty: 2,
            item_price: 5200.99,
            total_price: 10401.98,
            product_name: "Power Bank",
            product_size: "10,000mAh"
        },
        {
            sku: "SKU12358",
            qty: 1,
            item_price: 32000.75,
            total_price: 32000.75,
            product_name: "Graphics Tablet",
            product_size: "Medium"
        },
        {
            sku: "SKU12359",
            qty: 4,
            item_price: 1500.00,
            total_price: 6000.00,
            product_name: "Screen Protector",
            product_size: "Tempered Glass"
        },
        {
            sku: "SKU12360",
            qty: 2,
            item_price: 11000.99,
            total_price: 22001.98,
            product_name: "External Hard Drive",
            product_size: "1TB"
        },
        {
            sku: "SKU12361",
            qty: 1,
            item_price: 8700.00,
            total_price: 8700.00,
            product_name: "Portable SSD",
            product_size: "512GB"
        },
        {
            sku: "SKU12362",
            qty: 5,
            item_price: 650.49,
            total_price: 3252.45,
            product_name: "Mouse Pad",
            product_size: "Large"
        },
        {
            sku: "SKU12363",
            qty: 3,
            item_price: 2100.00,
            total_price: 6300.00,
            product_name: "LED Desk Lamp",
            product_size: "Adjustable"
        },
        {
            sku: "SKU12364",
            qty: 1,
            item_price: 320000.00,
            total_price: 320000.00,
            product_name: "Gaming Laptop",
            product_size: "17-inch"
        }
    ];
    
    return (
        <section className="w-[100%] flex flex-col">
            {
                orderItemsList.map((item) => (
                    <div className="flex gap-4 xs:gap-3 md:gap-6 border-t border-t-[#ADB1B1] w-[100%] p-4 xs:p-2 sm:p-4 md:p-6" key={item.sku}>
                        <Image width={50} height={50} src="/images/profile/garri.png" alt="Product name" />
                        <div className="flex max-xs:flex-col xs:gap-2 justify-between w-[100%]">
                            <div className="flex flex-col w-fit">
                                <div className="flex gap-1">
                                    <p className="text-[14px] md:text-[18px] font-[300] tracking-wide">
                                        SKU: {item.sku}
                                    </p>
                                    <p className="text-[14px] md:text-[18px] font-[300] tracking-wide">
                                        QTY: {item.qty}
                                    </p>
                                </div>
                                <h2 className="text-[16px] md:text-[20px] font-[600] tracking-wide">
                                    {item.product_name}
                                </h2>
                            </div>
                            <div className="flex max-xs:gap-2 xs:flex-col w-fit">
                                <p className="text-[14px] md:text-[18px] font-[300] tracking-wide">
                                    Item price:
                                </p>
                                <h2 className="text-[16px] md:text-[20px] font-[600]">
                                    &#8358;{addCommasToInt(item.item_price)}
                                </h2>
                            </div>
                            <div className="flex max-xs:gap-2 xs:flex-col w-fit">
                                <p className="text-[14px] md:text-[18px] font-[300] tracking-wide">
                                    Total price:
                                </p>
                                <h2 className="text-[16px] md:text-[20px] font-[600]">
                                    &#8358;{addCommasToInt(item.total_price)}
                                </h2>
                            </div>
                        </div>
                        </div>
                ))
            }
        </section>
    )
}

export default OrderDetailsItems