import React, { useEffect, useState } from 'react'
import { getStoresByOwner } from '@/lib/actions'
const AddItems = ({user}) => {
  const [myStores,setStores]=useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
  });
  console.log(user)
  useEffect(()=>{
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
  },[user])
  const handleSelectChange = (e) => {
    console.log(e.target.value)
    setSelectedStore(e.target.value);
  };
  const handleAddProduct = () => {
    // TODO: Implement logic to add the new product to the selected store
    console.log('Adding product:', newProduct);
  };
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  return (
    <div>
      <select onChange={handleSelectChange} value={selectedStore ? selectedStore.id : ''}>
        <option value="" disabled>Select a store</option>
        {myStores.map((el) => (
          <option key={el.id} value={el.id}>
            {el.storeName}
          </option>
        ))}
      </select>
        {selectedStore && (
       <div>
       <h2 className="text-lg font-semibold mb-2 mt-6">Selected Store: {selectedStore}</h2>
       <div className="bg-white rounded p-4 shadow-md w-1/2">
         <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
         <label className="block mb-2">
           Product Name:
           <input
             className="border border-gray-300 rounded p-2 w-full"
             type="text"
             name="name"
             value={newProduct.name}
             onChange={handleNewProductChange}
           />
         </label>
         <label className="block mb-2">
           Product Category:
           <input
             className="border border-gray-300 rounded p-2 w-full"
             type="text"
             name="category"
             value={newProduct.category}
             onChange={handleNewProductChange}
           />
         </label>
         <label className="block mb-2">
           Product Price:
           <input
             className="border border-gray-300 rounded p-2 w-full"
             type="text"
             name="price"
             value={newProduct.price}
             onChange={handleNewProductChange}
           />
         </label>
         <label className="block mb-2">
           Product Image:
           <input
             className="border border-gray-300 rounded p-2 w-full"
             type="file"
             name="image"
             onChange={handleNewProductChange}
           />
         </label>
         <button
           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
           onClick={handleAddProduct}
         >
           Add Product
         </button>
       </div>
     </div>
      )}
    </div>
  )
}

export default AddItems