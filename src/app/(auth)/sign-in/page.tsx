"use client"

import React, { useState } from 'react'
import { signIn } from "next-auth/react";

import {
  Input,
  Button
} from "@nextui-org/react";

import {
  FlowerIcon
} from 'lucide-react'

type Props = {}

function Page({}: Props) {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await signIn("credentials", { 
        username: username, 
        password: password, 
        callbackUrl: '/home' ,
      });
    } catch (error) {
      // Check if the error is due to email or password not found
      if (error instanceof Error && error.message.includes('credentials')) {
        // Display a custom error message to the user
        console.error('Email or password not found');
        // You can set state or display an error message in your component
      } else {
        // If the error is not related to email or password, log it for debugging
        console.error('An error occurred during sign-in:', error);
        // Optionally, display a generic error message to the user
      }
    }
  }

  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center p-24 gap-4'>
      <div className="flex flex-row gap-2 items-center justify-center">
        <FlowerIcon size={62} />
        <div className='flex flex-col w-full'>
          <p className="font-bold text-inherit">CLOVER</p>
          <p className="text-xs opacity-50 -mt-2 ml-2">service desk.</p>
        </div>
      </div>
      <div className='flex flex-col gap-8 py-4'>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            label="Username" 
            placeholder="Enter your username" 
            variant="underlined"
            className="max-w-xs"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input 
            type="password" 
            label="Password" 
            placeholder="Enter your password" 
            variant="underlined"
            className="max-w-xs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button variant='bordered' onClick={onSubmit} className='ml-auto'>Sign-in</Button>
      </div>
    </div>
  )
}

export default Page