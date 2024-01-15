import React, { useEffect, useState } from 'react'
import { getStoresByOwner } from '@/lib/actions'
import { addItemtoStore } from '@/lib/actions';
const AddItems = ({ user }) => {
  const [myStores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: '',
    currentPrice: '',
    currency:'Rs',
    originalPrice:'0',
    url:  `https://${Math.random()}`,
    image: imageURL,
    stocks: 1,
  });
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
  const handleSelectChange = (e) => {
    console.log(e.target.value)
    setSelectedStore(e.target.value);
  };
  const handleImageUpload = (e) => {

    const file = e.target.files[0];
    console.log(file)
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Set the image URL to the base64-encoded data URL
        setImageURL(reader.result);
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
      setNewProduct({ ...newProduct, [imageURL]: imageURL, })
    }
  }
  const handleAddProduct = async (e) => {
    // TODO: Implement logic to add the new product to the selected store
    e.preventDefault();
    const form = e.currentTarget;
    console.log(form)
    console.log(newProduct)
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');
    console.log(fileInput)
    const imgData = new FormData();
    for (const file of fileInput.files) {
      imgData.append('file', file);
    }
    imgData.append('upload_preset', 'ApnaPrice');
    console.log(newProduct)
    const data = await fetch('https://api.cloudinary.com/v1_1/ddxxaqjkc/image/upload', {
      method: 'POST',
      body: imgData
    }).then(r => r.json())
    console.log(data.url)
    setNewProduct({ ...newProduct, image: data.url, })
    console.log(selectedStore,newProduct)
    await addItemtoStore(selectedStore,{ ...newProduct, image: data.url, });
    console.log('Added  product:', newProduct);
  };
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
    console.log(newProduct)
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
            <form onSubmit={handleAddProduct}> 
            <label className="block mb-2">
              Product Name:
              <input
                className="border border-gray-300 rounded p-2 w-full"
                type="text"
                name="title"
                value={newProduct.title}
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
                name="currentPrice"
                value={newProduct.cuurentPrice}
                onChange={handleNewProductChange}
              />
            </label>
            <label className="block mb-2">
              Product Image:
              <input
                className="border border-gray-300 rounded p-2 w-full"
                type="file"
                name="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
            <label className="block mb-2">
              Number of Items(Stock):
             
              <input
                className="border border-gray-300 rounded p-2 w-full"
                type="text"
                name="stocks"
                onChange={handleNewProductChange}
              />
            </label>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              type='submit'
            >
              Add Product
            </button>
            </form>
          </div>
        
        </div>
      )}
    </div>
  )
}

export default AddItems