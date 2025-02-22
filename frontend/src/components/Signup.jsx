
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from '../config/config.firebase'
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const Signup = ({ isLogin, setIsLogin, setStage }) => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    //signup
    const signupEmailPass = () => {
        console.log(email, password);

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const creationTime = result.user.metadata.creationTime; // Get creation time
                return fetch('http://localhost:3000/user/register', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, creationTime, password }),
                });
            })
            .then((response) => response.json()) // Parse JSON response
            .then((data) => {
                if (data.success) {
                    Cookies.set('email', JSON.stringify({ email })); // Store email in cookies
                    console.log("Cookies set");
                    toast.success('Signed up')
                    setStage(prev => prev + 1); // Move this inside success check
                } else {
                    console.log(data.error);
                    toast.error('error in signup')
                }
            })
            .catch((error) => {
                toast.error("Email Already in use")
                console.log("Error:", error);
            });
    }
    const signupGoogle = () => {
        signInWithPopup(auth, googleProvider).then((result) => {
            if (!result.user.emailVerified) return
            console.log(result.user);
            const { email, displayName } = result.user
            const { creationTime } = result.user.metadata
            console.log(email, displayName);

            fetch('http://localhost:3000/user/register', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, displayName, creationTime }),
            }).then((response) => {
                return response.json()
            }).then((data) => {
                if (data.success) {
                    Cookies.set('email', JSON.stringify({ email }), { expires: 1 / 24 }); // Store email in cookies
                    console.log("Cookies set");
                    toast.success('Signed up')
                    setStage(prev => prev + 1); // Move this inside success check
                } else {
                    console.log(data.error);
                    // if (data.error.code === 11000)
                        toast.error(`Email Already registered`)
                }
            }).catch((error) => {
                // if (error.errorResponse.code === 11000)
                    toast.error('already registered')
            })
        })
    }

    //login
    const loginEmailPass = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((results) => {
                console.log('inside login', results.user);
                fetch('http://localhost:3000/user/login',
                    {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'POST',
                        body: JSON.stringify({ email, password })
                    }
                ).then((response) => response.json())
                    .then((data) => {
                        if (data.success) {
                            console.log('got token', data.token);
                            Cookies.set('token', data.token, { expires: 1 })
                            toast.success("Login Successful!")
                            navigate('/')
                        }
                        else {
                            console.log('login falised');
                            if (data.message)
                                toast.error(data.message)
                            else
                                console.log(data);
                        }
                    }).catch((error) => {
                        toast.error('error from db auth', error.message)
                    })
            }).catch((error) => {
                toast.error('Invalid Email')
            })
    }
    const loginGoogle = () => {

        signInWithPopup(auth, googleProvider)
            .then((result) => {
                if (result.user.metadata.creationTime === result.user.metadata.lastSignInTime) {
                    console.log(result.user.metadata);
                    fetch('http://localhost:3000/user/register', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: result.user.email, displayName: result.user.displayName, creationTime: result.user.metadata.creationTime }),
                    }).then((response) => {
                        return response.json()
                    }).then((data) => {
                        if (data.success) {
                            Cookies.set('email', JSON.stringify({ email:result.user.email }), { expires: 1 / 24 }); // Store email in cookies
                            console.log("Cookies set");
                            toast.success('Signed up')
                            setIsLogin(false)
                            setStage(prev => prev + 1); 
                        } else {
                            console.log(data.error);
                            if (data.error.code === 11000)
                                toast.error(`Email Already registered`)
                        }
                    }).catch((error) => {
                        if (error.errorResponse.code === 11000)
                            toast.error(error.message)
                    })
                    return
                }
                fetch('http://localhost:3000/user/login',
                    {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'post',
                        body: JSON.stringify({ email: result.user.email })
                    }
                ).then((response) => response.json())
                    .then((data) => {

                        if (data.success) {
                            // Cookies.remove('email')
                            Cookies.set('token', data.token, { expires: 1 })
                            toast.success("Login Successful!")
                            navigate('/')
                        }
                        else {
                            console.log('login falised');
                            if (data.message)
                                toast.error(data.message)
                            else
                                console.log(data);
                        }
                    }).catch((error) => {
                        toast.error('error from db auth', error.message)
                    })
            }).catch((error) => {
                toast.error('Invalid Email')
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isLogin) loginEmailPass()
        else signupEmailPass()
    };
    const handleGoogleSignup = () => {
        if (isLogin) loginGoogle()
        else signupGoogle()
    }
    return (
        <div className="flex w-full items-center justify-center bg-black p-6 lg:w-1/2">
            {/* <button className="bg-white text-black" onClick={e=>toast.success('Registered SUccessfully')}>click me</button> */}
            <div className="w-full max-w-md rounded-[40px] p-12">
                <div className="mx-auto max-w-sm">
                    <h2 className="mb-2 text-3xl font-bold text-white">{isLogin ? 'Login' : 'Sign Up Account'}</h2>
                    <p className="mb-8 text-gray-400">Enter your personal data to create your account.</p>

                    <div className="mb-8 grid gap-4">
                        <Button variant="outline" className="h-12" onClick={handleGoogleSignup}>
                            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </Button>

                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-800"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-black px-2 text-gray-400">Or</span>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {!isLogin && <div className="grid gap-4 md:grid-cols-2">
                            <Input className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400" onChange={e => setFirstName(e.target.value)} value={firstName} placeholder="First Name" required type="text" />
                            <Input className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400" onChange={e => setLastName(e.target.value)} value={lastName} placeholder="Last Name" required type="text" />
                        </div>}

                        <Input className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400" onChange={e => setEmail(e.target.value)} placeholder="Email" value={email} required type="email" />
                        <Input className="h-12 border-gray-800 bg-gray-900 text-white placeholder:text-gray-400" onChange={e => setPassword(e.target.value)} minLength="8" value={password} required placeholder="Password" type="password" />
                        {!isLogin && <p className="text-sm text-gray-400">Must be at least 8 characters.</p>}


                        <Button className="h-12 w-full bg-white text-black hover:bg-gray-100"> {isLogin ? 'Sign In' : 'Sign Up'}</Button>


                        {!isLogin ? <p className="text-center text-sm text-gray-400">
                            Already have an account? <button onClick={(e) => { e.preventDefault(); setIsLogin(true); }} className="text-white hover:underline">Log in</button>
                        </p> :
                            <p className="text-center text-sm text-gray-400">
                                Does not have an account? <button onClick={(e) => { e.preventDefault(); setIsLogin(false); }} className="text-white hover:underline">Sign up</button>
                            </p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup