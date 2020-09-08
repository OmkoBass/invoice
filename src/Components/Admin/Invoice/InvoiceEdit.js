import React from 'react'

import {
    Edit,
    SimpleForm,
    TextInput,
    ReferenceInput,
    SelectInput,
    ArrayInput,
    SimpleFormIterator
} from 'react-admin';

export const InvoiceEdit = props => (
    <Edit { ...props }>
        <SimpleForm>
            <TextInput source="_id" disabled/>
            {/*<ReferenceInput source="_id" reference="id">
                <SelectInput optionText="id" />
            </ReferenceInput>*/ }
            <TextInput source="invoice"/>
            <TextInput source="dateInvoice"/>
            <TextInput source="dateTraffic"/>
            <TextInput source="place"/>
            <TextInput source="fromName"/>
            <TextInput source="firmName"/>
            <TextInput source="street"/>
            <TextInput source="city"/>
            <TextInput source="pib"/>
            <TextInput source="account"/>
            <TextInput source="email"/>
            <TextInput source="toName"/>
            <TextInput source="toAddress"/>
            <TextInput source="toCity"/>
            <ArrayInput source="services">
                <SimpleFormIterator>
                    {/*<ReferenceInput source="_id" reference="s">
                        <SelectInput optionText="id" />
                    </ReferenceInput>*/ }
                    <TextInput source="serviceType"/>
                    <TextInput source="unit"/>
                    <TextInput source="amount"/>
                    <TextInput source="price"/>
                    <TextInput source="total"/>
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="dateCreated" disabled/>
            <ReferenceInput source="username" reference="users" allowEmpty={false}>
                <SelectInput optionText="username" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
