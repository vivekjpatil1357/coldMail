'use client'

import { Mail, User, LayoutDashboard, FileText, BarChart2, Settings, HomeIcon } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

const Nav = ({ login }) => {
  const navigate = useNavigate()
  return (
    <nav className="flex items-center justify-between p-4 bg-black sticky left-0 top-0 z-10 ">
      <div className="flex items-center space-x-4 w-fit">
        <Mail className="h-6 w-6 text-gray-300" />
        <span className="text-lg font-semibold text-gray-300">Cold Email Generator</span>
      </div>

      {login && (
        <div className="hidden md:flex space-x-4 mr-42 ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-300 hover:text-gray-700 ${isActive ? "border-b-2 border-white" : ""}`
            }
          >
            <Button variant="ghost">
              <HomeIcon className="mr-2 h-4 w-4" />
              Home
            </Button>
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `text-gray-300 hover:text-gray-700 ${isActive ? "border-b-2 border-white" : ""}`
            }
          >
            <Button variant="ghost">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </NavLink>

          {/* <NavLink
            to="/templates"
            className={({ isActive }) =>
              `text-gray-300 hover:text-gray-700 ${isActive ? "border-b-2 border-white" : ""}`
            }
          >
            <Button variant="ghost">
              <FileText className="mr-2 h-4 w-4" />
              Templates
            </Button>
          </NavLink> */}


          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `text-gray-300 hover:text-gray-700 ${isActive ? "border-b-2 border-white" : ""}`
            }
          >
            <Button variant="ghost">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </NavLink>
        </div>
      )}

      {login && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-black">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={e => navigate('/profile')}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={e => navigate('/settings')}>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              Cookies.remove('token')
              navigate('/auth')
            }}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  )
}

export default Nav