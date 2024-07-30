import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../views/Login';
import Register from '../views/Register';
import AdminHome from '../views/AdminHome';
import UserHome from '../views/UserHome';
import PrintingHome from '../views/PrintingHome';
import GraphicHome from '../views/GraphicHome';
import CreatePostForm from '../../component/views/forms/Admin/CreatePostForm';

import ProtectedRoutes from './ProtectedRoutes';
import DisplayForm from '../../component/views/forms/Admin/displayForm';
import EditPostForm from '../views/forms/Admin/EditPostForm';
import UserListForm from '../views/forms/Admin/UserListForm';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes for Admin */}
            <Route element={<ProtectedRoutes roles={['Admin']} />}>
                <Route path="/admin" element={<AdminHome />} />
                <Route path="/users" element={<UserListForm />} />
            </Route>

            {/* Protected routes for User */}
            <Route element={<ProtectedRoutes roles={['User']} />}>
                <Route path="/user" element={<UserHome />} />
            </Route>

            {/* Protected routes for Graphic Designer */}
            <Route element={<ProtectedRoutes roles={['Graphic Designer']} />}>
                <Route path="/graphic-designer" element={<GraphicHome />} />
            </Route>

            {/* Protected routes for Printing Shop */}
            <Route element={<ProtectedRoutes roles={['Printing Shop']} />}>
                <Route path="/printing-shop" element={<PrintingHome />} />
            </Route>

            {/* Routes accessible by multiple roles */}
            <Route element={<ProtectedRoutes roles={['Admin', 'User', 'Graphic Designer', 'Printing Shop']} />}>
                <Route path="/allposts" element={<DisplayForm />} />
                <Route path="/posts/:postId" element={<EditPostForm/>} />
            </Route>

            <Route element={<ProtectedRoutes roles={['Admin', 'Graphic Designer', 'Printing Shop']} />}>
                <Route path="/posts" element={<CreatePostForm />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
