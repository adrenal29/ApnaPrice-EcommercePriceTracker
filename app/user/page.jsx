'use client'
import React, { useEffect } from 'react'
import Sidebar from '@/components/Sidebar';
import Catelogue from '@/components/Catelogue';
import { getProductsById, getUser, getUserProducts } from '@/lib/actions';
import CreateStore from "@/components/CreateStore";
import ViewPurchases from "@/components/ViewPurchases";
import AddItems from "@/components/AddItems"
import { getStoresByOwner } from '@/lib/actions';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const Page = () => {
  const [userIsVendor, setUserIsVendor] = useState(false);
  const [myProducts, setProducts] = useState([])
  const data = useSession();
  const user=data.data;
  const getProducts = async () => {
    try {
      let products = await getUserProducts(JSON.stringify(data?.data?.user?.email));
      
      const productDetails = await Promise.all(
        products?.map(async (el) => {
          try {
            const product = await getProductsById(el);
            return product;
          } catch (error) {
            console.error(`Error fetching product with ID ${el}:`, error);
            throw error;
          }
        })
      );
        setProducts(productDetails)
       console.log(productDetails);
    } catch (error) {
      console.error('Error fetching user products:', error);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const isVendor = await getUser(data.data.user.email);
        setUserIsVendor(isVendor);
        //Call getProducts only if the user is a vendor
       
        if (!isVendor) {
          await getProducts();
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchData();
  }, [user]); 
 
  const [activeOption, setActiveOption] = useState(null);

  const renderComponent = () => {
    switch (activeOption) {
      case 'create-store':
        return <CreateStore user={data?.data?.user?.email} />;
      case 'view-purchases':
        return <ViewPurchases user={data?.data?.user?.email} />;
      case 'add-items':
        return <AddItems user={data?.data?.user?.email} />;
      default:
        return <h4 className="text-gray-500 text-center ">Select an option from the sidebar.</h4>;
    }
  };
  return (
    !userIsVendor ? (
      <>

        {data?.data?.user?.email}
        <main style={{ display: 'flex', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="details">
            {/* <UserProfileForm/> */}
          </div>
          <div className="myItems">
            <p style={{ fontSize: '30px' }}>
              Items added in your wishlist are:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>
            {myProducts?.length > 0 && <Catelogue allProducts={myProducts} isWishList={true}/>}
          </div>
        </main>

      </>) : (
      <>
        <div className="flex h-screen" style={{ marginLeft: "-40px" }}>
          <Sidebar setActiveOption={setActiveOption}  />
          <div className="flex-1 p-4">{renderComponent()}</div>
         
        </div>
      </>
    )
  )
}

export default Page