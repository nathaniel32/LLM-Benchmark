const hubController = require('../controllers/hubController');
const router = require('../utils/expressUtil');
/**
 * @swagger
 * tags:
 *   name: Hub
 *   description: Hub API
 */

/**
 * @swagger
 * /hub/{sql}:
 *   get:
 *     summary: Run Hub SQL
 *     tags: [Hub]
 *     parameters:
 *       - in: path
 *         name: sql
 *         schema:
 *           type: string
 *           example: select * from t_category
 *         required: true
 *         description: SQL command
 *     responses:
 *       200:
 *         description: SQL command executed successfully
 */
router.get('/hub/:sql', hubController.run_hub_sql);

/**
 * @swagger
 * /schema:
 *   get:
 *     summary: Get Hub SQL Schema
 *     tags: [Hub]
 *     responses:
 *       200:
 *         description: SQL Schema
 */
router.get('/schema', hubController.get_hub_sql_schema);

module.exports = router;