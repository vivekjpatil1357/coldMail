'use client'
const backend = import.meta.env.VITE_BACKEND;
import { useEffect, useState } from 'react'
import { Send, Sparkle } from 'lucide-react'
import Nav from '@/components/Nav'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DotLoader } from 'react-spinners';
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';


export default function Home() {
  const [position, setPosition] = useState('')
  const [prevPosition, setPrevPosition] = useState('')
  const [customPosition, setCustomPosition] = useState('')
  const [tone, setTone] = useState('')
  const [prevTone, setPrevTone] = useState('')
  const [customTone, setCustomTone] = useState('')
  const [generatedEmail, setGeneratedEmail] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [description, setDescription] = useState('')
  const [prevDescription, setPrevDescription] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()
  useEffect(() => {
    const fetchInfo = async () => {
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
          console.log('calling fetch info');
          if (!data.success) {
            // toast.error('Access Denied, Login first')
            navigate('/auth')
          }

        })
        .catch((error) => {
          console.log(error);
        })
    }
    fetchInfo()
  }, [])



  const handleSubmit = (e) => {
    e.preventDefault()
    if (prevTone === tone && prevDescription === description && position === prevPosition)
      return
    setPrevDescription(description)
    setPrevPosition(position)
    setPrevTone(tone)
    if (!position) {
      setErrors({ ...errors, positionError: 'Select position to send email please' })
      return
    }
    else {
      setErrors({ ...errors, positionError: '' })
    }
    if (!tone) {
      setErrors({ ...errors, toneError: 'Select tone please' })
      return
    }
    else {
      setErrors({ ...errors, toneError: '' })
    }
    setIsLoading(true)
    const datatosend = {
      to: position === 'other' ? customPosition : position,
      tone: tone === 'other' ? customTone : tone,
      description
    }
    fetch(`http://localhost:3000/mail/fetchMail`, {
      method: "POST",
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datatosend)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setGeneratedEmail(data.response)
        setIsLoading(false)
      })
      .catch(error => console.error("Error in fetching:", error));
  }
  const sendMail = async () => {
    if (!recipientEmail || !generatedEmail) return

    setIsSending(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
    } catch (error) {
    } finally {
      setIsSending(false)
    }
  }
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };
  return (
    <div className="min-h-screen  text-white bg-black ">
      {/* Navbar */}
      <Nav login={true} />
      {/* Main Content */}
      <main className="container mx-auto p-4 bg-black ">
        <Card className="max-w-2xl mx-auto bg-transparent shadow-lg border border-transparent">
          <CardHeader>
            <div className='flex gap-3 items-center bg-gray-800 rounded-2xl w-fit  text-white p-4'>

              <Sparkle color='violet' />
              <CardTitle className="pr-4">Generate Cold Email</CardTitle>
            </div>
            <CardDescription className="text-white">
              Fill in the details to generate a personalized cold email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 ">
              <div className="space-y-2">
                <label htmlFor="position" className="text-white font-semibold ">
                  To: (Select Position/Occupation)
                </label>
                {errors.positionError && <div className='text-red-500'>{errors.positionError}</div>}
                <Select value={position} onValueChange={setPosition} required>
                  <SelectTrigger id="position" className=" bg-gray-800 border-gray-800 text-white">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent className='bg-gray-800 text-white border border-gray-800'>
                    <SelectItem value="ceo">CEO</SelectItem>
                    <SelectItem value="cto">CTO</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {position === 'other' && (
                  <Input
                    value={customPosition}
                    onChange={(e) => setCustomPosition(e.target.value)}
                    placeholder="Enter custom position"
                    className="mt-2 border-gray-800 text-white bg-gray-800 "
                    required
                  />
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="tone" className="text-white font-semibold">Tone Selection:</label>
                {errors.toneError && <div className='text-red-500'>{errors.toneError}</div>}
                <Select value={tone} onValueChange={setTone} required>
                  <SelectTrigger id="tone" className="border-gray-800 text-white bg-gray-800">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent className='bg-gray-800 border-gray-800'>
                    <ScrollArea className="h-40 rounded-md border-gray-800 text-white">
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="informal">Informal</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="respectful">Respectful</SelectItem>
                      <SelectItem value="polite">Polite</SelectItem>
                      <SelectItem value="appreciative">Appreciative</SelectItem>
                      <SelectItem value="apologetic">Apologetic</SelectItem>
                      <SelectItem value="assertive">Assertive</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </ScrollArea>
                  </SelectContent>
                </Select>
                {tone === 'other' && (
                  <Input
                    value={customTone}
                    onChange={(e) => setCustomTone(e.target.value)}
                    placeholder="Enter custom tone"
                    className="mt-2 border-gray-800 text-white bg-gray-800 "
                    required
                  />
                )}
              </div>
              <div className='space-y-2'>
                <label htmlFor="description" className="text-white font-semibold">
                  Description
                </label>
                {errors.descriptionError && <div className='text-red-500'>{errors.descriptionError}</div>}
                <Input value={description} id='description' onChange={e => setDescription(e.target.value)} className='mt-2 border-gray-800 text-white bg-gray-800 ' required placeholder='Enter Aim of Email'
                />
              </div>
              <div className="space-y-2">
                <label className="text-white font-semibold">Generated Email:</label>
                <Textarea value={generatedEmail} onChange={(e) => { setGeneratedEmail(e.target.value) }} className="min-h-40 border-gray-800 text-white bg-gray-800" />
              </div>

              <CardFooter className="flex flex-col md:flex-row md:justify-between items-end gap-4">
                {isLoading ? <DotLoader color='white' /> : <Button type="submit" disabled={isLoading} className="bg-white text-black w-full md:w-auto hover:bg-gray-200">
                  {isLoading ? 'Generating...' : 'Generate Email'}
                </Button>}


              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
