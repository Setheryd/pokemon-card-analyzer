const sharp = require('sharp');
async function assessCondition(imagePath) {
  const image = sharp(imagePath);
  const laplacian = await image.laplacian().toBuffer();
  const variance = calculateVariance(laplacian);
  const { channels } = await image.stats();
  const avgBrightness = (channels[0].mean + channels[1].mean + channels[2].mean) / 3;
  let conditionScore = 0;
  if (variance > 150) conditionScore += 2;
  else if (variance > 100) conditionScore += 1;
  if (avgBrightness > 128) conditionScore += 2;
  else if (avgBrightness > 64) conditionScore += 1;
  let condition;
  switch (conditionScore) {
    case 4: condition = 'Pristine'; break;
    case 3: condition = 'Mint'; break;
    case 2: condition = 'Good'; break;
    case 1: condition = 'Fair'; break;
    default: condition = 'Poor';
  }
  return condition;
}
function calculateVariance(buffer) {
  let sum = 0, sumSq = 0;
  for (let i = 0; i < buffer.length; i++) {
    sum += buffer[i];
    sumSq += buffer[i] * buffer[i];
  }
  const mean = sum / buffer.length;
  return (sumSq / buffer.length) - (mean * mean);
}
module.exports = { assessCondition };