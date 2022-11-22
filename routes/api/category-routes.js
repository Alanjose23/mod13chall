const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    // use async/await to make it so that it will find all, the display the data
    const allc = await Category.findAll({include:[{model: Product}]});
    res.status(200).json(allc);
  } catch (error) {
    res.status(500).json;
  }
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id, ({include:[{model: Product}]})).then((bookData) => {
    res.json(bookData);
  });
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create({category_name: req.body.category_name}).then((bookData) => {
    res.json(bookData);
  });
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedBook) => {
      res.json(deletedBook);
    })
    .catch((err) => res.json(err));
  // delete a category by its `id` value
});

module.exports = router;
