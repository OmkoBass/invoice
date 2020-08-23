import React from 'react'

import { Admin, Resource } from "react-admin";

import Dashboard from "./Dashboard";
import UserList from "./User/UserList";
import { UserEdit } from "./User/UserEdit";
import { UserCreate } from "./User/UserCreate";
import { InvoiceList } from "./Invoice/InvoiceList";
import { InvoiceEdit } from "./Invoice/InvoiceEdit";

import DataProvider from "./DataProvider";

import AdminPageAuth from "./AdminPageAuth";

function AdminPage() {
    return <Admin
        dataProvider={DataProvider}
        authProvider={AdminPageAuth}
        dashboard={Dashboard}
    >
        <Resource name='users' list={UserList} create={UserCreate} edit={UserEdit}/>
        <Resource name='invoices' list={InvoiceList} edit={InvoiceEdit}/>
    </Admin>
}

export default AdminPage;
