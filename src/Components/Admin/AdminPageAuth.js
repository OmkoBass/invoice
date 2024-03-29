import axios from 'axios';

import DATABASE from "../../Utils";

const AdminPageAuth = {
    login: ({ username, password }) =>  {
        return axios.post(`${DATABASE}/login/admin`, {
            username: username,
            password: password
        }).then(res => {
            if(res.data === 401 || res.data === 400)
                throw new Error('Check your credentials')

            localStorage.setItem('username', res.data);
            return Promise.resolve();
        });
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('username');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem('username')
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};

export default AdminPageAuth;
