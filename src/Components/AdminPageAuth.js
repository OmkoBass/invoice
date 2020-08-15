import axios from 'axios';

import DATABASE from "../Utils";

const AdminPageAuth = {
    login: ({ username, password }) =>  {
        axios.post(`${DATABASE}/login/admin`, {
           username: username,
           password: password
        }).then(res => {
            if(res.data === 401 || res.data === 400)
                throw new Error('Check your credentials');

            return res.data.json();
        }).then(({ token }) => {
            localStorage.setItem('User', token);

            console.log(localStorage.getItem('User'));
        })
    },
    /*login: ({ username, password }) =>  {
        const request = new Request(`${DATABASE}/login/admin`, {
            method: 'POST',
            body: {
                username: username,
                password: password
            },
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error('Check your credentials!');
                }
                return response.json();
            })
            .then(({ token }) => {
                localStorage.setItem('User', token);
            });
    },*/
    logout: () => {
        localStorage.removeItem('User');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('User');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        if(localStorage.getItem('User'))
            return Promise.resolve();
        return Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};

export default AdminPageAuth;
