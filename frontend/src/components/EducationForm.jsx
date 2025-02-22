import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const EducationForm = ({ setStage }) => {
  const [formData, setFormData] = useState({
    college: "",
    degree: "",
    graduationYear: ""
  });
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  useEffect(() => {
    function fetchEmail() {
      const unparsed = Cookies.get("email");
      if (unparsed) {
        try {
          const parsed = JSON.parse(unparsed);
          console.log("parsed cookie", parsed);
          setEmail(parsed.email);
        } catch (error) {
          console.error("Error parsing cookie:", error);
        }
      }
      else {
        navigate('/')
      }
    }
    fetchEmail();
  }, []);
  const submit = (e) => {
    e.preventDefault()
    fetch("http://localhost:3000/user/add_educational_details", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success('Educational Details Saved')
          console.log("successfully added educationa info");
          
          setStage((prev) => prev + 1);
        } else {
          console.log(data.error);
        }
      });

  }
  return (
    <div className="flex  justify-center md:w-1/2">

      <Card className="w-full max-w-lg mx-auto bg-black border-black mt-10">
        <CardHeader>
          <CardTitle className="text-white text-4xl font-bold">Education Details</CardTitle>
          <CardDescription className="text-gray-400">
            Tell us about your educational background
          </CardDescription>
        </CardHeader>
        <CardContent >
          <form action="" onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              {/* <Label htmlFor="college">College/University</Label> */}
              <Input id="college" className='h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400' onChange={handleChange} placeholder="College/University" />
              <p className="text-sm text-gray-400">eg. KCE college, Jalgaon</p>
            </div>
            <div className="space-y-2">
              <Input id="degree" className='h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400' onChange={handleChange} placeholder="Degree" />
              <p className="text-sm text-gray-400">eg. B.E. Computer Science</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="graduationYear">Graduation Year</Label>
              <Input id="graduationYear" type="number" className='h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400' onChange={handleChange} placeholder="Enter your graduation year" min="1900" max="2099" />
            </div>
            <div className="space-x-2 flex">
              <Button className='w-full bg-white text-black hover:bg-gray-200 hover:cursor-pointer ' onClick={e => setStage(prev => prev - 1)}><ArrowLeft />Back</Button>
              <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 hover:cursor-pointer">
                Save Education Details
              </Button>
            </div>
          </form>

        </CardContent>
      </Card>
    </div>
  );
};

export default EducationForm;
