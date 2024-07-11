// const express = require('express');
// const router = express.Router();
// const authenticateToken = require('../middleware/middleware-jwt');
// const ContentController = require('../controllers/contentControllers');
// const upload = require('../config/multer');

// const mediaUpload = upload.fields([{ name: 'mediaFile', maxCount: 1 }, { name: 'previewFile', maxCount: 1 }]);
// router.post('/create', authenticateToken, mediaUpload, ContentController.createContent);
// router.get('/get', (req, res) => {
//      ContentController.getContent(req, res, req.query.sortBy, req.query.order);
// });
// router.get('/get/:id', authenticateToken, ContentController.getContentById);
// module.exports = router;
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/middleware-jwt');
const ContentController = require('../controllers/contentControllers');
const upload = require('../config/multer');

const mediaUpload = upload.fields([{ name: 'mediaFile', maxCount: 1 }, { name: 'previewFile', maxCount: 1 }]);
router.post('/create', authenticateToken, mediaUpload, ContentController.createContent);
router.get('/get', ContentController.getContent);
router.get('/get/:id', authenticateToken, ContentController.getContentById);
router.get('/user', authenticateToken, ContentController.getUserContent);
router.put('/update/:id', authenticateToken, mediaUpload, ContentController.updateContent);
router.delete('/delete/:id', authenticateToken, ContentController.deleteContent);

module.exports = router;