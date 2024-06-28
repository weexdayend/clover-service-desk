import React from 'react'

import Inventory from '@/components/page/inventory'

type Props = {}

function Page({}: Props) {
  return (
    <div className='w-full min-h-screen grid grid-cols-1 gap-4 py-14 px-24'>
      <Inventory />
    </div>
  )
}

export default Page