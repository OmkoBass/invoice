import React from 'react'

import {List, Datagrid, TextField, EmailField } from 'react-admin';

export default function UserList(props) {
    return <List {...props}>
        <Datagrid rowClick="edit" key={props.id}>
            <TextField source="id" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="password" />
        </Datagrid>
    </List>
}
