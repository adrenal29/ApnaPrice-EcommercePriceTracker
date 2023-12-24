
import React from 'react'
// import { getSession } from 'next-auth/react';
//  import { useSession } from 'next-auth/react';
// import UserProfileForm from "@/components/UserProfileForm"
import Catelogue from '@/components/Catelogue';
import { getUserProducts } from '@/lib/actions';
import Image from 'next/image';

const Page = async( ) => {
  const myProducts=await getUserProducts('mohit29code@gmail.com');
  
  return (
    <>
      <main  style={{ display: 'flex', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
      <div className="details">
      {/* <UserProfileForm/> */}
      </div>
      <div className="myItems">
      <p style={{fontSize:'30px'}}>
              Items added in your wishlist are:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>
        <Catelogue allProducts={myProducts}/>
      </div>
      </main>
    </>
  )
}

export default Page