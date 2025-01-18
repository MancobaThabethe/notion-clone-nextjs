import { LiveblocksYjsProvider } from "@liveblocks/yjs"
import * as Y from 'yjs'
import { BlockNoteView } from "@blocknote/shadcn"
import { BlockNoteEditor } from "@blocknote/core"
import { useCreateBlockNote } from "@blocknote/react"
import "@blocknote/core/fonts/inter.css"
import "@blocknote/shadcn/style.css"
import { useSelf } from "@liveblocks/react/suspense"
import stringToColor from "@/lib/stringToColor"

function BlockNote({doc, provider, darkMode}: {doc: Y.Doc, provider: LiveblocksYjsProvider, darkMode: boolean}) {
  const userInfo = useSelf(me => me.info)

  const editor: BlockNoteEditor = useCreateBlockNote({
      collaboration: {
          provider,
          fragment: new Y.Doc().getXmlFragment("document-store"),
          user: {
              ...userInfo,
              color: stringToColor(userInfo?.email || '1')
          }
      }
  }) 
  
    return (
    <div className="relative max-w-6xl mx-auto">
        <BlockNoteView editor={editor} theme={darkMode ? "dark" : "light"} className="min-h-screen" />
    </div>
  )
}
export default BlockNote