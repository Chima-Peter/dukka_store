"use client"


import { useContext } from "react";
import { NavigationContext } from "@/context/navigation_context";


const useNavigationContext = () => {
    const context = useContext(NavigationContext)

    if (!context) {
        throw new Error("Navigation context must be used within a NavigationProvider")
    }

    return context
}


export default useNavigationContext