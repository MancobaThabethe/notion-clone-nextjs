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
import { LanguagesIcon } from 'lucide-react'
import { toast } from 'sonner'


type Language = | "english" | "spanish" | "portuguese" | "german" | "french" | "italian" | "russian" | "chinese" | "japanese" | "isizulu" | "swahili" | "arabic" | "hindi" | "bengali" | "korean" | "polish" | "romanian" | "swedish" | "thai" | "turkish" | "vietnamese" | "chinese simplified" | "chinese traditional" | "japanese" | "portuguese" | "afrikaans" | "dutch" | "mexican"

const languages: Language[] = [
    "english",
    "afrikaans",
    "chinese",
    "isizulu",
    "italian",
    "mexican",
    "hindi",
    "russian",
    "japanese",
    "korean",
    "portuguese",
    "german",
    "french"
]

function TranslateDocument({document}: {document: Y.Doc}) {
  const [isOpen, setIsOpen] = useState(false)
  const [language, setLanguage] = useState<Language | string>('')
  const [summary, setSummary] = useState('')
  const [question, setQuestion] = useState('')
  const [isTranslating, startTransition] = useTransition()

  const handleAskQuestion = (e: FormEvent) => {
    e.preventDefault()

    startTransition(async () => {
        const documentData = document.get("document-store").toJSON()
        console.log("starting translating ")

        try {
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
                toast.success('Document translated successfully')
            }    
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong. Failed to translate document!")
        }
        
    })
  }

    return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant={'outline'} className="text-black border-black hover:opacity-90 font-medium">
            <DialogTrigger><LanguagesIcon/>Translate</DialogTrigger>
        </Button>
            <DialogContent>
                <DialogHeader>
                <DialogTitle className="text-black mb-2">Transalate the Document</DialogTitle>
                <DialogDescription className="text-gray-600">
                    Select a language you would like the document to in and AI will translate & summarize it in the selected language.
                </DialogDescription>

                <hr className='mt-5 border-gray-400'/>
                </DialogHeader>
                <form action="submit" className="flex space-x-2" onSubmit={handleAskQuestion} >
                  <Select value={language} onValueChange={(value) => setLanguage(value)}>
                    <SelectTrigger className='w-full text-black'>
                        <SelectValue placeholder="Select a language" />
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