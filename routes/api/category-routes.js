const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get('/categories/products', async (req, res) => {
  try {

    const categories = await Category.findAll({
      include: Product
    });
    responseObj.json(categories);
  } catch (err) {
    console.log(err)
  };
});



// find one category by its `id` value
// be sure to include its associated Products
router.get('/category/:id', async (req, res) => {
  const category_id = requestObj.query.category_id;
  try {
    const category = await Category.findOne({
      where: {
        id: category_id
      },
      include: Product
    });
    if (category){
      responseObj.json(category);
    }
    responseObj.json({
      error: 404,
      message: 'Category not found by that ID'
    })

  } catch (err) {
    console.log(err)
  }
});


// create a new category
router.post('/category', async(req, res) => {
  const categoryData = reqObj.body;
try{
  const category = await Category.create(categoryData);

  resObj.json({
    message: 'Category added successfully',
    category: category
  });
} catch (err){
  const messages = err.errors.map(eObj => eObj.message);

  resObj.json({
    error: 401,
    message: messages
  });
}

});

// update a category by its `id` value
router.put('/:id', (req, res) => {
});



// delete a category by its `id` value
router.delete('/category/:id', async (req, res) => {
const category_id = reqObj.params.id
try {
  await Category.destroy({
    where: {
      id: category_id
    }
  })
resObj.send({
  message: 'Category deleted successfully'
})

}catch (err){
  console.log(err)
}

});

module.exports = router;
