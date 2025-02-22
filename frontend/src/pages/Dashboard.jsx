"use client";

import { useEffect, useState } from "react";
// import { Bell, Menu, Search, Settings } from "lucide-react";
import Nav from "@/components/Nav";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"




export default function Dashboard() {
  const [emails, setEmails] = useState([])
  const [visibleMail,setVisibleMail]=useState()
  const [showMail,setShowMail]=useState(false)
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:3000/mail/get_mails', {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
      })
        .then(e => e.json())
        .then((data) => {
          console.log(data);

          if (data.success) {
            setEmails(data.mails)
          }
          else {
            toast.error('error in fetching mails', data)
          }
        })
    }
    fetchData()
  }, [])

  
  return (

    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <Nav login={true} />

    
      <div className="dark:bg-zinc-900 min-h-screen">
        <header className="border-b bg-zinc-900 dark:border-zinc-800  justify-center flex">
          <div className="flex items-center h-16 px-4 justify-center  w-3/4">

            <div className="flex-1 flex items-center justify-start  ml-12">
              <h1 className="text-4xl font-semibold dark:text-white mr-8 ">Inbox</h1>

            </div>

          </div>
        </header>

        <main className="max-w-5xl mx-auto py-4 max-h-full">
      <div className="space-y-1">
        {emails.map((email) => (
          <div
            key={email._id}
            className={`flex items-center gap-4 p-2 rounded-lg hover:bg-zinc-800/50 cursor-pointer ${email.read ? "opacity-70" : ""}`}
            onClick={() => {
              setShowMail(true);
              setVisibleMail(email);
            }}
          >
            <div className="w-48 truncate dark:text-zinc-300">{email.recipiant}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium dark:text-zinc-100 truncate">{email.subject}</h3>
              <p className="text-sm dark:text-zinc-400 truncate">{email.body}</p>
            </div>
            <div className="text-sm dark:text-zinc-400 whitespace-nowrap">
              {new Date(email.time).toLocaleString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Dialog Box */}
      <Dialog open={showMail} onOpenChange={setShowMail}>
        <DialogContent className="max-w-md bg-black text-white">
          <DialogHeader>
            <DialogTitle>{visibleMail?.subject || "No Subject"}</DialogTitle>
            <DialogDescription>
              {new Date(visibleMail?.time).toLocaleString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </DialogDescription>
          </DialogHeader>
          <div className="dark:text-zinc-300 whitespace-pre-line">
            {visibleMail?.body || "No content available."}
          </div>
        </DialogContent>
      </Dialog>
    </main>
      </div>
    </div>
  );
}
