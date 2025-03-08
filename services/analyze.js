const tesseract = require('tesseract.js');
const pokemonTcgService = require('./pokemonTcg');
const conditionAssessor = require('./conditionAssessor');
const imageProcessing = require('../utils/imageProcessing');
async function analyzeCard(imagePath) {
  const preprocessedPath = await imageProcessing.preprocessImage(imagePath);
  const { data: { text } } = await tesseract.recognize(preprocessedPath);
  const cardName = extractCardName(text);
  let card;
  try {
    card = await pokemonTcgService.getCardByName(cardName);
  } catch (error) {
    throw new Error('Card not found');
  }
  const condition = await conditionAssessor.assessCondition(imagePath);
  return { card, condition };
}
function extractCardName(text) {
  return text.split('\n')[0]; // Simple heuristic, refine later
}
module.exports = { analyzeCard };