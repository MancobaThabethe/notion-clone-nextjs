"use client";
import { ClientSideSuspense } from "@liveblocks/react/suspense";
import { useEffect, useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom } from "@liveblocks/react/suspense";
import "@blocknote/core/fonts/inter.css";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

type EditorProps = {
	doc: Y.Doc;
	provider: any;
};

function Editor() {
	const room = useRoom();
	const [doc, setDoc] = useState<Y.Doc>();
	const [provider, setProvider] = useState<any>();
  const [darkMode, setDarkmode] = useState(false)
  console.log(room)

	// Set up Liveblocks Yjs provider

	useEffect(() => {
		const yDoc = new Y.Doc();
		const yProvider = new LiveblocksYjsProvider(room, yDoc);
		setDoc(yDoc);
		setProvider(yProvider);

		return () => {
			yDoc?.destroy();

			yProvider?.destroy();
		};
	}, [room]);

	if (!doc || !provider) {
		return null;
	}

	return (
		<BlockNote
			doc={doc}
			provider={provider}
		/>
	);
}

function BlockNote({ doc, provider }: EditorProps) {
	const editor: BlockNoteEditor = useCreateBlockNote({
		collaboration: {
			provider,

			// Where to store BlockNote data in the Y.Doc:\
			fragment: doc.getXmlFragment("document-store"),

			// Information for this user:
			user: {
				name: "My Username",
				color: "#ff0000",
			},
		},
	});

	return <BlockNoteView className="min-h-screen p-5 max-w-6xl mx-auto bg-slate-800" editor={editor} />;
}

function Page({params}: {params: {id: string}}) {
	const [darkMode, setDarkmode] = useState<boolean>(false);
  
  return (
		<main>
			<div className="flex justify-between max-w-6xl mx-auto mb-2">
        <h2 className="bg-red-600 text-white text-4xl">{params.id}</h2>
        {/* Dark Mode */}
          <Button onClick={() => setDarkmode(!darkMode)} className={`${darkMode ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700" : "text-gray-700 bg-gray-200 hover:bg-gray-400 hover:text-gray-700"}`}>{darkMode ? <SunIcon /> : <MoonIcon />}</Button>
      </div>
			<ClientSideSuspense fallback={<div>Loading...</div>}>
				<Editor />
			</ClientSideSuspense>
		</main>
	);
}
export default Page;
