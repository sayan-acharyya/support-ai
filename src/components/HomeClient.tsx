'use client'
import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import { MessageCircle } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

const Homeclient = ({ email }: { email: string }) => {
    const handleLogin = () => {
        window.location.href = "/api/auth/login"
    }


    const [open, setOpen] = useState(false)

    const features = [
        {
            title: "Plug & Play",
            desc: "Add the chatbot to your site with a single script tag."
        },
        {
            title: "Admin Controlled",
            desc: "You control exactly what the AI knows and answers."
        },
        {
            title: "Always Online",
            desc: "Your customers get instant support 24/7."
        }
    ];

    const handleLogout = async () => {
        try {
            const result = await axios.get("/api/auth/logout")
              window.location.href = "/"
            setOpen(false)
            toast.success("Logged out successfully");
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className='min-h-screen bg-linear-to-br from-white to-zinc-50 text-zinc-900 overflow-x-hidden'>
            {/* nav bar */}
            <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className='fixed  top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200'
            >
                <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
                    <div className='text-lg font-semibold tracking-tight'>
                        Support<span className='text-zinc-400 ml-0.5'>AI</span>
                    </div>
                    {email ? (
                        <div className='relative'>
                            <button
                                onClick={() => setOpen(!open)}
                                className='w-10 h-10 rounded-full bg-black text-white flex items-center justify-center
                           font-semibold hover:scale-105  transition'>
                                {email ? email[0].toUpperCase() : ""}
                            </button>

                            {open && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-3 w-52 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.12)]"
                                >
                                    {/* Header */}
                                    <div className="border-b border-zinc-100 px-4 py-3">
                                        <p className="text-sm font-semibold text-zinc-900">
                                            My Account
                                        </p>
                                        <p className="text-xs text-zinc-500">
                                            Manage your profile
                                        </p>
                                    </div>

                                    {/* Dashboard */}
                                    <button className="w-full px-4 py-3 text-left text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:pl-5">
                                        Dashboard
                                    </button>

                                    {/* Logout */}
                                    <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-3 text-left text-sm text-red-600 transition-all hover:bg-red-50 hover:pl-5">
                                        Logout
                                    </button>
                                </motion.div>
                            )}


                        </div>
                    ) : (
                        <button
                            onClick={handleLogin}
                            className='px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-800 
                    transition disabled:opacity-60 flex items-center gap-2'
                        >
                            Login
                        </button>
                    )}

                </div>
            </motion.div>

            <section className='pt-36 pb-28 px-6'>
                <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h1 className='text-4xl md:text-5xl font-semibold leading-tight'>
                            AI Customer Support <br />
                            Built for Modern Websites
                        </h1>
                        <p className='mt-6 text-lg text-zinc-600 max-w-xl'>
                            Add a powerful AI chatbot to your website in minutes.
                            Let your customers get instaant answers using own business knowledge.
                        </p>
                        <div className='mt-10 flex gap-4'>
                            {email ? <button
                                className='px-7 py-3 rounded-xl bg-black text-white font-medium
                             hover:bg-zinc-800 transition disabled:opacity-60'>
                                Go to Dashboard
                            </button> : <button
                                onClick={handleLogin}
                                className='px-7 py-3 rounded-xl bg-black text-white font-medium
                             hover:bg-zinc-800 transition disabled:opacity-60'>
                                Get Started
                            </button>}

                            <a
                                href='#feature'
                                className='px-7 py-3 rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-100 transition'>
                                Learn More
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className='relative'
                    >
                        <div className='rounded-2xl bg-white shadow-2xl border border-zinc-200 p-6'>
                            <div className='text-sm text-zinc-500 mb-3'>
                                Live Chat Preview
                            </div>
                            <div className='space-y-3'>
                                <div className='bg-black text-white rounded-xl rounded-br-sm px-4 py-2 text-sm ml-auto w-fit'>
                                    Do you offer cash on delivery?
                                </div>
                                <div className='bg-zinc-100 w-fit rounded-xl rounded-bl-sm px-4 py-2 text-sm'>
                                    Yes,Cash on Delivery is avaliable
                                </div>
                            </div>
                            <motion.div
                                animate={{ y: [0, -12, 0] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                                className='absolute -bottom-6 -right-6 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-xl'
                            >
                                <MessageCircle size={22} />
                            </motion.div>
                        </div>

                    </motion.div>
                </div>

            </section>

            <section
                id='feature'
                className='bg-zinc-50 py-28 px-6 border-t border-zinc-200'
            >
                <div className='max-w-6xl mx-auto'>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5 }}
                        className='text-3xl font-semibold text-center'
                    >
                        Why Businesses Choose SupportAI
                    </motion.h2>
                    <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-10'>
                        {features.map((f, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className='bg-white rounded-2xl p-8 shadow-lg border border-zinc-200'
                            >
                                <h1 className='text-lg font-medium'>{f.title}</h1>
                                <p className='mt-3 text-zinc-600 text-sm'>{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* footer */}
            <footer className="border-t border-zinc-200 bg-white">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                        {/* Brand */}
                        <div>
                            <h3 className="text-xl font-semibold">
                                Support<span className="text-zinc-400">AI</span>
                            </h3>
                            <p className="mt-2 text-sm text-zinc-500 max-w-sm">
                                AI-powered customer support for modern businesses.
                                Deliver instant answers and improve customer experience.
                            </p>
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-8 text-sm text-zinc-600">
                            <a
                                href="#feature"
                                className="hover:text-black transition-colors"
                            >
                                Features
                            </a>
                            <a
                                href="/dashboard"
                                className="hover:text-black transition-colors"
                            >
                                Dashboard
                            </a>
                            <a
                                href="#"
                                className="hover:text-black transition-colors"
                            >
                                Privacy
                            </a>
                            <a
                                href="#"
                                className="hover:text-black transition-colors"
                            >
                                Contact
                            </a>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="mt-10 pt-6 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-zinc-500">
                            © {new Date().getFullYear()} SupportAI. All rights reserved.
                        </p>

                        <p className="text-sm text-zinc-400">
                            Built with AI for better customer support.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Homeclient