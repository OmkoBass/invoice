const express = require('express');

const app = express();

// So i can send json
app.use(express.json());

app.listen(5000, () => {
    console.log('LISTENING AT PORT 5000');
})
