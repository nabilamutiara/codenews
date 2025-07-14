import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './dashboard/pages/Login';
import MainLayout from './dashboard/layout/MainLayout';
import Adminindex from './dashboard/pages/Adminindex';
import ProtectDashboard from './middleware/ProtectDashboard';
import ProtectRole from './middleware/ProtectRole';
import Unable from './dashboard/pages/Unable';
import Profile from './dashboard/pages/Profile';
import News from './dashboard/pages/News';
import AddWriter from './dashboard/pages/AddWriter';
import Writers from './dashboard/pages/Writers';
import WriterIndex from './dashboard/pages/WriterIndex';
import CreateNews from './dashboard/pages/CreateNews';
import React, {useContext} from 'react';
import storeContext from './context/storeContext';
import EditWriter from './dashboard/pages/EditWriter';
import EditNews from './dashboard/pages/EditNews';
import Paraphraser from './dashboard/pages/Paraphraser';
import Comment from './dashboard/components/Comment';
import HoaxNews from './dashboard/components/HoaxNews';
import VideoUpload from './dashboard/pages/VideoUpload';



function App() {

  const {store} = useContext(storeContext)

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />

        
        <Route path="/dashboard" element={<ProtectDashboard />}>
          <Route path="" element={<MainLayout />}>
            <Route path="" index element={store.userInfo.role === 'admin' ? <Navigate to='/dashboard/admin'/> : <Navigate to='/dashboard/writer'/>} />
            <Route path="unable-access" element={<Unable />} />
            <Route path="profile" element={<Profile />} />
            <Route path="comment" element={<Comment />} />
            <Route path="hoaxnews" element={<HoaxNews />} />
            <Route path="news" element={<News />} />
            <Route path='' element={<ProtectRole role='admin'/>}>
              <Route path="admin" element={<Adminindex />} />
              <Route path="writer/add" element={<AddWriter />} />
              <Route path="writers" element={<Writers />} />
              <Route path="writer/edit/:id" element={<EditWriter />} />
            </Route>
            <Route path='' element={<ProtectRole role='writer'/>}>
              <Route path="writer" element={<WriterIndex />} />
              <Route path="news/create" element={<CreateNews />} />
              <Route path="video/upload" element={<VideoUpload />} />
              
              <Route path="news/edit/:news_id" element={<EditNews />} />
              <Route path="paraphraser" element={<Paraphraser />} />
              
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
