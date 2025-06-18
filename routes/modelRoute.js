const modelController = require('../controllers/modelController');
const router = require('../utils/expressUtil');
/**
 * @swagger
 * tags:
 *   name: Model
 *   description: Model API
 */

/**
 * @swagger
 * /model:
 *   post:
 *     summary: Create a new model
 *     tags: [Model]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - c_model
 *             properties:
 *               c_model:
 *                 type: string
 *                 example: llama3.2
 *     responses:
 *       200:
 *         description: model added successfully
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
router.post('/model', modelController.create_model);

/**
 * @swagger
 * /model:
 *   get:
 *     summary: Get all Model
 *     tags: [Model]
 *     responses:
 *       200:
 *         description: List of Model retrieved successfully
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
 *                   c_model:
 *                     type: string
 *                     example: llama3.1
 */
router.get('/model', modelController.get_all_models);

module.exports = router;