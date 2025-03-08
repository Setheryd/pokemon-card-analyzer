const express = require('express');
const router = express.Router();
const pokemonTcgService = require('../services/pokemonTcg');

router.get('/:name', async (req, res) => {
  try {
    const card = await pokemonTcgService.getCardByName(req.params.name);
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: 'Card not found' });
  }
});

module.exports = router;