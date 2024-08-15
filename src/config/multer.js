const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const categories = require('../common/enums/category.enum');

const getDestination = (uploadType, category) => {
    switch (uploadType) {
        case 'admin':
            return 'src/uploads/admin/';
        case 'portfolio':
            return `src/uploads/portfolio/${category}`;
        case 'aboutus':
            return `src/uploads/aboutus/`;
        case 'slider':
            return `src/uploads/slider`;
        default:
            return 'src/uploads/';
    }
};

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const uploadType = req.body.type || 'default';
        const { category } = req.params;

        if (uploadType === 'portfolio' && !categories.includes(category)) {
            return cb(new Error('Invalid category'));
        }

        const destinationPath = getDestination(uploadType, category);

        try {
            await fs.access(destinationPath);
        } catch (err) {
            await fs.mkdir(destinationPath, { recursive: true });
        }

        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        const uploadType = req.body.type || 'default';
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        let filePath;

        if (uploadType === 'portfolio') {
            const category = req.params.category

            filePath = path.join('uploads', uploadType, category, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        } else {
            filePath = path.join('uploads', uploadType, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        }

        file.fullPath = filePath;

        // file.fullPath = path.join('uploads', uploadType, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));;

        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = upload;
