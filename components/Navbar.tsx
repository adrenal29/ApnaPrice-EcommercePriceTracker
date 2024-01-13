"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useSession,signOut } from 'next-auth/react'
import { stringify } from 'querystring'
import { Header } from 'next/dist/lib/load-custom-routes'
const navIcons = [
  { src: '/assets/icons/search.svg', alt: 'search' },
  { src: '/assets/icons/black-heart.svg', alt: 'heart' },
  { src: '/assets/icons/user.svg', alt: 'user' },
]

const Navbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const data = useSession();
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <header className="w-full ">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/icons/logo.svg"
            width={27}
            height={27}
            alt="logo"
          />

          <p className="nav-logo">
            Apna<span className='text-primary'>Price</span>
          </p>
        </Link>

        <div className="flex items-center gap-5">

          {navIcons.map((icon) => (
            <Link href={`/${icon.alt}`}>
            <Image
              key={icon.alt}
              src={icon.src}
              alt={icon.alt}
              width={28}
              height={28}
              className="object-contain"
            />
            </Link>
          ))}
          {
            !data.data ?
            <a href='/login'>
              <button
                type="submit"
                className="searchbar-btn">LOGIN</button>
              </a>
              : 
              <button
                onClick={()=>signOut()}
                type="submit"
                className="searchbar-btn">LOG OUT</button>
          }
        </div>
      </nav>

    </header>
  )
}

export default Navbar