"use client"
import * as Y from 'yjs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { FormEvent, useState, useTransition } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Language } from '../../../types/types' 
import { BotIcon, LanguagesIcon } from 'lucide-react'
import Markdown from 'react-markdown'
import { toast } from 'sonner'

const languages: Language[] = ["afrikaans", "amharic", "arabic", "armenian", "azerbaijani", "bengali", "bosnian", "bulgarian", "catalan", "cebuano", "chinese", "chinese simplified", "chinese traditional", "croatian", "czech", "danish", "dutch", "english", "estonian", "finnish", "french", "galician", "georgian", "german", "greek", "gujarati", "haitian creole", "hausa", "hebrew", "hindi", "hungarian", "icelandic", "igbo", "indonesian", "irish", "italian", "japanese", "javanese", "kannada", "kazakh", "khmer", "korean", "kurdish", "kyrgyz", "lao", "latin", "latvian", "lithuanian", "luxembourgish", "macedonian", "malagasy", "malay", "malayalam", "maltese", "maori", "mongolian", "nepali", "norwegian", "pashto", "persian", "polish", "portuguese", "punjabi", "romanian", "russian", "serbian", "sindhi", "sinhala", "slovak", "slovenian", "somali", "spanish", "swahili", "swedish", "tajik", "tamil", "telugu", "thai", "turkish", "ukrainian", "urdu", "uzbek", "vietnamese", "welsh", "xhosa", "yoruba", "zulu"];

function TranslateDocument({document}: {document: Y.Doc}) {
  const [isOpen, setIsOpen] = useState(false)
  const [language, setLanguage] = useState<Language | string>('')
  const [summary, setSummary] = useState('')
  const [isTranslating, startTransition] = useTransition()

  const handleAskQuestion = (e: FormEvent) => {
    e.preventDefault()

    startTransition(async () => {
        const documentData = document.get("document-store").toJSON()

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/translate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                documentData,
                targetLanguage: language,
            })
        })

        if(response.ok){
            const { translated_text } = await response.json()
            console.log("response: ", translated_text)
            setSummary(translated_text)
            toast.success('Document successfully translated!')
        }

        if(!response.ok){
            const { error } = await response.json()
            console.log("response: ", error)
            toast.error("Oops! Something went wrong. Try again later.")
        }
    })
}

    return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild size={'sm'} variant={'outline'} className="text-black border-black hover:opacity-90 font-medium">
            <DialogTrigger><LanguagesIcon />Translate</DialogTrigger>
        </Button>
            <DialogContent>
                <DialogHeader>
                <DialogTitle className="text-black mb-2">Transalate the Document</DialogTitle>
                <DialogDescription className="text-gray-600">
                    Select a language you would like the document to in and AI will translate & summarize it in the selected language.
                </DialogDescription>

                <hr className='mt-5 border-gray-400'/>
                </DialogHeader>

                {
                    summary && (
                        <div className='flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100 text-black'>
                            <div className="flex">
                                <BotIcon className='w-10 flex-shrink-0' />
                                <p className='font-bold'>GPT {isTranslating ? 'is thinking' : 'says: '}</p>
                            </div>
                            <Markdown>{isTranslating ? 'Thinking...' : summary}</Markdown>
                        </div>
                    )
                }

                <form action="submit" className="flex space-x-2" onSubmit={handleAskQuestion} >
                  <Select value={language} onValueChange={(value) => setLanguage(value)}>
                    <SelectTrigger className='w-full text-black'>
                        <SelectValue placeholder="Select a language"/>
                    </SelectTrigger>
                    <SelectContent>
                        {languages.map((language) => (
                            <SelectItem key={language} value={language}>
                                {language.charAt(0).toUpperCase() + language.slice(1)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Button type="submit" disabled={!language || isTranslating}>{isTranslating ? 'Translating...' : 'Translate'}</Button>
                </form>
            </DialogContent>
        </Dialog>
  )
}
export default TranslateDocument