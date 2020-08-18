import React from 'react'

import { Card } from "antd";

function Dashboard() {
    return <div>
        <Card>
            <h1>
                Invoice dashboard
            </h1>

            <pre>
                You can view and edit everything from here.
                <br/>
                Users and invoices can be viewed, edited and deleted from here.
            </pre>
        </Card>
    </div>
}

export default Dashboard;
