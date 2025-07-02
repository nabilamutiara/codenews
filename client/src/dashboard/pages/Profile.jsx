import React, { useContext, useState, useEffect} from 'react';
import { FaImage } from "react-icons/fa";
import storeContext from './../../context/storeContext';
import { base_url } from '../../config/config';
import axios from 'axios' 
import toast from 'react-hot-toast'


const Profile = () => {

    const { store } = useContext(storeContext)
     
    const [name, setName] = useState("")
    const [email, setEmail] =  useState("")
    const [message, setMessage] = useState("")
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(""); // Current image URL
    const [preview, setPreview] = useState(null);

    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(`${base_url}/api/profile/${store.userInfo.id}`, {
            headers: {
              'Authorization': `Bearer ${store.token}`
            }
          });
          const { name, email, image } = response.data.user;
          setName(name);
          setEmail(email);
          setImageUrl(image); // Fixed typo from setIageUrl to setImageUrl
        } catch (error) {
          setMessage("Failed to load profile data"); // Fixed case from setMESSAGE to setMessage
        }
      };
      fetchProfile();
    }, [store.userInfo.id, store.token, setName, setEmail, setImageUrl]); // Added setImageUrl to dependencies


    const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
        if (selectedFile) {
            setImage(selectedFile);
            
            // Buat URL preview untuk gambar
            const imageUrl = URL.createObjectURL(selectedFile);
            setPreview(imageUrl);
        }
    };

    // Jangan lupa untuk membersihkan URL objek ketika komponen unmount
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);


    /// Handle Profile Update Add commentMore actions
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name',name);
        formData.append('email',email);
        if (image) {
            formData.append('image',image);
        }

    try {

        const response = await axios.put(`${base_url}/api/update-profile/${store.userInfo.id}`,formData, {
            headers: {
                'Authorization' : `Bearer ${store.token}`
            }
        })
        setMessage("Profile Updated Successfully")
        toast.success(response.data.message)           
        setImageUrl(response.data.updatedUser.image)
    } catch (error) {
        setMessage("Failed to update profile");
     } 

    }


    return (
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-2 mt-5'>
            
            <div className='bg-white p-6 rounded-lg flex items-center shadow-md'>
              <div className="flex-shrink-0 relative">
          {preview ? (
            <div className="relative group">
              <img
                src={preview}
                alt="Preview profile"
                className="w-[150px] h-[150px] rounded-full object-cover border-2 border-gray-200"
              />
              <label
                htmlFor="img"
                className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              >
                <FaImage className="text-white text-2xl" />
                <span className="text-white text-sm mt-1">Change Image</span>
              </label>
            </div>
          ) : (
            <label
              htmlFor="img"
              className="w-[150px] h-[150px] flex flex-col justify-center items-center rounded-full bg-gray-100 border-2 border-dashed border-gray-300 text-gray-500 cursor-pointer hover:bg-gray-200 transition duration-300"
            >
              <FaImage className="text-3xl mb-2" />
              <span className="text-sm">Select Image</span>
            </label>
          )}
          <input
            type="file"
            id="img"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className='ml-6 text-gray-700 flex flex-col space-y-2'>
            <label htmlFor="name" className='text-md font-medium text-gray-600'>Name: </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='text-xl font-semibold' placeholder="Name" />
         
            <label htmlFor="email" className='text-md font-medium text-gray-600'>Email: </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='text-xl font-semibold' placeholder="Email" />
             
            <p className='text-gray-600 text-xl font-bold'>Category: <span className='text-gray-600 text-xl font-bold'> {store.userInfo?.category }</span></p>

        <form onSubmit={handleSubmit}>
            <div className='mt-6'>
                <button type='submit' className='w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-800 transition duration-300'>Update Profile</button> 
            </div>
        </form>
        {message && <p className='text-center mt-4'>{message}</p>}
        </div> 
    </div>


<div className='bg-white p-6 rounded-lg shadow-md text-gray-700'>
  <h2 className='text-lg font-bold text-center mb-5'>Change Password</h2>
  <form >
    <div className='space-y-4'>
        <div>
            <label htmlFor="old_password" className='block text-md font-semibold text-gray-600'>Old Password </label>
            <input type="password" id='old_password' name='old_password'  placeholder='Enter Old Passowrd' className='w-full px-3 py-2 mt-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition duration-300' />
        </div>


        <div>
            <label htmlFor="new_password" className='block text-md font-semibold text-gray-600'>New Password </label>
            <input type="password" id='new_password' name='new_password' placeholder='Enter New Passowrd' className='w-full px-3 py-2 mt-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition duration-300' />
        </div> 
    </div>
    
    <div className='mt-6'>
        <button type='submit' className='w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-800 transition duration-300'>
            Change Password
        </button>

    </div>

  </form>

</div>

    
</div>
    );
};

export default Profile;