'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { profileUser } from '@/lib/api/user/profileUser';
import { useRouter } from 'next/navigation';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async() => {
            try {
                setIsLoading(true);
                const response = await profileUser();

                if (response.error) {
                    if (response.status === 401) {
                        router.push("/auth");
                        return;
                    }
                    console.error('Error fetching user data:', response.message);
                    return;
                }

                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [router]);

    const updateUserData = (newData) => {
        setUserData((prev) => ({
            ...prev,
            ...newData
        }));
    };

    return ( <
        UserContext.Provider value = {
            { userData, updateUserData, isLoading }
        } > { children } <
        /UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};