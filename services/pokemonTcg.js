const axios = require('axios');
require('dotenv').config();

const API_BASE_URL = 'https://api.pokemontcg.io/v2';
const API_KEY = process.env.POKEMON_TCG_API_KEY;

async function getCardByName(name) {
  try {
    const response = await axios.get(`${API_BASE_URL}/cards`, {
      headers: { 'X-Api-Key': API_KEY },
      params: { q: `name:${name}` }
    });
    if (response.data.data.length === 0) {
      throw new Error('Card not found');
    }
    return response.data.data[0];
  } catch (error) {
    throw error;
  }
}

module.exports = { getCardByName };