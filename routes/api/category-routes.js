const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product]
    });
    res.json(categories);
  } catch (err) {
    console.log(err)
  };
});



// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const category_id = req.params.id;
    const category = await Category.findOne({
      where: {
        id: category_id
      },
      include: [Product]
    });
    if (category){
      return res.json(category);
    }
    res.json({
      error: 404,
      message: 'Category not found by that ID'
    })

  } catch (err) {
    console.log(err)
  }
});


// create a new category
router.post('/category', async(req, res) => {
  try{
  const categoryData = req.body;
  const category = await Category.create(categoryData);

  res.json({
    message: 'Category added successfully',
    category: category
  });
} catch (err){
  const messages = err.errors.map(eObj => eObj.message);

  res.json({
    error: 401,
    message: messages
  });
}

});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.json(category)
  } catch (error) {
    res.status(500).json(error.message)
  }
});



// delete a category by its `id` value
router.delete('/category/:id', async (req, res) => {
  try {
  const category_id = req.params.id
  await Category.destroy({
    where: {
      id: category_id
    }
  })
res.send({
  message: 'Category deleted successfully'
})

}catch (err){
  console.log(err)
}

});

module.exports = router;
