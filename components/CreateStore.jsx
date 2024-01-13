import React, { useState } from 'react';
import { createStore } from '@/lib/actions';
import Layout1 from "@/components/Layouts/Layout1";
import Layout2 from "@/components/Layouts/Layout2";

const StoreForm = ({ user }) => {
  const [imageURL, setImageURL] = useState('');
  console.log(user)
  const [formData, setFormData] = useState({
    storeOwner: user,
    storeName: '',
    storeAddress: '',
    storeCategory: '',
    storeBanner: '',
    storeLayout: 'layout1', // Default layout selection
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Set the image URL to the base64-encoded data URL
        setImageURL(reader.result);
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
      setFormData({ ...formData, [storeBanner]: imageURL, })
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const form = e.currentTarget;
    console.log(form)
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');
    console.log(fileInput)
    const imgData = new FormData();
    for ( const file of fileInput.files ) {
      imgData.append('file', file);
    }
    imgData.append('upload_preset', 'ApnaPrice');
    const data = await fetch('https://api.cloudinary.com/v1_1/ddxxaqjkc/image/upload', {
      method: 'POST',
      body: imgData
    }).then(r =>r.json())
  console.log(data.url)
   formData['storeBanner']=data.url
    console.log(formData);
     await createStore(formData);
  };

  return (
    <div className='flex mb-10 ml-20'>
      <div className=" p-2 bg-white rounded-md shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-6">Create a New Store</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="storeName" className="block text-sm font-medium text-gray-600">
              Store Name
            </label>
            <input
              type="text"
              id="storeName"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
       

      
            <label htmlFor="storeAddress" className="block text-sm font-medium text-gray-600">
              Store Address
            </label>
            <input
              type="text"
              id="storeAddress"
              name="storeAddress"
              value={formData.storeAddress}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
      

            <label htmlFor="storeCategory" className="block text-sm font-medium text-gray-600">
              Store Category
            </label>
            <input
              type="text"
              id="storeCategory"
              name="storeCategory"
              value={formData.storeCategory}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />

          
            <label htmlFor="storeBanner" className="block text-sm font-medium text-gray-600">
              Store Banner
            </label>
            <input
              type="file"
              id="storeBanner"
              name="file"
              onChange={handleImageUpload}
              className="mt-1 p-2 w-full border rounded-md"
              accept="image/*"

            />
        
          
            <label htmlFor="storeLayout" className="block text-sm font-medium text-gray-600">
              Store Layout
            </label>
            <div className="flex items-center">
              <label className="mr-4">
                <input
                  type="radio"
                  id="layout1"
                  name="storeLayout"
                  value="layout1"
                  checked={formData.storeLayout === 'layout1'}
                  onChange={handleChange}
                  className="hidden"
                />
                <img
                  src="/layout1.jpg" // Replace with the actual path to your layout images
                  alt="Layout 1"
                  className={`cursor-pointer h-20 w-20 border ${formData.storeLayout === 'layout1' ? 'border-blue-500' : 'border-gray-300'
                    }`}
                />
              </label>
              <label>
                <input
                  type="radio"
                  id="layout2"
                  name="storeLayout"
                  value="layout2"
                  checked={formData.storeLayout === 'layout2'}
                  onChange={handleChange}
                  className="hidden"
                />
                <img
                  src="/layout2.jpg" // Replace with the actual path to your layout images
                  alt="Layout 2"
                  className={`cursor-pointer h-20 w-20 border ${formData.storeLayout === 'layout2' ? 'border-blue-500' : 'border-gray-300'
                    }`}
                />
              </label>
            </div>
     

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Create Store
          </button>
        </form>

      </div>
      {formData.storeLayout == 'layout1' ? <Layout1 className='flex-grow' data={formData} imageURL={imageURL} /> : <Layout2 data={formData} imageURL={imageURL} />}

    </div>
  );
};

export default StoreForm;
