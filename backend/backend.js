const express = require('express');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');

var imageName;
var readableStreamForFile;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        imageName = file.fieldname + '-' + Date.now() + '.png';
        cb(null, imageName);
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
    let dataString = "Product Name: " + data.productName + "\nMotherboard Serial: " + data.motherboardSerial + "\nMAC Address: " + data.macAddress + "\nProduct Serial: " + data.productSerial +  "\n\n";
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
    // Call async function
    readableStreamForFile = fs.createReadStream('./uploads/' + imageName);
    ipfs();
});


app.listen(port, () => {
    console.log("Backend Running");
});


// Use the JWT key
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK({ pinataJWTKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNmIxYjE5YS0zN2Y0LTRjNzItYjU4Ni1hOTcxMTJmMmJkZjEiLCJlbWFpbCI6Im96Z3VuZG9nYW4yMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMTBlOTliMzc1MjVhNmE5MTBkODQiLCJzY29wZWRLZXlTZWNyZXQiOiI0MThiYTczNmNiZDgwNGU5NjNkOWMzM2YxZDRmODhmZjhiNWZmNzZlNzU5MjEwNmVlNTNmM2UzYTdjYzMwOTEwIiwiaWF0IjoxNzAzNjEyNDQxfQ.MZzRyx2TH2dJflDcJZK9rAC-yq8Dcjesr1yHL-yD5qk' });

// Read file


// Define a function in order to use async
async function ipfs() {
    // Test JWT Key
    const res = await pinata.testAuthentication()
    console.log(res)

    // Define Pinata Options (For Image)
    const options = {
        pinataMetadata: {
            name: imageName,
            keyvalues: {
                Mission: 'Platform',
            }
        },
        pinataOptions: {
            cidVersion: 0
        }
    };

    // Pin our file
    const pinResult = await pinata.pinFileToIPFS(readableStreamForFile, options);
    console.log(pinResult);

}



