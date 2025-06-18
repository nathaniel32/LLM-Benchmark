const express = require('express');
const path = require('path');
const { swaggerUi, specs } = require('./utils/swagger');
const userController = require('./controllers/userController');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.post('/users', userController.createUser);
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

app.listen(PORT, () => {
    console.log(`URL: http://localhost:${PORT}`);
});