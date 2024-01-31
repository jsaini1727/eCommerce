const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint


// find all products
// be sure to include its associated Category and Tag data
// get all products
router.get('/products/category/tag', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: Category,
      include: ProductTag
    });
    resObj.json(products);
  } catch (err) {
    console.log(err)
  };
});

// get one product
// find a single product by its `id`
// be sure to include its associated Category and Tag data
router.get('/product/:id', async (req, res) => {
  const product_id = reqObj.query.product_id;
  try {
    const product = await Product.findOne({
      where: {
        id: product_id
      },
      include: Category,
      include: ProductTag
    });
    if (product) {
      resObj.json(product);
    }
    respObj.json({
      error: 404,
      message: 'Product with that ID not found'
    })

  } catch (err) {
    console.log(err)
  }
});

// create new product
router.post('/product', async (req, res) => {
  const productData = reqObj.body;
  if(!productData.product_name || !productData.price || !productData.stock || !productData.tagIds){
    return res.status(400).json({error: 'Missing required fields'});
  }
  try {
    const product = await Product.create(reqObj.body);

    respObj.json(product);

  } catch (err) {
    console.log(err);
    respObj.json({
      error: 500,
      message: 'There was an error in adding the product'
    })
  }
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */

    
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});


// delete one product by its `id` value
router.delete('/product/:id', async (req, res) => {
  const product_id = reqObj.params.id
  try {
    await Product.destroy({
      where: {
        id: product_id
      }
    })
    resObj.send({
      message: 'Product deleted successfully'
    })

  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
