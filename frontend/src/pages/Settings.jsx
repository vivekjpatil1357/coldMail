import Nav from '@/components/Nav'
import React, { useEffect } from 'react'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, MapPin, GraduationCap, Calendar, List, Linkedin, Globe, User2Icon, LinkedinIcon, School } from "lucide-react"
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
const navigate=useNavigate()
    useEffect(() => {
        console.log('effected');
        // const cookie = Cookies.get('token')
        fetch('http://localhost:3000/user/get_user',
            {
                method: 'GET',
                credentials: 'include', // Allow cookies to be sent
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        ).then(res => res.json())
            .then((data) => {
                if (!data.success)
                {    toast.error('Access Denied')
                    navigate('/auth')
                }
                else {
                    setUser({...data.user,skills:data.user.skills.join(',')})
                }
            })
    }, [])

    const InputWithIcon = ({ icon, ...props }) => (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">{icon}</div>
            <Input
                className="pl-10 bg-gray-800 text-white border-gray-700 hover:border-violet-500 transition-colors"
                {...props}
            />
        </div>
    )
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        phone: "",
        age: "",
        location: "",
        college: "",
        degree: "",
        graduationYear: "",
        skills: '',
        linkedin: "",
        portfolio: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser((prev) => ({ ...prev, [name]: value }))
    }
    const handleSubmit = (e) => {
        console.log(user);
        e.preventDefault()
        fetch('http://localhost:3000/user/edit_info', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...user,skills:user.skills.split(',').map((skill)=>skill.trim()) })
        })
            .then(response => response.json())
            .then((data) => {
                if (data.success) {
                    toast.success('Changes Saved')
                }
                else {
                    console.log(data.error)
                }
            }).catch((err) => {
                toast.error('error in savign info', err.message)
            })
            console.log('submitting');
    }


    return (
        <div>
            <Nav login={true} />

            <div className="min-h-screen bg-zinc-900 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-white">Settings</h1>
                        <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center">
                            <span className="text-xl text-white">{(user.fullName.split(' ').map((n)=>n[0])).join('')}</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-white">Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="fullName" className="text-white">Full Name</Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400"><User2Icon /></div>
                                        <Input
                                            className="pl-10 bg-gray-800 text-white border-gray-700 hover:border-violet-500 transition-colors"
                                            id="fullName" name="fullName" value={user.fullName} onChange={handleChange}
                                        />
                                    </div>
                                    {/* <Input id="fullName" name="fullName" value={user.fullName} onChange={handleChange} /> */}
                                </div>
                                <div>
                                    <Label htmlFor="email" className="text-white">Email</Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400"><Mail size={18} /></div>
                                        <Input
                                            disabled
                                            className="pl-10 bg-gray-800 text-white border-gray-700 hover:border-violet-500 transition-colors"
                                            id="email" name="email" type="email" value={user.email} onChange={handleChange}
                                        />
                                    </div>
                                    {/* <InputWithIcon icon={<Mail size={18} />} id="email" name="email" type="email" value={user.email} onChange={handleChange} /> */}
                                </div>
                                <div>
                                    <Label htmlFor="phone" className="text-white">Phone</Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400"><Phone size={18} /></div>
                                        <Input
                                            className="pl-10 bg-gray-800 text-white border-gray-700 hover:border-violet-500 transition-colors"
                                            id="phone" name="phone" value={user.phone} onChange={handleChange}
                                        />
                                    </div>
                                    {/* <InputWithIcon icon={<Phone size={18} />} id="phone" name="phone" value={user.phone} onChange={handleChange} /> */}
                                </div>
                                <div>
                                    <Label htmlFor="age" className="text-white">Age</Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400"><Calendar size={18} /></div>
                                        <Input
                                            className="pl-10 bg-gray-800 text-white border-gray-700 hover:border-violet-500 transition-colors"
                                            id="age" name="age" type="number" value={user.age} onChange={handleChange}
                                        />
                                    </div>
                                    {/* <InputWithIcon icon={<Calendar size={18} />} id="age" name="age" type="number" value={user.age} onChange={handleChange} /> */}
                                </div>
                                <div className="md:col-span-2">
                                    <Label htmlFor="location" className="text-white">Location</Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400"><MapPin size={18} /></div>
                                        <Input
                                            className="pl-10 bg-gray-800 text-white border-gray-700 hover:border-violet-500 transition-colors"
                                            id="location" name="location" value={user.location} onChange={handleChange} 
                                        />
                                    </div>
                                    {/* <InputWithIcon icon={<MapPin size={18} />} id="location" name="location" value={user.location} onChange={handleChange} /> */}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-white">Education</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="college" className="text-white">College</Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400"><School size={18} /></div>
                                        <Input
                                            className="pl-10 bg-gray-800 text-white border-gray-700 hover:border-violet-500 transition-colors"
                                            id="college" name="college" value={user.college} onChange={handleChange} 
                                        />
                                    </div>
                                    {/* <InputWithIcon icon={<GraduationCap size={18} />} id="college" name="college" value={user.college} onChange={handleChange} /> */}
                                </div>
                                <div>
                                    <Label htmlFor="degree" className="text-white">Degree</Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400"><GraduationCap size={18} /></div>
                                        <Input
                                            className="pl-10 bg-gray-800 text-white border-gray-700 hover:border-violet-500 transition-colors"
                                            id="degree" name="degree" value={user.degree} onChange={handleChange}
                                        />
                                    </div>
                                    {/* <InputWithIcon icon={<GraduationCap size={18} />} id="degree" name="degree" value={user.degree} onChange={handleChange} /> */}
                                </div>
                                <div>
                                    <Label htmlFor="graduationYear" className="text-white">Graduation Year</Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400"><Calendar size={18} /></div>
                                        <Input
                                            className="pl-10 bg-gray-800 text-white border-gray-700 hover:border-violet-500 transition-colors"
                                            id="graduationYear" name="graduationYear" type="number" value={user.graduationYear} onChange={handleChange}
                                        />
                                    </div>
                                    {/* <InputWithIcon icon={<Calendar size={18} />} id="graduationYear" name="graduationYear" type="number" value={user.graduationYear} onChange={handleChange} /> */}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-white">Professional Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <Label htmlFor="skills" className="text-white">Skills (comma-separated)</Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                                            <List size={18} />
                                        </div>
                                        <Textarea id="skills" name="skills" value={user.skills} onChange={handleChange} className="pl-10 bg-gray-800 text-white border-gray-700 hover:border-violet-500 transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="linkedin" className="text-white">LinkedIn URL</Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400"><LinkedinIcon size={18} /></div>
                                        <Input
                                            className="pl-10 bg-gray-800 text-white border-gray-700 hover:border-violet-500 transition-colors"
                                            id="linkedin" name="linkedin" value={user.linkedin||
                                                ''
                                            } onChange={handleChange}
                                        />
                                    </div>
                                    {/* <InputWithIcon icon={<Linkedin size={18} />} id="linkedin" name="linkedin" value={user.linkedin} onChange={handleChange} /> */}
                                </div>
                                <div>
                                    <Label htmlFor="portfolio" className="text-white">Portfolio URL</Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400"><Globe size={18} /></div>
                                        <Input
                                            className="pl-10 bg-gray-800 text-white border-gray-700 hover:border-violet-500 transition-colors"
                                            id="portfolio" name="portfolio" value={user.portfolio || ''} onChange={handleChange}
                                        />
                                    </div>
                                    {/* <InputWithIcon icon={<Globe size={18} />} id="portfolio" name="portfolio" value={user.portfolio || ''} onChange={handleChange} /> */}
                                </div>
                            </CardContent>
                        </Card>

                        <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white text-lg py-6 rounded-lg transition-colors duration-300 ease-in-out transform hover:scale-105">
                            Save Changes
                        </Button>
                    </form>


                </div>
            </div>



        </div>
    )
}

export default Settings