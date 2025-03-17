import React from 'react';
import { Link, useLocation} from 'react-router-dom';

const Sidebar = () => {
    const {pathname} = useLocation();
    console.log(pathname);
    return (
        <div className='w-[250px] h-screen fixed left-0 top-0 bg-[#dadaff]'>
            <div className="h-[70px] flex justify-center items-center">
                <Link>
                    <img className="w-[190px] h-[35px]" src="https://i.ibb.co.com/7JwVHXV9/mainlogo.png" alt="" />
                </Link>

            </div>
            <ul className='px-3 flex flex-col gap-y-1 font-medium'>
                <li>
                    <Link to='/dashboard/admin' className={`px-3 ${pathname === '/dashboard/admin' ? 'bg-indigo-500 text-white' : 'bg-white text-[#404040f6]'}`}>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;