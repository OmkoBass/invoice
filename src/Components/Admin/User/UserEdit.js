import React from 'react'

import { Edit, email, required, SimpleForm, TextInput } from 'react-admin';

const validateEmail = [required(), email()];

const UserTitle = ({ record }) => {
    return <span>User: { record ? record.username : '' }</span>
}

export const UserEdit = props => (
    <Edit title={ <UserTitle/> } { ...props }>
        <SimpleForm>
            <TextInput source="username" validate={ [required()] }/>
            <TextInput source="email" validate={ validateEmail }/>
            <TextInput source="password" disabled/>
            <TextInput source="_id" disabled/>
            <TextInput label="From" source="profile.fromName"/>
            <TextInput label="Firm" source="profile.firmName"/>
            <TextInput label="Street" source="profile.street"/>
            <TextInput label="City" source="profile.city"/>
            <TextInput label="PIB" source="profile.pib"/>
            <TextInput label="Bank Account" source="profile.account"/>
            <TextInput label="Email" source="profile.email"/>
        </SimpleForm>
    </Edit>
);
