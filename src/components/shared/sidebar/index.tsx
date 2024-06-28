"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { sideLinks } from "@/types/types"
import { Button } from "@nextui-org/react"

const LeftSidebar = () => {
  const pathname = usePathname();

  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex w-full min-w-[16vw] flex-1 flex-col gap-4 px-4'>
        {sideLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
            >
              <Button variant={'bordered'} className={`w-full border-0 flex flex-row items-center justify-start cursor-pointer gap-4 p-6 active:scale-95 rounded-lg transition-all ease-linear`}>
                <link.imgURL className={`h-5 w-5 ${isActive ? 'text-indigo-500' : 'text-gray-500/70'}`} />
                <p className={`text-sm max-lg:hidden ${isActive ? 'text-indigo-500' : 'text-gray-500/70'}`}>{link.label}</p>
              </Button>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default LeftSidebar;