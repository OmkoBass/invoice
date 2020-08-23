import React from 'react'

import { Create, SimpleForm, TextInput } from 'react-admin';

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="username" required />
            <TextInput source="email" required />
            <TextInput source="password" required />
            <TextInput label="From" source="profile.fromName" />
            <TextInput label="Firm" source="profile.firmName" />
            <TextInput label="Street" source="profile.street" />
            <TextInput label="City" source="profile.city" />
            <TextInput label="PIB" source="profile.pib" />
            <TextInput label="Bank Account" source="profile.account" />
            <TextInput label="Email" source="profile.email" />
        </SimpleForm>
    </Create>
);
