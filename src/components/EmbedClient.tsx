'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { motion } from "motion/react"
import { Check, Copy } from 'lucide-react'

const EmbedClient = ({ ownerId }: { ownerId: string }) => {
    const router = useRouter();
    const [copied, setCopied] = useState(false);

    const embedCode = `<script 
   src="${process.env.NEXT_PUBLIC_APP_URL}/chatBot.js"
   data-owner-id = "${ownerId}"
   ></script> `

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(embedCode);
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (error) {
            console.log("Copy failed", error);
        }
    };

    return (
        <div className='min-h-screen bg-zinc-50 text-zinc-900'>
            {/* nav bar */}
            <div className='sticky top-0 z-40 bg-white border-b border-zinc-200'>
                <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
                    <div
                        onClick={() => router.push("/")}
                        className='text-lg font-semibold tracking-tight'>
                        Support<span className='text-zinc-400 ml-0.5'>AI</span>
                    </div>
                    <button
                        className='px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100 transition'
                        onClick={() => router.push("/dashboard")}
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>

            <div className='flex justify-center px-4 py-14'>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='w-full max-w-4xl bg-white rounded-2xl shadow-xl p-10'
                >
                    <h1 className='text-2xl font-semibold mb-2'>Embed ChatBot</h1>
                    <p>
                        Copy and paste this code before <code>&lt;/body&gt;</code>
                    </p>
                    <div className='relative mt-2 bg-zinc-900 text-zinc-100 rounded-xl p-5 text-sm font-mono mb-10'>
                        <pre className='overflow-x-auto'>
                            {embedCode}
                        </pre>


                        <button
                            onClick={copy}
                            className="
    absolute top-3 right-3
    flex items-center gap-1.5
    bg-zinc-800 text-white
    text-xs font-medium
    px-3 py-1.5
    rounded-lg
    hover:bg-zinc-800
    active:scale-95
    transition-all duration-200
    "
                        >
                            {copied ? (
                                <>
                                    <Check size={14} />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy size={14} />
                                    Copy
                                </>
                            )}
                        </button>
                    </div>

                    <ol className='space-y-3 text-sm text-zinc-600 list-decimal list-inside'>
                        <li>Copy the embed script</li>
                        <li>Paste it before the closing body tag</li>
                        <li>Reload your website</li>
                    </ol>

                   <div className='mt-14'>
    <h1 className='text-lg font-medium'>
        Live Preview
    </h1>

    <p className='text-sm text-zinc-500 mb-6'>
        This is how the chatbot will appear on your website
    </p>

    <div className='rounded-xl border border-zinc-300 bg-white shadow-md overflow-hidden'>
        
        {/* Browser Header */}
        <div className='flex items-center gap-2 px-4 h-9 bg-zinc-100 border-b border-zinc-200'>
            <span className='w-2.5 h-2.5 rounded-full bg-red-400' />
            <span className='w-2.5 h-2.5 rounded-full bg-yellow-400' />
            <span className='w-2.5 h-2.5 rounded-full bg-green-400' />

            <span className='ml-4 text-xs text-zinc-500'>
                Your-website.com
            </span>
        </div>

        {/* Website Preview */}
        <div className='relative h-64 sm:h-72 p-6 text-sm text-zinc-400 bg-zinc-50'>
            Your website goes here

            {/* Chat Widget */}
            <div
                className='absolute bottom-24 right-6 w-64 bg-white rounded-xl 
                shadow-xl border border-zinc-200 overflow-hidden'
            >

                {/* Widget Header */}
                <div
                    className='bg-black text-white text-xs px-3 py-2 
                    flex justify-between items-center'
                >
                    <span>Customer Support</span>

                    <button className='hover:text-zinc-300 transition'>
                        ╳
                    </button>
                </div>

                {/* Messages */}
                <div className='p-3 bg-zinc-50 flex flex-col gap-3'>
                    
                    {/* Bot Message */}
                    <div
                        className='max-w-[85%] bg-white border border-zinc-200 
                        rounded-xl rounded-tl-sm px-3 py-2 text-xs text-zinc-700'
                    >
                        Hello 👋 <br />
                        How can I help you?
                    </div>

                    {/* User Message */}
                    <div
                        className='ml-auto max-w-[85%] bg-black text-white 
                        rounded-xl rounded-tr-sm px-3 py-2 text-xs'
                    >
                        I need help
                    </div>
                </div>

                {/* Input */}
                <div className='border-t border-zinc-200 p-2 flex items-center gap-2 bg-white'>
                    <input
                        type='text'
                        placeholder='Type message...'
                        className='flex-1 h-8 px-2 rounded-lg border border-zinc-200 
                        text-xs outline-none'
                    />

                    <button
                        className='w-8 h-8 rounded-lg bg-black text-white 
                        flex items-center justify-center text-xs'
                    >
                        ➤
                    </button>
                </div>
            </div>

            {/* Floating Button */}
            <button
                className='absolute bottom-6 right-6 w-12 h-12 rounded-full 
                bg-black text-white shadow-lg flex items-center justify-center 
                text-lg hover:scale-105 transition'
            >
                💬
            </button>
        </div>
    </div>
</div>

                </motion.div>
            </div>

        </div>
    )
}

export default EmbedClient