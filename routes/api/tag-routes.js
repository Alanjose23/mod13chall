const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    // use async/await to make it so that it will find all, the display the data
    const allt = await Tag.findAll({include:[{model: Product}]});
    res.status(200).json(allt);
  } catch (error) {
    res.status(500).json;
  }
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, ({include:[{model: Product}]})).then((bookData) => {
    res.json(bookData);
  });
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  Tag.create({tag_name: req.body.tag_name}).then((bookData) => {
    res.json(bookData);
  });
  // create a new tag
});

router.put('/:id', (req, res) => {
  Tag.update(
    {
      // All the fields you can update and the data attached to the request body.
      tag_name: req.body.tag_name,
    },
    {
      // Gets the books based on the isbn given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedBook) => {
      // Sends the updated book as a json response
      res.json(updatedBook);
    })
    .catch((err) => res.json(err));
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedBook) => {
      res.json(deletedBook);
    })
    .catch((err) => res.json(err));
  // delete on tag by its `id` value
});

module.exports = router;
