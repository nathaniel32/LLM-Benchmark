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
 *     summary: Create a new user
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *     responses:
 *       200:
 *         description: User added successfully
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
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: john@example.com
 */
router.get('/category', categoryController.get_all_categories);

module.exports = router;