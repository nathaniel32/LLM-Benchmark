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
 *               - c_output
 *               - c_total_duration
 *               - c_score
 *               - t_input
 *             properties:
 *               c_output:
 *                 type: string
 *                 example: "1 + 1 = 2"
 *               c_total_duration:
 *                 type: integer
 *                 example: 100
 *               c_token:
 *                 type: integer
 *                 example: 50
 *               c_score:
 *                 type: number
 *                 format: float
 *                 example: 1.2
 *               c_note:
 *                 type: string
 *                 example: "good job"
 *               c_source:
 *                 type: string
 *                 example: "google.com"
 *               t_input:
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
 * /output/{c_id}:
 *   get:
 *     summary: Get output by ID
 *     tags: [Output]
 *     parameters:
 *       - in: path
 *         name: c_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Output ID
 *     responses:
 *       200:
 *         description: Output found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 c_id:
 *                   type: integer
 *                   example: 1
 *                 c_output:
 *                   type: string
 *                   example: "1 + 1 = 2"
 *                 c_total_duration:
 *                   type: integer
 *                   example: 100
 *                 c_token:
 *                   type: integer
 *                   example: 50
 *                 c_score:
 *                   type: number
 *                   format: float
 *                   example: 1.2
 *                 c_note:
 *                   type: string
 *                   example: "good job"
 *                 c_source:
 *                   type: string
 *                   example: "google.com"
 *                 t_input:
 *                   type: integer
 *                   example: 1
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
router.get('/output/:c_id', outputController.get_output_by_id);

/**
 * @swagger
 * /output/{c_id}:
 *   put:
 *     summary: Update output by ID
 *     tags: [Output]
 *     parameters:
 *       - in: path
 *         name: c_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: output ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               c_output:
 *                 type: string
 *                 example: "1 + 1 = 2"
 *               c_total_duration:
 *                 type: integer
 *                 example: 100
 *               c_token:
 *                 type: integer
 *                 example: 50
 *               c_score:
 *                 type: number
 *                 format: float
 *                 example: 1.2
 *               c_note:
 *                 type: string
 *                 example: "good job"
 *               c_source:
 *                 type: string
 *                 example: "google.com"
 *               t_input:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Output updated successfully
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
router.put('/output/:c_id', outputController.update_output);

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