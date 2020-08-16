import React from 'react'

import { Edit, SimpleForm, TextInput } from 'react-admin';

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="username" />
            <TextInput source="email" />
            <TextInput source="password" disabled />
            <TextInput source="_id" disabled />
            <TextInput label="From" source="profile.fromName" />
            <TextInput label="Firm" source="profile.firmName" />
            <TextInput label="Street" source="profile.street" />
            <TextInput label="City" source="profile.city" />
            <TextInput label="PIB" source="profile.pib" />
            <TextInput label="Bank Account" source="profile.account" />
            <TextInput label="Email" source="profile.email" />
        </SimpleForm>
    </Edit>
);
