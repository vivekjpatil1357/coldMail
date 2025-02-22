import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, GraduationCap, Mail, MapPin, Phone, Linkedin, Globe } from "lucide-react";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate=useNavigate()
    const [user,setUser]=useState('')
    useEffect(() => {
        const cookie = Cookies.get('token')
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
                console.log(data.user);
                if(data.success)
                    setUser(data.user)
                else {
                toast.error(data.response)
                navigate('/auth')
                }
                console.log('is is res',data);
            })
            .catch((err) => {
                
            })
    },[]
)
    

    return (
        <div>
            <Nav login={ true} />
            <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 bg-zinc-900">
                <div className="max-w-3xl mx-auto space-y-8">
                    {/* Profile Card */}
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold text-white">User Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-20 h-20 bg-violet-600 rounded-full flex items-center justify-center">
                                        <span className="text-3xl font-bold text-white">
                                            {user && user.fullName
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-semibold text-white">{user?.fullName}</h2>
                                        <p className="text-gray-400 flex items-center">
                                            <MapPin className="w-4 h-4 mr-2 text-violet-400" />
                                            {user?.location}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center text-gray-300">
                                        <Mail className="w-5 h-5 mr-2 text-violet-400" />
                                        <span>{user?.email}</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <Phone className="w-5 h-5 mr-2 text-violet-400" />
                                        <span>{user?.phone}</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <CalendarDays className="w-5 h-5 mr-2 text-violet-400" />
                                        <span>{user?.age} years old</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <GraduationCap className="w-5 h-5 mr-2 text-violet-400" />
                                        <span>{user?.degree}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Education Card */}
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-white">Education</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-gray-300">
                                <p className="font-medium">{user?.college}</p>
                                <p>{user?.degree}</p>
                                <p>Graduated: {user?.graduationYear}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Skills Card */}
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-white">Skills</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {user&&user.skills.map((skill, index) => (
                                    <Badge key={index} variant="secondary" className="bg-violet-900 text-violet-100">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Professional Links Card */}
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-white">Professional Links</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <a
                                    href={user?.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-violet-400 hover:text-violet-300"
                                >
                                    <Linkedin className="w-5 h-5 mr-2" />
                                    LinkedIn Profile
                                </a>
                                <a
                                    href={user?.portfolio}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-violet-400 hover:text-violet-300"
                                >
                                    <Globe className="w-5 h-5 mr-2" />
                                    Portfolio Website
                                </a>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Member Since */}
                    <p className="text-center text-gray-500 text-sm">
                        Member since {user &&new Date(user.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
