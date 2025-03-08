const express = require('express');
const router = express.Router();
const { getCardByQuery } = require('../services/pokemonTcg');

router.get('/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const set = req.query.set;
    const type = req.query.type;
    const rarity = req.query.rarity;

    let query = `name:${name}`;
    if (set) query += ` set.id:${set}`; // Use set.id for IDs like "base1"
    if (type) query += ` types:${type}`;
    if (rarity) query += ` rarity:${rarity}`;

    console.log('Query:', query); // Log the query for debugging
    const card = await getCardByQuery(query); // Call the function directly
    res.json(card);
  } catch (error) {
    console.error('Error fetching card:', error); // Log the actual error
    res.status(500).json({ error: 'Card not found' });
  }
});

module.exports = router;