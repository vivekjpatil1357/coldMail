import { useState } from "react";
import { Button } from "../components/ui/button"; // Adjust the path accordingly
import { Input } from "../components/ui/input";
import { Github } from "lucide-react";
import Progress from "@/components/Progress";
import Nav from "@/components/Nav";
import Signup from "@/components/Signup";
import PersonalDetailsForm from "@/components/PersonalDetails";
import EducationForm from "@/components/EducationForm";
import ProfessionalForm from "@/components/ProfessionalInfo";

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true)
    const [stage, setStage] = useState(1)

    return (
        <div>
            <Nav />

            <div className="flex min-h-screen bg-black">
                {/* Left Section */}
                <Progress isLogin={isLogin} stage={stage} />
                {stage === 1 && <Signup isLogin={isLogin} setIsLogin={setIsLogin}  setStage={setStage} />}
                {stage === 2 && <PersonalDetailsForm setStage={setStage} />}
                {stage === 3 && <EducationForm setStage={setStage}  />}
                {stage === 4 && <ProfessionalForm setStage={setStage} setIsLogin={setIsLogin}  />}
            </div>
        </div>

    );
}
