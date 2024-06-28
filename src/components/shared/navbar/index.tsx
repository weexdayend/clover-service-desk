import React from 'react'

import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Link,
  Button
} from "@nextui-org/react";

import {
  FlowerIcon,
  TicketIcon,
  HomeIcon,
  WarehouseIcon,
} from 'lucide-react'

import Account from './account';

type Props = {}

function Index({}: Props) {
  return (
    <Navbar className='border-b border-b-gray-100/10 drop-shadow-sm'>
      <NavbarBrand className='gap-2'>
        <FlowerIcon size={36} />
        <div className='flex flex-col w-full'>
          <p className="font-bold text-inherit">CLOVER</p>
          <p className="text-xs opacity-50 -mt-2 ml-2">service desk.</p>
        </div>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-2" justify="center">
        <NavbarItem>
          <Link href="/home">
            <Button variant='light'>
              <HomeIcon className="h-4 w-4" />
              Home
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/ticket">
            <Button variant='light'>
              <TicketIcon className="h-4 w-4" />
              Ticket
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/inventory">
            <Button variant='light'>
              <WarehouseIcon className="h-4 w-4" />
              Inventory
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Account />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Index