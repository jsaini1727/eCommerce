const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// The `/api/tags` endpoint
// find all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag
      }]
    });
    res.json(tags);
  } catch (err) {
    console.log(err)
  };
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tag_id = req.params.id;
    const tag = await Tag.findOne({
      where: {
        id: tag_id
      },
      include: [{
        model: Product,
        through: ProductTag
      }]
    });
    if (tag) {
      return res.json(tag);
    }
    res.json({
      error: 404,
      message: 'Tag with that ID not found'
    })
  } catch (err) {
    res.status(500).json(error.message)
  };
});


// create a new tag
router.post('/', async (req, res) => {
try {
  const tag = await Tag.create(req.body)
  res.json(tag)
} catch (error) {
  res.status(500).json(error.message)
}
});

router.put('/:id', async (req, res) => {
  try {
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.json(tag)
  } catch (error) {
    res.status(500).json(error.message)
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(tag)
  } catch (error) {
    res.status(500).json(error.message)
  }// delete on tag by its `id` value
});

module.exports = router;
