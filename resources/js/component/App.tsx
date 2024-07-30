import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../component/context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Routes from './routes/Routes';
import { PostProvider } from './context/PostContext';
import { RequestProvider } from './context/RequestContext';
import { NotificationProvider } from './context/NotificationContext';

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <PostProvider>
                    <RequestProvider>
                        <NotificationProvider>
                                <TaskProvider>
                                    <Routes />
                                </TaskProvider>
                        </NotificationProvider>
                    </RequestProvider>
                </PostProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
