import { Button } from '@/components/ui/button'
import React from 'react'
import { Paperclip } from "lucide-react";

function ChatInputBox() {
  return (
    <div className='relative min-h-screen'>
    {/* Page Content */}
    <div>

    </div>
    {/* Fixed Chat Input */}
    <div className='fixed bottom-0 left-0 w-full flex justify-center px-4 pb-4'>
        <div className='w-full border rounded-xl shadow-md max-w-2xl p-4'>
            <input type="text" placeholder='Ask ke anything...'
                className='border-0 otline-none'
            />
            <div>
                <Button>
                    <Paperclip className="h-5 w-5"/>
                </Button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ChatInputBox