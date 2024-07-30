import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiService from '../services/apiService';

export interface Role {
    rolename: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    role: Role;
    verified: boolean;
}

interface AuthContextProps {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    fetchAllUsers: (page: number) => Promise<{ data: User[], last_page: number }>;
    acceptUser: (userId: number, verified: boolean) => Promise<boolean>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (token) {
                    apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }
                const response = await apiService.get('/current-user', { withCredentials: true });
                setUser(response.data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await apiService.post('/login', { email, password }, { withCredentials: true });
            setUser(response.data.user);
            apiService.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            localStorage.setItem('authToken', response.data.token);
            return true;
        } catch (error) {
            console.error("Login error:", error);
            setUser(null);
            return false;
        }
    };

    const logout = async (): Promise<void> => {
        try {
            await apiService.post('/logout', {}, { withCredentials: true });
            setUser(null);
            delete apiService.defaults.headers.common['Authorization'];
            localStorage.removeItem('authToken');
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const fetchAllUsers = async (page: number): Promise<{ data: User[], last_page: number }> => {
        try {
            const response = await apiService.get(`/users?page=${page}`, { withCredentials: true });
            return {
                data: response.data.users.data, // Adjust to match your API response structure
                last_page: response.data.users.last_page
            };
        } catch (error) {
            console.error("Failed to fetch users:", error);
            return { data: [], last_page: 1 };
        }
    };

    const acceptUser = async (userId: number, verified: boolean): Promise<boolean> => {
        try {
            const response = await apiService.post(`/updateUsers/${userId}`, { verified }, { withCredentials: true });
            return response.status === 200;
        } catch (error) {
            console.error("Error accepting user:", error);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, fetchAllUsers, acceptUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
