const express = require('express');
const users = require('./controllers/userController');
const recipes = require('./controllers/recipesController');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const upload = require('./middlewares/uploadFiles');
const userRouter = require('./routes/userRouter');

const app = express();
app.use(express.json());
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use(userRouter);
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
