import React from 'react'

import { Admin, Resource, ListGuesser } from "react-admin";

import DataProvider from "./DataProvider";

import AdminPageAuth from "./AdminPageAuth";

function AdminPage() {
    return <Admin dataProvider={DataProvider} authProvider={AdminPageAuth}>
        <Resource name='users' list={ListGuesser}/>
        {/*<Resource name='invoices' list={ListGuesser}/>*/}
    </Admin>
}

export default AdminPage;
