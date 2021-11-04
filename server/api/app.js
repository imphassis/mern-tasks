const express = require('express');
const { error } = require('./middlewares');
const { taskRouter, userRouter } = require('./routes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(taskRouter);
// app.use(express.static(`${__dirname}uploads/`));
// app.post('/users', users.createUser);
// app.post('/login', users.login);
// app.post('/recipes', auth, recipes.createRecipe);
// app.get('/recipes', recipes.getAllRecipes);
// app.get('/recipes/:id', recipes.getRecipeById);
// app.delete('/recipes/:id', auth, recipes.deleteRecipe);
// app.put('/recipes/:id/image/', upload.single('image'), recipes.uploadImage);
// app.put('/recipes/:id', auth, recipes.updateRecipe);
// app.get('/images/:id', recipes.getImage);
app.use(error);

module.exports = app;
