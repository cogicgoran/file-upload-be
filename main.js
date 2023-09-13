const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const sharp = require('sharp');

const storage = multer.memoryStorage();

const app = express();
app.use(cors())
const upload = multer({ storage: storage })

app.post('/upload', emptyUploads, upload.array('files'), (req, res, err) => {
    // TODO: Execute in parallel
    req.files.forEach((file) => {
        sharp(file.buffer).resize(300, 300).toFile(path.join('uploads', Date.now() + `-${Math.random()}` + path.extname(file.originalname)))
    })
    res.send('Ok');
})

app.listen(3000, () => {
    console.log('Server listening on port 3000')
});

function emptyUploads(_, _, next) {
    const files = fs.readdirSync('./uploads');
    files.forEach((file) => {
        fs.unlinkSync(path.join('uploads', file))
    })
    next();
}