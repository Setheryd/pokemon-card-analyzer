const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer({ dest: 'uploads/' });
app.get('/', (req, res) => res.send('Pokémon Card Analyzer API'));
app.use('/analyze', require('./routes/analyze'));
app.use('/card', require('./routes/cards'));
app.listen(3000, () => console.log('Server running on port 3000'));