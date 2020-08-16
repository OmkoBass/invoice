import React from 'react'

import {List, Datagrid, TextField, ReferenceField, EmailField, NumberField } from 'react-admin';

export default function UserList(props) {
    return <List {...props}>
        <Datagrid rowClick="edit" key={props._id}>
            <TextField source="_id" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="password" />
        </Datagrid>
    </List>
}
