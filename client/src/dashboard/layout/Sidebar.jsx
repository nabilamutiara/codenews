import React from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { MdDashboard} from "react-icons/md";
import { BiNews, BiComment, BiCheckShield } from "react-icons/bi";
import { PiUsersFill } from "react-icons/pi";
import { FaHouseUser, FaRobot } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import {useContext} from 'react';
import storeContext from '../../context/storeContext';
import { IoShareOutline } from 'react-icons/io5';
import { IoMdVideocam } from "react-icons/io";
import logo from '../../assets/codenews.png';

const Sidebar = () => {
    const {pathname} = useLocation();
    //console.log(pathname);
    const {store, dispatch} = useContext(storeContext)
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('newsToken')
        dispatch({type : 'logout', payload:''})
        navigate('/login')
    }

    return (
        <div className='w-[250px] h-screen fixed left-0 top-0 bg-[#ffffff] border border-gray-300'>
            <div className="h-[70px] flex justify-center items-center">
                
                <Link>
                    <img className="w-[160px] h-[24px]" src={logo} alt="" />
                </Link>

            </div>
            <ul className='px-3 flex flex-col gap-y-1 font-medium'>
                {
                    store.userInfo.role === 'admin' ? <>
                    <li>
                        <Link to='/dashboard/admin' className={`px-3 ${pathname === '/dashboard/admin' ? 'bg-sky-400 text-white' : 'bg-white text-[#404040f6]'} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-lg flex gap-x-2 justify-start items-center hover:bg-sky-600 hover:text-white`}>
                            <span className='text-[18px]'><MdDashboard/></span>
                            <span className='text-[18px]'>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/dashboard/writer/add' className={`px-3 ${pathname === '/dashboard/writer/add' ? 'bg-sky-400 text-white' : 'bg-white text-[#404040f6]'} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-lg flex gap-x-2 justify-start items-center hover:bg-sky-600 hover:text-white`}>
                            <span className='text-[18px]'><MdDashboard/></span>
                            <span className='text-[18px]'>Add Writer</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/dashboard/writers' className={`px-3 ${pathname === '/dashboard/writers' ? 'bg-sky-400 text-white' : 'bg-white text-[#404040f6]'} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-lg flex gap-x-2 justify-start items-center hover:bg-sky-600 hover:text-white`}>
                            <span className='text-[18px]'><PiUsersFill/></span>
                            <span className='text-[18px]'>Writers</span>
                        </Link>
                    </li>
                    
                    </> : <>
                    <li>
                        <Link to='/dashboard/writer' className={`px-3 ${pathname === '/dashboard/writer' ? 'bg-sky-400 text-white' : 'bg-white text-[#404040f6]'} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-lg flex gap-x-2 justify-start items-center hover:bg-sky-600 hover:text-white`}>
                            <span className='text-[18px]'><MdDashboard/></span>
                            <span className='text-[18px]'>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/dashboard/news/create' className={`px-3 ${pathname === '/dashboard/news/create' ? 'bg-sky-400 text-white' : 'bg-white text-[#404040f6]'} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-lg flex gap-x-2 justify-start items-center hover:bg-sky-600 hover:text-white`}>
                            <span className='text-[18px]'><IoMdAdd/></span>
                            <span className='text-[18px]'>Add News</span>
                        </Link>
                    </li>

                    <li>
                        <Link to='/' className={`px-3 ${pathname === '/' ? 'bg-sky-400 text-white' : 'bg-white text-[#404040f6]'} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-lg flex gap-x-2 justify-start items-center hover:bg-sky-600 hover:text-white`}>
                            <span className='text-[18px]'><IoMdVideocam /></span>
                            <span className='text-[18px]'>Add Video News</span>
                        </Link>
                    </li>

                     <li>
                        <Link to='/dashboard/paraphraser' className={`px-3 ${pathname === '/dashboard/paraphraser' ? 'bg-sky-400 text-white' : 'bg-white text-[#404040f6]'} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-lg flex gap-x-2 justify-start items-center hover:bg-sky-600 hover:text-white`}>
                        <span className='text-[18px]'><FaRobot /></span>
                        <span className='text-[18px]'>Chatbot</span>
                    </Link>
                    </li>
                    </>
                }
                
                <li>
                    <Link to='/dashboard/news' className={`px-3 ${pathname === '/dashboard/news' ? 'bg-sky-400 text-white' : 'bg-white text-[#404040f6]'} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-lg flex gap-x-2 justify-start items-center hover:bg-sky-600 hover:text-white`}>
                    <span className='text-[18px]'><BiNews/></span>
                    <span className='text-[18px]'>News</span>
                    </Link>
                </li>

                <li>
                    <Link to='/dashboard/comment' className={`px-3 ${pathname === '/dashboard/comment' ? 'bg-sky-400 text-white' : 'bg-white text-[#404040f6]'} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-lg flex gap-x-2 justify-start items-center hover:bg-sky-600 hover:text-white`}>
                    <span className='text-[18px]'><BiComment /></span>
                    <span className='text-[18px]'>Comment</span>
                    </Link>
                </li>


                <li>
                    <Link to='/dashboard/hoaxnews' className={`px-3 ${pathname === '/dashboard/hoaxnews' ? 'bg-sky-400 text-white' : 'bg-white text-[#404040f6]'} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-lg flex gap-x-2 justify-start items-center hover:bg-sky-600 hover:text-white`}>
                    <span className='text-[18px]'><BiCheckShield /></span>
                    <span className='text-[18px]'>News Validator</span>
                    </Link>
                </li>
                
                <li>
                    <Link to='/dashboard/profile' className={`px-3 ${pathname === '/dashboard/profile' ? 'bg-sky-400 text-white' : 'bg-white text-[#404040f6]'} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-lg flex gap-x-2 justify-start items-center hover:bg-sky-600 hover:text-white`}>
                    <span className='text-[18px]'><FaHouseUser/></span>
                    <span className='text-[18px]'>Profile</span>
                    </Link>
                </li>

                

                <li>
                    <div  onClick={logout} className={`px-3 bg-white text-[#404040f6] py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-lg flex gap-x-2 justify-start items-center hover:bg-sky-600 hover:text-white`}>
                    <span className='text-[18px]'><IoShareOutline/></span>
                    <span className='text-[18px]'>Logout</span>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;