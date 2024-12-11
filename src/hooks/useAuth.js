import { useEffect, useState } from "react";
import axios from "axios";

const UseAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('https://eshanivaccationbackend.vercel.app/auth/check', {
                    withCredentials: true, 
                });
                setUser(response.data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading };
};

export default UseAuth;
