const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const getDestination = (uploadType) => {
    switch (uploadType) {
        case 'admin':
            return 'src/uploads/admin/';
        case 'portfolio':
            return 'src/uploads/portfolio/';
        default:
            return 'src/uploads/';
    }
};

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const uploadType = req.body.type || 'default';
        const destinationPath = getDestination(uploadType);

        try {
            await fs.access(destinationPath);
        } catch (err) {
            await fs.mkdir(destinationPath, { recursive: true });
        }

        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = upload;
