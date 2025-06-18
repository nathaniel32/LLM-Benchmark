const express = require('express');
const path = require('path');
const { swaggerUi, specs } = require('./utils/swagger');
const categoryRoute = require('./routes/categoryRoute');
const inputRoute = require('./routes/inputRoute');
const outputRoute = require('./routes/outputRoute');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/', categoryRoute);
app.use('/', inputRoute);
app.use('/', outputRoute);

app.listen(PORT, () => {
    console.log(`URL: http://localhost:${PORT}`);
});