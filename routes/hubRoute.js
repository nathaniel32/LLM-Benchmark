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


/**
 * @swagger
 * /proxy:
 *   post:
 *     summary: Dynamic proxy endpoint to forward requests
 *     tags: [Hub]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: Target URL to proxy the request to
 *                 example: "http://141.56.137.185:11434/api/generate"
 *               method:
 *                 type: string
 *                 description: HTTP method for the proxied request (GET, POST, etc.)
 *                 example: "POST"
 *               headers:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *                 description: Headers to include in the proxied request
 *               body:
 *                 type: object
 *                 description: JSON body to send in the proxied request
 *     responses:
 *       200:
 *         description: Response from the proxied server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Missing or invalid URL in request body
 *       500:
 *         description: Proxy server error
 */
router.all('/proxy', hubController.use_proxy);


module.exports = router;