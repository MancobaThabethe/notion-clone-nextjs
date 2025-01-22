"use client"
import * as Y from 'yjs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { FormEvent, useState, useTransition } from 'react'
import { BotIcon, MessageCircleQuestionIcon } from 'lucide-react'
import Markdown from 'react-markdown'
import { Input } from '../ui/input'

function ChatToDocument({ document }: { document: Y.Doc }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isAsking, startTransition] = useTransition()
    const [question, setQuestion] = useState('')
    const [askedQuestion, setAskedQuestion] = useState<string>('')
    const [response, setResponse] = useState('')

    const handleAskQuestion = (e: FormEvent) => {
    e.preventDefault()
    setAskedQuestion(question)

    startTransition(async () => {
        console.log('Asking question: ', question)
        const documentData = document.get("document-store").toJSON()

        const aiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`, {
            method: "POST",
            body: JSON.stringify({
                documentData,
                question
            })
        })

        if(aiResponse.ok){
            const { response } = await aiResponse.json()
            setResponse(response)
            setQuestion('')
        }
    })
    
}

    return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant={'outline'} size={'sm'} className="text-black border-black hover:opacity-90 font-medium">
            <DialogTrigger><MessageCircleQuestionIcon/>Chat to Document</DialogTrigger>
        </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-black mb-2">Chat to the Document</DialogTitle>
                    <DialogDescription className="text-gray-600">
                        Ask a question and chat to the document with AI.
                    </DialogDescription>
                </DialogHeader>

                {
                    (isAsking || response) && (
                        <div className='flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100 text-black'>
                            <p className='font-bold mb-1 flex gap-1'><MessageCircleQuestionIcon />: {askedQuestion.charAt(0).toUpperCase() + askedQuestion.slice(1)}</p>
                            <div className="flex">
                                <BotIcon className='w-10 flex-shrink-0' />
                                <p className='font-bold'>GPT {isAsking ? 'is thinking' : 'says: '}</p>
                            </div>
                            <Markdown>{isAsking ? 'Thinking...' : response}</Markdown>
                        </div>
                    )
                }

                <form action="submit" className="flex space-x-2" onSubmit={handleAskQuestion} >
                  <Input type='text' value={question} onChange={(e) => setQuestion(e.target.value)} placeholder='Ask a question...' className='text-black border border-gray-300' />
                  <Button type="submit" disabled={!question || isAsking}>{isAsking ? 'Asking...' : 'Ask'}</Button>
                </form>
            </DialogContent>
        </Dialog>
  )
}
export default ChatToDocument