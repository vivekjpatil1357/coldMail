import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function ProfessionalForm({ setStage,setIsLogin }) {
    const [formData, setFormData] = useState({
        skills: "",
        degree: "",
        graduationYear: ""
    });

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
            setIsLogin(true)
            navigate('/auth')
          }
        }
        fetchEmail();
      }, []);
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const handleChange = (e) => {
        const { id, value } = e.target;
        
        setFormData({ ...formData, [id]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        const filteredSkills = formData.skills.split(',').map((skill) => {
            return skill.trim()
        });

        fetch("http://localhost:3000/user/add_professional_details", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData,skills:filteredSkills, email }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                console.log("successfully added Professional info");
                setIsLogin(true)
                toast.success('Registered Successfully, Login to Continue')

               setTimeout(() => {
                 window.location.href = "/auth";
               }, 2000);
              } else {
                console.log(data.error, 'error in user');
              }
            });
    }
    return (
      <div className="flex  justify-center md:w-1/2">
        {/* <button onClick={e=>toast("hell ow")}></button> */}
            <Card className="w-full max-w-lg mx-auto bg-black border-black mt-10">
                <CardHeader>
                    <CardTitle className="text-white text-4xl font-bold">Professional Background</CardTitle>
                    <CardDescription className="text-gray-400">
                        Share your professional experience and online presence
                    </CardDescription>
                </CardHeader>
                <CardContent >
                    <form action="" onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">

                        <Textarea id="skills" onChange={ handleChange} className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400 min-h-[100px]" placeholder="Skills (comma separated)" />
                    </div>
                    <div className="space-y-2">
                        <Input id="linkedin" type="url" onChange={handleChange} className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400" placeholder="Enter your LinkedIn profile URL" />
                    </div>
                    <div className="space-y-2">

                        <Input id="portfolio" type="url" onChange={handleChange} className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400" placeholder="Enter your portfolio website URL" />
                    </div>
                    <div className="space-x-2 flex">
                        <Button className='w-full bg-white text-black hover:bg-gray-200 hover:cursor-pointer ' onClick={e => setStage(prev => prev - 1)}><ArrowLeft />Back</Button>
                        <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 hover:cursor-pointer">
                            Save Professional Details
                        </Button>
                    </div>
                    </form>
                    
                </CardContent>
            </Card>
        </div>
    )
}

