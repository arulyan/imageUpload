const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const cors = require('cors');
const path = require("path");

app.use(cors());
app.use(fileUpload());

app.post('/upload', (req, res) => {
    if (req.files) {
        var file = req.files.filename;
        var fileName = file.name;
        var extension = path.extname(fileName);

        if ((extension == '.png' || extension == '.jpeg' || extension == '.jpg' || extension == '.jfif')) {
            file.mv('./uploads/' + fileName, (err) => {
                if (err) {
                    console.log("Error:" + err);
                    res.send({ "code": 204, "success": err })
                }
                else {
                    res.send({"success":"File has been Uploaded!","code":200})
                }
            })
        }
        else {
            res.send("Please send an image file!")
        }
    }
    else {
        return res.status(400).send('No files were uploaded');
    }
})

app.listen(3000, function () {
    console.log('listening on port: ' + 3000);
});