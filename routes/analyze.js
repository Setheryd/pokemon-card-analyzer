const express = require('express');
const router = express.Router();
const upload = require('multer')({ dest: 'uploads/' });
const analyzeService = require('../services/analyze');
router.post('/', upload.single('cardImage'), async (req, res) => {
  try {
    const result = await analyzeService.analyzeCard(req.file.path);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Analysis failed' });
  }
});
module.exports = router;