import React from 'react'
import { useEffect,useState } from 'react';
import { getStoresByOwner } from '@/lib/actions';
import Link from 'next/link';
const ViewStore = ({user}) => {
    const [stores,setStores]=useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const myStore = await getStoresByOwner(user);
            console.log(myStore)
            setStores(myStore);
          } catch (error) {
            console.error('Error fetching data:', error.message);
          }
        };
        fetchData();
      }, [user])
  return (
    <div className='p-4'>
        View your Store
        {
            stores.map((s)=>{
                return (<Link href={`/stores/${s._id}`}><h1 className='m-4'>{s.storeName}</h1></Link>)
            })
        }
    </div>
  )
}

export default ViewStore