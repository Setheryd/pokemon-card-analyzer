const axios = require('axios');
const API_BASE = 'https://api.pokemontcg.io/v2/cards';
async function getCardByName(name) {
  const query = `q=name:"${encodeURI(name)}"`;
  const response = await axios.get(API_BASE + `?${query}`);
  if (response.data.data.length === 0) {
    throw new Error('Card not found');
  }
  return response.data.data[0];
}
module.exports = { getCardByName };