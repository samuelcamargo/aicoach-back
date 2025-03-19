"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Autentica um usuário
 *     description: Retorna um token JWT e informações do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *             properties:
 *               login:
 *                 type: string
 *                 description: Login do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     login:
 *                       type: string
 *                     accessLevel:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                 token:
 *                   type: string
 *                 expiresIn:
 *                   type: integer
 *                   description: Timestamp de expiração do token (em segundos desde a época Unix)
 *       400:
 *         description: Dados de entrada inválidos
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */
exports.default = (router, authController) => {
    router.post('/auth', (req, res) => {
        authController.login(req, res);
    });
};
