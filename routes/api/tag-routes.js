const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'], 
        through: { attributes: [] }, 
      },
    ],
  })
    .then((tags) => res.json(tags))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// get one tag by its `id`
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
        through: { attributes: [] },
      },
    ],
  })
    .then((tag) => {
      if (!tag) {
        res.status(404).json({ message: 'Tag not found' });
        return;
      }
      res.json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// create a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((tag) => res.status(201).json(tag))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      if (tag[0] === 0) {
        res.status(404).json({ message: 'Tag not found' });
        return;
      }
      res.json({ message: 'Tag updated successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


// delete a tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      if (!tag) {
        res.status(404).json({ message: 'Tag not found' });
        return;
      }
      res.json({ message: 'Tag deleted successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
