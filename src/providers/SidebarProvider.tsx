"use client"
import { createContext, useState } from "react"

type IsOpenContextType = {
  isOpen: { state: boolean };
  updateIsOpen: (state: boolean) => void;
}

export const SidebarContext = createContext<IsOpenContextType | undefined>(undefined)

function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState({state: false})
  
    const updateIsOpen = (state: boolean) => {
        setIsOpen(() => ({ state: !state }))
    }


    return (
    <SidebarContext.Provider value={{isOpen, updateIsOpen}}>{children}</SidebarContext.Provider>
  )
}
export default SidebarProvider