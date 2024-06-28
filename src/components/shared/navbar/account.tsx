"use client"

import React from 'react'

import { useSession, signOut } from "next-auth/react"

import {
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Button, 
  Link
} from "@nextui-org/react";

import {  
  User2Icon,
  PowerOffIcon
} from "lucide-react";

type Props = {}

function Account({}: Props) {
  const { data: session } = useSession()

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <>
      {
        session?.user && (
          <div className='flex flex-row gap-2'>
            <Dropdown>
              <DropdownTrigger>
                <Button variant='light' className="flex flex-row gap-1 w-full">
                  <User2Icon className="h-4 w-4" />
                  {
                    session?.user.name
                  }
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">Profile</DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger">
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )
      }
    </>
  )
}

export default Account