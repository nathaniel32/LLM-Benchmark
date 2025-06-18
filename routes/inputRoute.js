const inputController = require('../controllers/inputController');
const router = require('../utils/expressUtil');

/**
 * @swagger
 * tags:
 *   name: Input
 *   description: Input API
 */

/**
 * @swagger
 * /input:
 *   post:
 *     summary: Create a new input
 *     tags: [Input]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - c_input
 *               - t_category_id
 *             properties:
 *               c_input:
 *                 type: string
 *                 example: "1 + 1 = ?"
 *               c_note:
 *                 type: string
 *               t_category_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: input added successfully
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
router.post('/input', inputController.create_input);

/**
 * @swagger
 * /input/{c_id}:
 *   delete:
 *     summary: Delete input by ID
 *     tags: [Input]
 *     parameters:
 *       - in: path
 *         name: c_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: input ID
 *     responses:
 *       200:
 *         description: Input deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Input not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Input not found
 */
router.delete('/input/:c_id', inputController.delete_input);

module.exports = router;