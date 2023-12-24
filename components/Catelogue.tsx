import React from 'react'
import ProductCard from './ProductCard'
const Catelogue = (props:any) => {
  console.log(props.allProducts,"d")
  return (

    <>
     <div className="flex flex-wrap gap-x-8 gap-y-16">
          {props.allProducts?.map((product:any) => (
      <ProductCard key={product._id} product={product} />
    ))}
    </div>
    </>
  )
}

export default Catelogue;