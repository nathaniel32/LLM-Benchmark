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
 *                 example: erwan2/DeepSeek-R1-Distill-Qwen-1.5B:latest
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
 *                     example: erwan2/DeepSeek-R1-Distill-Qwen-1.5B:latest
 */
router.get('/model', modelController.get_all_models);

/**
 * @swagger
 * /model/{c_id}:
 *   delete:
 *     summary: Delete model by ID
 *     tags: [Model]
 *     parameters:
 *       - in: path
 *         name: c_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: model ID
 *     responses:
 *       200:
 *         description: Model deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Model not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Model not found
 */
router.delete('/model/:c_id', modelController.delete_model);

module.exports = router;