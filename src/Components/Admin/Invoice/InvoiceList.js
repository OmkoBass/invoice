import React from 'react'

import {
    List,
    Datagrid,
    ReferenceField,
    TextField,
    ArrayField,
    SingleFieldList,
    ChipField,
} from 'react-admin';

export const InvoiceList = props => (
    <List { ...props }>
        <Datagrid rowClick="edit">
            <TextField source="_id"/>
            <TextField source="invoice"/>
            <TextField source="dateInvoice"/>
            {/*<TextField source="dateTraffic"/>
            <TextField source="place"/>*/}
            <TextField source="fromName"/>
            {/*<TextField source="firmName"/>
            <TextField source="street"/>
            <TextField source="city"/>
            <DateField source="pib"/>
            <TextField source="account"/>
            <EmailField source="email"/>*/}
            <TextField source="toName"/>
            {/*<TextField source="toAddress"/>
            <TextField source="toCity"/>
            <TextField source="toPib"/>*/}
            <TextField source="dateCreated"/>
            <TextField source="belongsTo"/>
            <ArrayField source="services">
                <SingleFieldList>
                    <ChipField source="_id"/>
                </SingleFieldList>
            </ArrayField>
        </Datagrid>
    </List>
);
