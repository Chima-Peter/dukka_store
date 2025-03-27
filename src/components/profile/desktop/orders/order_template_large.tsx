"use client"


import { MdOutlineMoreVert } from "react-icons/md"
import { SingleOrderTemplateType } from "../../../../types/profile"
import addCommasToInt from "../../../../utils/add_commas_to_int"
import { useEffect, useState } from "react"
import OrderDetailsModal from "./order_details_modal_large"
import { format, parseISO } from "date-fns"


const OrderTemplate = ({ order, index, tracker }: SingleOrderTemplateType ) => {
  // state to open or close order modal
  const [orderModal, setOrderModal] = useState<boolean>(false)

  const formattedDate = format(parseISO(order.date), "yyyy-MM-dd");

  // method to open modal
  const openModal = () => (
    setOrderModal(true)
  )

  // block body scrolling when modal is open
      useEffect(() => {
          document.body.style.overflow = (orderModal) ? "hidden" : "auto"
      }, [orderModal])


  return (
    <ul className="w-[100%] bg-white even:bg-[#F6F6F6] border-b border-b-[#ADB1B1] flex items-center justify-between py-4" >
      <li className="text-[16px] xl:font-[18px] 2xl:font-[20px] text-[#101111] w-[7%] text-center font-[400]">
          { (index || 0) + (tracker || 0)}
      </li>
      <li className="text-[16px] xl:font-[18px] 2xl:font-[20px] text-[#101111] w-[15%]  font-[400]">
          {order.order_id}
      </li>
      <li className="text-[16px] xl:font-[18px] 2xl:font-[20px] text-[#101111] w-[15%]  font-[400]">
          {formattedDate}
      </li>
      <li className="text-[16px] xl:font-[18px] 2xl:font-[20px] text-[#101111] w-[7%]  font-[400]">
          {order.items}
      </li>
      <li className="text-[17px] xl:font-[19px] 2xl:font-[21px] text-[#101111] w-[20%] pl-4 font-[600]">
          &#8358;{addCommasToInt(order.amount)}
      </li>
      <li className={`text-[14px] xl:font-[16px] 2xl:font-[18px] text-[#101111] w-[15%]  font-[500] pl-3 p-1 capitalize rounded-md ${order.status === "delivered" && 'bg-[#C5FFB7]'} ${order.status === "enroute" && 'bg-[#FFFCB7] text-[#686403]'} ${order.status === "cancelled" && 'bg-[#FFD5B7] text-[#740606]'}`}>
          {order.status}
      </li>
      <button className="w-[10%] flex justify-center items-center" onClick={openModal}>
          <MdOutlineMoreVert className="w-7 h-7 cursor-pointer" />
      </button>
      {
        orderModal && <OrderDetailsModal orderId={order.order_id} setOrderModal={setOrderModal} />
      }
    </ul>
  )
}

export default OrderTemplate