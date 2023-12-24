import React from 'react'
import Catelogue from '@/components/Catelogue'
import Search from '@/components/Search';
import { getAllProducts } from '@/lib/actions';
const page = async ({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) => {
    const query = searchParams?.query || "all";
    const currentPage = Number(searchParams?.page) || 1;
    const allProducts = await getAllProducts(query)
  return (
    <>
    <Search/>
    <Catelogue allProducts={allProducts}/>
    </>
  )
}

export default page