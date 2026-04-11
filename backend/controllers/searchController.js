const Dataset = require('../models/Dataset');

const searchDatasets = async (req, res) => {
  const { q, category, tags } = req.query;
  try {
    const query = {};
    if (q) query.$or = [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } }
    ];
    if (category) query.category = category;
    if (tags) query.tags = { $in: tags.split(',') };
    const results = await Dataset.find(query).sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { searchDatasets };