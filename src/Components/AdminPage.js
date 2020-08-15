import React from 'react'

import { Admin, Resource, ListGuesser } from "react-admin";

import axios from 'axios';

import DATABASE from "../Utils";

import AdminPageAuth from "./AdminPageAuth";

function AdminPage() {
    const dataProvider = {
        getList: (resource, params) => {
            return axios.get(`${DATABASE}/get/admin`)
                .then(res => {
                    if(res.data) {
                        return { data: [res.data], total: res.data.length }
                    }
                })
        },
        getMany: (resource, params) => {
            return axios.get(`${DATABASE}/get/admin`)
                .then(res => {
                   if(res.data) {
                       return { data: [res.data] }
                   }
                });
        },
    }

    return <Admin dataProvider={dataProvider} authProvider={AdminPageAuth}>
        <Resource name='users' list={ListGuesser}/>
        <Resource name='invoices' list={ListGuesser}/>
    </Admin>
}

export default AdminPage;
