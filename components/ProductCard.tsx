
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { addItem } from '@/lib/actions';
interface Props {
  product: Product;
  isWishList: Boolean
}

const ProductCard = ({ product }: Props, isWishList: Boolean) => {
  console.log(product)
  const buyProduct=()=>{
    console.log("Product bought with id"+product._id)
  }
  return (

    <>

      <Link href={`/products/${product._id}`} className="product-card">
        <div className="product-card_img-container">
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            className="product-card_img"
          />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="product-title">{product.title}</h3>

          <div className="flex justify-between">
            <p className="text-black opacity-50 text-lg capitalize">
              {product.category}
            </p>

            <p className="text-black text-lg font-semibold">
              <span>{product?.currency}</span>
              <span>{product?.currentPrice}</span>
            </p>
          </div>
          {
            !isWishList?
            <button
              onClick={addItem}
              type="submit"
              className="searchbar-btn" style={{ width: "40%", marginLeft: "30%" }}>
              ADD +
            </button>:
            <button className='searchbar-btn' style={{ width: "40%", marginLeft: "30%" }} onClick={buyProduct}>
              Buy 
            </button>
          }
        </div>
      </Link>

    </>
  )
}

export default ProductCard