import express from 'express';
import {
  getTaxonomy,
  createCategory,
  deleteCategory,
  addSubcategory,
  deleteSubcategory,
  addLocality,
  deleteLocality
} from '../controllers/taxonomyController.js';

const router = express.Router();

router.get('/', getTaxonomy);
router.post('/categories', createCategory);
router.delete('/categories/:name', deleteCategory);
router.post('/categories/:name/subcategories', addSubcategory);
router.delete('/categories/:name/subcategories/:subName', deleteSubcategory);
router.post('/localities', addLocality);
router.delete('/localities/:name', deleteLocality);

export default router;
