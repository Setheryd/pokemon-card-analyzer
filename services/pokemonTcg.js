const axios = require('axios');
require('dotenv').config();

const API_BASE_URL = 'https://api.pokemontcg.io/v2';
const API_KEY = process.env.POKEMON_TCG_API_KEY;

async function getCardByQuery(query) {
    try {
      const response = await axios.get(`${API_BASE_URL}/cards`, {
        headers: { 'X-Api-Key': API_KEY },
        params: { q: query }
      });
      if (response.data.data.length === 0) {
        throw new Error('No card found');
      }
      return response.data.data[0]; // Returns the first matching card
    } catch (error) {
      throw error;
    }
  }
  
  module.exports = { getCardByQuery };