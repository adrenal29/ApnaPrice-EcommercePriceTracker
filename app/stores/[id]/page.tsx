import { getStore } from '@/lib/actions';
import React from 'react'

type Props = {
    params: { id: string }
  }
  
const page = async ({ params: { id } }: Props) =>{
    const store: any = await getStore(id);
    console.log(store)
  return (
    <>
    {
      store?.storeLayout=="layout1"?
      <>
      <h2 className='text-5xl mx-auto text-center mt-8'> Welcome to <span className='text-red-500'> {store.storeName} </span>online store</h2>
      <div className='text-center mt-6'>
          <button className='my-2 text-xl  bg-red-500 p-2 rounded text-white'>Shop Now</button>
          <button className='text-xl ml-2 bg-violet-500 p-2 rounded text-white'>Contact Us</button>
      </div>
      <img src={store.storeBanner} alt=""  className='h-60 w-full object-cover rounded-lg mt-4 '/>
      <h3 className='text-3xl mt-6'>Trending items in {store.storeCategory}</h3>
      {store.items==null?<div className='h-1/2'>Nothing in the store </div>:<div></div>}
      <footer className="text-center py-4 bg-gray-200 fixed bottom-0 w-full">
          <p className="text-sm">{store.storeAddress} </p>
        </footer>
      </>:
      <>Layout2</>
    }
    </>
  )
}

export default page