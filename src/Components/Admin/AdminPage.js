import React from 'react'

import { Admin, Resource, EditGuesser } from "react-admin";

import UserList from "./UserList";
import { UserEdit } from "./UserEdit";
import { InvoiceList } from "./InvoiceList";

import DataProvider from "./DataProvider";

import AdminPageAuth from "./AdminPageAuth";

function AdminPage() {
    return <Admin dataProvider={DataProvider} authProvider={AdminPageAuth}>
        <Resource name='users' list={UserList} edit={UserEdit}/>
        <Resource name='invoices' list={InvoiceList}/>
    </Admin>
}

export default AdminPage;
