import React from 'react'

import { Admin, Resource } from "react-admin";

import Dashboard from "./Dashboard";
import UserList from "./UserList";
import { UserEdit } from "./UserEdit";
import { InvoiceList } from "./InvoiceList";
import { InvoiceEdit } from "./InvoiceEdit";

import DataProvider from "./DataProvider";

import AdminPageAuth from "./AdminPageAuth";

function AdminPage() {
    return <Admin
        dataProvider={DataProvider}
        authProvider={AdminPageAuth}
        dashboard={Dashboard}
    >
        <Resource name='users' list={UserList} edit={UserEdit}/>
        <Resource name='invoices' list={InvoiceList} edit={InvoiceEdit}/>
    </Admin>
}

export default AdminPage;
