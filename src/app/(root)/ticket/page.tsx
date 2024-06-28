import React from 'react'

import Ticket from '@/components/page/ticket'

type Props = {}

function Page({}: Props) {
  return (
    <div className='w-full min-h-screen grid grid-cols-1 gap-4 py-14 px-24'>
      <Ticket />
    </div>
  )
}

export default Page