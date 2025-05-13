import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import storeContext from '../context/storeContext';
import {useContext} from 'react';

const ProtectRole = ({role}) => {
    const {store} = useContext(storeContext)
    if (store.userInfo.role === role) {
        return <Outlet/>
    } else {
        return <Navigate to='/dashboard/unable-access'/>
    }
};

export default ProtectRole;