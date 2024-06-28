import React from 'react'

import ListInventory from './list-inventory'

type Props = {}

function Index({}: Props) {
  return (
    <section className='w-full min-h-screen'>
      <ListInventory />
    </section>
  )
}

export default Index