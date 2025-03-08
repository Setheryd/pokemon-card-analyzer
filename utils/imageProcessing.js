const sharp = require('sharp');
async function preprocessImage(imagePath) {
  const image = sharp(imagePath);
  const grayscaleImage = await image.grayscale().toBuffer();
  const enhancedImage = await sharp(grayscaleImage).normalize().toFile('preprocessed.png');
  return 'preprocessed.png';
}
module.exports = { preprocessImage };