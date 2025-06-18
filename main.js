const express = require('express');
const path = require('path');
const { swaggerUi, specs } = require('./utils/swagger');
const userRoutes = require('./routes/index');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/', userRoutes);

app.listen(PORT, () => {
    console.log(`URL: http://localhost:${PORT}`);
});