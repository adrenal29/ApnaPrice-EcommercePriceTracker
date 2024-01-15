import React from 'react'
const ProductBox = ({ product }) => (
  <div className='border border-solid-black-500 p-3 mb-4 mx-1'>
    <h4 className='text-lg font-semibold'>{product.name}</h4>
    <p className='text-sm'>{product.description}</p>
    <button className='mt-2 text-xs bg-blue-500 p-1 rounded text-white'>Add to Cart</button>
  </div>
);
const Layout2= (props) => {
  const products = [
    // Assuming you have an array of products, replace this with your actual data
    { name: 'Product 1', description: 'Description for Product 1' },
    { name: 'Product 2', description: 'Description for Product 2' },
    { name: 'Product 3', description: 'Description for Product 3' },
    { name: 'Product 1', description: 'Description for Product 1' },
    { name: 'Product 2', description: 'Description for Product 2' },
    { name: 'Product 3', description: 'Description for Product 3' },
  ];
  return (
    <div className='p-2  max-w-2xl mx-auto'>
      Layout1
      <div className='border border-solid-black-500 '>
      <h2 className='p-10 pb-0 text-xl mx-auto text-center my-2'>Welcome to {props.data.storeName} online shop</h2>
      <div className='flex flex-wrap justify-around'>
          {products.map((product, index) => (
            <ProductBox key={index} product={product} />
          ))}
        </div>
        {/* <h2 className='p-10 pb-0 text-xl mx-auto text-center'>Welcome to {props.data.storeName} online shop</h2>
        <div className='text-center'>
          <button className='my-2 text-xs  bg-red-500 p-1 rounded text-white'>Shop Now</button>
          <button className='text-xs ml-2 bg-violet-500 p-1 rounded text-white'>Contact Us</button>
        </div> */}
        <img src={props.imageURL} alt="No banner added" className='h-40 w-full object-cover'></img>
        
        <footer className="text-center py-4 bg-gray-200 my-2">
          <p className="text-sm">{props.data.storeAddress}</p>
        </footer>
      </div>
    </div>
  )
}

export default Layout2;