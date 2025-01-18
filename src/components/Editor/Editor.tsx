"use client"
import { useEffect, useState } from "react"
import * as Y from 'yjs'
import { LiveblocksYjsProvider } from '@liveblocks/yjs'
import { Button } from "../ui/button"
import { MoonIcon, SunIcon } from "lucide-react"
import { useRoom, useSelf } from "@liveblocks/react/suspense"
import { BlockNoteView } from "@blocknote/shadcn"
import stringToColor from "@/lib/stringToColor"
import { BlockNoteEditor } from "@blocknote/core"
import { useCreateBlockNote } from "@blocknote/react"
import "@blocknote/core/fonts/inter.css"
import "@blocknote/shadcn/style.css"

type EditorProps = {
    doc: Y.Doc
    provider: any
    darkMode: boolean
}

function Editor() {
  const room = useRoom()
  const [doc, setDoc] = useState<Y.Doc>()
  const [provider, setProvider] = useState<LiveblocksYjsProvider>()
  const [darkMode, setDarkmode] = useState(false)

  useEffect(() => {
    if(room){
      const ydoc = new Y.Doc()
      const yprovider = new LiveblocksYjsProvider(room, ydoc)
      setDoc(ydoc)
      setProvider(provider)
      console.log(doc, provider, room)

    //   Clean up functions if user leaves room
      return () => {
          ydoc?.destroy()
          yprovider?.destroy()
      }
    }
  }, [room])

  if(!doc || !provider) return null

  return (
    <div className="max-w-6xl mx-auto ">
        <div className="flex items-center gap-2 justify-end">
            {/* Translate Document AI */}
            {/* Chat to Document */}

            {/* Dark Mode */}
            <Button onClick={() => setDarkmode(!darkMode)} className={`${darkMode ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700" : "text-gray-700 bg-gray-200 hover:bg-gray-400 hover:text-gray-700"}`}>{darkMode ? <SunIcon /> : <MoonIcon />}</Button>
        </div>

        {/* BlockNote */}
        <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
    </div>
  )
}
export default Editor

function BlockNote({doc, provider, darkMode}: EditorProps) {
    const userInfo = useSelf(me => me.info)

    const editor: BlockNoteEditor = useCreateBlockNote({
      collaboration: {
          provider,
          fragment: doc.getXmlFragment("document-store"),
          user: {
              name: userInfo?.name,
              color: stringToColor(userInfo?.email)
          }
      }
    }) 
    
        return (
        <div className="relative max-w-6xl mx-auto">
            <BlockNoteView editor={editor} theme={darkMode ? "dark" : "light"} className="min-h-screen" />
        </div>
    )
}