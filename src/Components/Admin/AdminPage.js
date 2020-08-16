import React from 'react'

import { Admin, Resource } from "react-admin";

import UserList from "./UserList";
import { InvoiceList } from "./InvoiceList";

import DataProvider from "./DataProvider";

import AdminPageAuth from "./AdminPageAuth";

function AdminPage() {
    return <Admin dataProvider={DataProvider} authProvider={AdminPageAuth}>
        <Resource name='users' list={UserList}/>
        <Resource name='invoices' list={InvoiceList}/>
    </Admin>
}

export default AdminPage;
