const express = require('express');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png');
    }
});

const upload = multer({ storage: storage });


const app = express()
const port = 5000


app.use(cors())
app.use(express.json())


app.get('/api/get', (req,res) => {
    res.json('{"status":200}');
})



app.post('/api/post', (req,res) => {
    let data = req.body

    // convert data to string
    let dataString = "Product Name: " + data.productName + "\nMotherboard Serial: " + data.motherboardSerial  + "\nMAC Address: " + data.macAddress + "\nMotherboard Serial: " + data.motherboardSerial +  "\n\n";
    // Use the 'a' parameter to add data to the file or create it if the file does not exist
    fs.writeFile('Product DataBase.txt', dataString, { flag: 'a+' }, err => {
        if (err) {
            console.error(err);
            return;
        }
        
    });

    res.json("{'status':200}");
})

app.post('/api/upload', upload.single('file'), (req, res) => {
    console.log(req.file.filename);
    //const photo = req.file;
    //const dest_path = 'uploads/' + photo.filename;
    // Uncomment the line below if you want to save the file
    // fs.writeFileSync(dest_path, photo.buffer);
    res.json({ status: 200 });
});


app.listen(port, () => {
    console.log("Backend Running");
});



