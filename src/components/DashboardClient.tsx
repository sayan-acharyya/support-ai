
'use client'
import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const DashboardClient = ({ ownerId }: { ownerId: string }) => {
    const router = useRouter();
    const [businessName, setBusinessName] = useState("");
    const [supportEmail, setSupportEmail] = useState("");
    const [knowledge, setKnowledge] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSettings = async () => {

        if (!businessName || !supportEmail || !knowledge) {
            toast.error("Please fill all fields")
            return;
        }

        setLoading(true)

        try {
            const result = await axios.post(
                "/api/settings",
                { ownerId, businessName, supportEmail, knowledge }
            )

            toast.success("Chatbot settings updated")

            setBusinessName("");
            setSupportEmail("");
            setKnowledge("");

        } catch (error) {
            console.log(error);
            toast.error("Failed to update chatbot settings")

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (ownerId) {
            const handleGetDetails = async () => {
                try {
                    const result = await axios.post("/api/settings/get", { ownerId });
                    setBusinessName(result.data.businessName)
                    setSupportEmail(result.data.supportEmail)
                    setKnowledge(result.data.knowledge);
                } catch (error) {
                    console.log(error);
                }
            }
            handleGetDetails()
        }
        
    }, [ownerId])

    return (
        <div className='min-h-screen bg-zinc-50 text-zinc-900'>
            <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className='fixed  top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200'
            >
                <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
                    <div
                        onClick={() => router.push("/")}
                        className='text-lg cursor-pointer font-semibold tracking-tight'>
                        Support<span className='text-zinc-400 ml-0.5'>AI</span>
                    </div>
                    <button
                    onClick={()=>router.push("/embed")}
                        className='px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100 transition'>
                        Embed ChatBot
                    </button>
                </div>
            </motion.div>

            <div className='flex justify-center px-4 py-14 mt-20'>
                <motion.div
                    className='w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10'
                >
                    <div className='mb-10'>
                        <h1 className='text-2xl font-semibold '>ChatBot Settings</h1>
                        <p className='text-zinc-500 mt-1'>Manage your AI chatbot knowledge and business details</p>
                    </div>

                    <div className='mb-10'>
                        <h1 className='text-lg font-medium mb-4'>Business Details</h1>
                        <div className='space-y-4'>
                            <input
                                type="text"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                placeholder='Business Name'
                                className='w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80'
                            />
                            <input
                                type="text"
                                value={supportEmail}
                                onChange={(e) => setSupportEmail(e.target.value)}
                                placeholder='Support email'
                                className='w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80'

                            />
                        </div>
                    </div>

                    <div className='mb-10'>
                        <h1 className='text-lg font-medium  '>Knowledge Base</h1>
                        <p className='text-sm text-zinc-500 mb-4'>Add FAQs, policies, delivery info, refunds, etc.</p>
                        <div className='space-y-4'>
                            <textarea
                                value={knowledge}
                                onChange={(e) => setKnowledge(e.target.value)}
                                placeholder={`• Refund Policy: 7 Days Return Available
• Delivery Time: 3–5 Working Days
• Cash on Delivery Available
• Support Hours: 9:00 AM – 6:00 PM`}
                                className='w-full h-54 rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80'
                            />

                        </div>
                    </div>

                    <div className='flex items-center gap-5'>
                        <motion.button
                            onClick={handleSettings}
                            disabled={loading}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className='px-7 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-zinc-900 transition disabled:opacity-60  '
                        >
                            {loading ? <Loader2 size={15} className='animate-spin' /> : " Save"}
                        </motion.button>
                    </div>

                </motion.div>
            </div>

        </div>
    )
}

export default DashboardClient