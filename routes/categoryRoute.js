const categoryController = require('../controllers/categoryController');
const router = require('../utils/expressUtil');
/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category API
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - c_category
 *             properties:
 *               c_category:
 *                 type: string
 *                 example: Biology
 *     responses:
 *       200:
 *         description: category added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: integer
 */
router.post('/category', categoryController.create_category);

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all Category
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   c_id:
 *                     type: integer
 *                     example: 1
 *                   c_category:
 *                     type: string
 *                     example: Biology
 */
router.get('/category', categoryController.get_all_categories);

/**
 * @swagger
 * /category/{c_id}:
 *   delete:
 *     summary: Delete category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: c_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Category not found
 */
router.delete('/category/:c_id', categoryController.delete_category);

module.exports = router;