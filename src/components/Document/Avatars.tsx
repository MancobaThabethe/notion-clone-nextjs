"use clients"
import { useOthers, useSelf } from "@liveblocks/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function Avatars() {
    const others = useOthers()
    const self = useSelf()

    const all = [self, ...others]

    return (
    <div className="flex gap-2 items-center">
        <p className="text-xs md:text-sm text-gray-700">Users currently editing this page</p>
        <div className="flex -space-x-5">
            <TooltipProvider>
                {
                    all.map((user, i) => (
                        
                            <Tooltip key={'tooptip' + i}>
                                <TooltipTrigger asChild>
                                    <Avatar key={i} className="border-2 hover:z-50 w-7 h-7 md:w-10 md:h-10">
                                        <AvatarImage src={user?.info.avatar} />
                                        <AvatarFallback>{user?.info.email}</AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                <p>{self?.id === user?.id ? "You" : user?.info.email}</p>
                                </TooltipContent>
                            </Tooltip>
                            
                    ))
                }
            </TooltipProvider>
        </div>
    </div>
  )
}
export default Avatars