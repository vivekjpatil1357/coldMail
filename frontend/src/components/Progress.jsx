
export default function Progress({isLogin,stage}) {
    return (
        <div className="relative hidden w-1/2 p-8 lg:block">
                <div className="h-full w-full overflow-hidden rounded-[40px] bg-gradient-to-b from-purple-400 via-purple-600 to-black">
                    <div className="flex h-full flex-col items-center justify-center px-8 text-center text-white">
                        <div className="mb-8">
                            <h1 className="text-2xl font-semibold">Cold Email Generator</h1>
                        </div>
                        <h2 className="mb-6 text-4xl font-bold">{isLogin?'Welcome Back':'Get Started with Us'}</h2>
                        <p className="mb-12 text-lg">{isLogin?'Access your account in just a few steps, start generating':'Complete these easy steps to register your account.'}</p>

                        {!isLogin?<div className="w-full max-w-sm space-y-4">
                            {["Sign up your account", "Personal Details", "Educational Qualifications", "Professional background"].map((step, index) => (
                                <div key={index} className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                                    <div className="flex items-center gap-4">
                                        <span className={`flex h-8 w-8 items-center justify-center rounded-full ${stage === index+1 ? "bg-white text-black" : "bg-white/20 text-white"
                                            }`}>
                                            {index + 1}
                                        </span>
                                        <span className="text-lg">{step}</span>
                                    </div>
                                </div>
                            ))}
                        </div>:
                        <div className="w-full max-w-sm space-y-4">
                            {["AI-Powered Email Generation", "Personalized Templates", "Customized Tones", "Quick & Secure Login"].map((step, index) => (
                                <div key={index} className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                                    <div className="flex items-center gap-4">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                                            ✔️
                                        </span>
                                        <span className="text-lg">{step}</span>
                                    </div>
                                </div>
                            ))}
                        </div>}
                    </div>
                </div>
            </div>
    );
}
