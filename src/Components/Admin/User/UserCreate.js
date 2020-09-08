import React from 'react'

import { Create, SimpleForm, TextInput, required, minLength, email } from 'react-admin';

const validatePassword = [required(), minLength(8)];
const validateEmail = [required(), email()];

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="username" validate={[required()]} />
            <TextInput source="email" validate={validateEmail} />
            <TextInput source="password" validate={validatePassword} />
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
