import React, { useEffect, useState } from 'react';

import firebase from '../firebase';

export const AuthContext = React.createContext(undefined, undefined);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    return <AuthContext.Provider value={{ currentUser, profileData, setProfileData }}>
        { children }
    </AuthContext.Provider>
};
