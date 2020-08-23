import React from 'react'

import { List, Datagrid, TextField, EmailField, Filter, SearchInput } from 'react-admin';

const UserFilter = (props) => (
    <Filter { ...props }>
        <SearchInput source='username' awlaysOn/>
    </Filter>
)

export default function UserList (props) {
    return <List filters={ <UserFilter/> } { ...props }>
        <Datagrid rowClick="edit" key={ props.id }>
            <TextField source="id"/>
            <TextField source="username"/>
            <EmailField source="email"/>
            <TextField source="password"/>
        </Datagrid>
    </List>
}
