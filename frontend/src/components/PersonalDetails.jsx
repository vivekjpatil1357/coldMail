import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const PersonalDetailsForm = ({ setStage }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        age: "",
        location: ""
    });
    const [email, setEmail] = useState();
    const [phoneError, setPhoneError] = useState("");
    const navigate=useNavigate()
    useEffect(() => {
        async function fetchEmail() {
            const unparsed = Cookies.get("email");
            if (unparsed) {
                try {
                    const parsed = await JSON.parse(unparsed);
                    console.log("parsed cookie", parsed);
                    setEmail(parsed.email);
                } catch (error) {
                    console.error("Error parsing cookie:", error);
                }
            }
            else {
                navigate('/auth')
            }
        }

        fetchEmail();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;

        if (id === "phone") {
            const phoneRegex = /^[0-9]{10,15}$/;
            if (!phoneRegex.test(value)) {
                setPhoneError("Enter a valid phone number (10-15 digits)");
            } else {
                setPhoneError("");
            }
        }
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            alert("No email");
            return;
        }
        if (phoneError) {
            alert("Invalid phone number");
            return;
        }

        fetch("http://localhost:3000/user/add_personal_details", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData, email }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    toast.success('Personal Details Saved')
                    setStage((prev) => prev + 1);
                } else {
                    console.log(data.error);
                }
            });
    };

    return (
        <div className="flex justify-center md:w-1/2">
            <Card className="w-full bg-black md:w-3/5 border-black mt-10">
                <CardHeader>
                    <CardTitle className="text-white text-4xl font-bold">Personal Details</CardTitle>
                    <CardDescription className="text-gray-400">
                        Enter your personal information to complete your profile
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2 text-gray-400">
                            <Input
                                id="fullName"
                                className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400"
                                placeholder="Full name"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                id="phone"
                                className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400"
                                type="tel"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Input
                                    id="age"
                                    type="number"
                                    className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400"
                                    placeholder="Enter your age"
                                    value={formData.age}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    id="location"
                                    className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400"
                                    placeholder="Enter your location"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="space-x-2 flex">
                            <Button
                                className="w-full bg-white text-black hover:bg-gray-200 hover:cursor-pointer"
                                onClick={(e) => {
                                    setStage((prev) => prev - 1);
                                }}
                            >
                                <ArrowLeft /> Back
                            </Button>
                            <Button
                                type="submit"
                                className="w-full bg-white text-black hover:bg-gray-200 hover:cursor-pointer"
                            >
                                Save Personal Details
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default PersonalDetailsForm;
