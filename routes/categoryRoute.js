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

module.exports = router;