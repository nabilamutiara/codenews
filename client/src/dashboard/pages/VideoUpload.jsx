import React, { useState, useContext } from 'react';
import axios from 'axios';
import { base_url } from '../../config/config';
import storeContext from '../../context/storeContext';
import toast from 'react-hot-toast';

const VideoUpload = () => {
    const { store } = useContext(storeContext);
    const [loader, setLoader] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState(null);
    const [preview, setPreview] = useState('');

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideo(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !video) {
            toast.error('Please fill all fields');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('video', video);

        try {
            setLoader(true);
            const { data } = await axios.post(`${base_url}/api/videos/add`, formData, {
                headers: {
                    'Authorization': `Bearer ${store.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success(data.message);
            setTitle('');
            setDescription('');
            setVideo(null);
            setPreview('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error uploading video');
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">Upload Video</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-md font-medium text-gray-600 mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md border-gray-300 focus:border-blue-500 outline-none transition h-10"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-md font-medium text-gray-600 mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md border-gray-300 focus:border-blue-500 outline-none transition"
                        rows="4"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-md font-medium text-gray-600 mb-2">Video</label>
                    {preview && (
                        <div className="mb-2">
                            <video controls className="max-w-full h-auto rounded-md" src={preview} />
                        </div>
                    )}
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                        required
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={loader}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                    {loader ? 'Uploading...' : 'Upload Video'}
                </button>
            </form>
        </div>
    );
};

export default VideoUpload;