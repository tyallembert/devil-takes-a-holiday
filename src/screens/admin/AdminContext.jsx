import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../../utils/supabase.js";

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Logout function
    const logout = async () => {
        try {
            await supabase.auth.signOut();
            setSession(null);
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    };

    return (
        <AdminContext.Provider
            value={{
                session,
                logout, // Provide logout function to the context
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("useAdmin must be used within an AdminProvider");
    }
    return context;
};
