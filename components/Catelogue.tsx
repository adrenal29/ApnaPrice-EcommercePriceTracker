
import { getProductsById } from '@/lib/actions';
import React from 'react'
import ProductCard from './ProductCard'
const Catelogue = (props: any) => {
  console.log(props.allProducts, "d")
  var items = props.allProducts;
  return (

    <>
      <div className="flex flex-wrap gap-x-8 gap-y-16">
        {items?.map((product: any) => (
          <ProductCard key={product._id} product={product} isWishList={props.isWishList}/>
        ))}
      </div>

    </>
  )
}

export default Catelogue;