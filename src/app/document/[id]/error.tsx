'use client' // Error boundaries must be Client Components
 
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-black rounded-xl'>
      <h2 className='text-6xl font-light text-white mb-5'>Oop! Something went wrong!</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        variant={"secondary"}
        size={'lg'}
      >
        Try again
      </Button>
    </div>
  )
}