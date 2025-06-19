const outputController = require('../controllers/outputController');
const router = require('../utils/expressUtil');
/**
 * @swagger
 * tags:
 *   name: Output
 *   description: Output API
 */

/**
 * @swagger
 * /output:
 *   post:
 *     summary: Create a new output
 *     tags: [Output]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - c_output_final
 *               - c_total_duration
 *               - c_score
 *               - t_input_id
 *               - t_model_id
 *             properties:
 *               c_output_think:
 *                 type: string
 *               c_output_final:
 *                 type: string
 *                 example: "1 + 1 = 2"
 *               c_total_duration:
 *                 type: integer
 *                 example: 100
 *               c_load_duration:
 *                 type: integer
 *                 example: 15
 *               c_prompt_eval_count:
 *                 type: integer
 *                 example: 10
 *               c_prompt_eval_duration:
 *                 type: integer
 *                 example: 40
 *               c_eval_count:
 *                 type: integer
 *                 example: 5
 *               c_eval_duration:
 *                 type: integer
 *                 example: 45
 *               c_score:
 *                 type: number
 *                 format: float
 *                 example: 1.2
 *               c_note:
 *                 type: string
 *                 example: "good job"
 *               t_input_id:
 *                 type: integer
 *                 example: 1
 *               t_model_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: output added successfully
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
router.post('/output', outputController.create_output);

/**
 * @swagger
 * /output:
 *   get:
 *     summary: Get all Output
 *     tags: [Output]
 *     responses:
 *       200:
 *         description: List of Output retrieved successfully
 */
router.get('/output', outputController.get_all_outputs);

/**
 * @swagger
 * /output/{c_id}:
 *   delete:
 *     summary: Delete output by ID
 *     tags: [Output]
 *     parameters:
 *       - in: path
 *         name: c_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: output ID
 *     responses:
 *       200:
 *         description: Output deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Output not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Output not found
 */
router.delete('/output/:c_id', outputController.delete_output);

module.exports = router;