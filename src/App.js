import Web3 from 'web3';
import './App.css';


var web3 = new Web3(Web3.givenProvider);

var address = "0x4Db0a83a48caD864Cd145D1b2e1E15703f2f3Ee3";

var abi = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_product_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_motherboard_serial",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_mac_address",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_product_serial",
                    "type": "string"
                }
            ],
            "name": "register_product",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "hash",
                    "type": "bytes32"
                }
            ],
            "name": "get_product",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "product_name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "motherboard_serial",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "mac_address",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "product_serial",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct main.Product",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "product_count",
            "outputs": [
                {
                    "internalType": "int256",
                    "name": "",
                    "type": "int256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    
var contract = new web3.eth.Contract(abi, address);

var accounts = await web3.eth.getAccounts();
console.clear();

async function interactWithContract() {

    console.log(accounts);

        
}

function previewImage() {
    let reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('preview').src = e.target.result;
      document.getElementById('preview').style.display = 'block';
    };
    reader.readAsDataURL(document.getElementById('img').files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();


    // Create JSON object

    let submitObject = {
        productName : document.getElementById('pname').value,
        motherboardSerial : document.getElementById('mserial').value,
        macAddress : document.getElementById('mac').value,
        productSerial : document.getElementById('pserial').value
    }
      
    //await contract.methods.register_product(submitObject.productName, submitObject.motherboardSerial, submitObject.macAddress, submitObject.productSerial).send({ from: accounts[0] });
    


    // Send JSON object to Backend
    fetch('http://localhost:5000/api/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitObject)
    })
    .then(response => response.json())
    .then(data => {
        console.log('POST request successful:', data);
    });

    // Send File to Backend
    const fileInput = document.getElementById('img');
    const file = fileInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch('http://localhost:5000/api/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('File uploaded successfully:', data);
        })
        .catch(error => {
            console.error('Error uploading file:', error);
        });

    }


    // Create a string of the form data
    // let formData = 
    //     'Product Name: ' + productName + '\n' +
    //     'Product Serial: ' + productSerial + '\n' +
    //     'MAC Address: ' + macAddress + '\n' +
    //     'Motherboard Serial: ' + motherboardSerial + '\n' +
    //     'Product Image: ' + productImage;


    // // Create a blob from the form data string
    // let blob = new Blob([formData], {type: "text/plain;charset=utf-8"});

    // // Create a link element
    // let url = URL.createObjectURL(blob);
    // let link = document.createElement('a');
    // link.href = url;

    // // Set the download attribute of the link
    // link.download = 'product_info.txt';

    // // Trigger the download by programmatically clicking the link
    // link.click();
}

/*
const fs = require('fs');

let data = 'Hello, World!';

fs.writeFile('myFile.txt', data, (err) => {
  if (err) throw err;
  console.log('Data written to file');
});
*/



function App() {
    if (window.ethereum) { 
        window.ethereum
        .request({ method: "eth_requestAccounts" }) 
        .then((res) => console.log(res));
        interactWithContract();
    }
    else {
        alert("install metamask extension !!");
    }
    return (
        <div>
            <h2>TrusTech User Interface</h2>

            <form action="/submit_product_info" onSubmit={handleSubmit}>
                <div className="input-field">
                    <label htmlFor="pname">Product Name:</label><br/>
                    <input type="text" id="pname" name="pname"/><br/><br/>

                    <label htmlFor="mserial">Motherboard Serial Number:</label><br/>
                    <input type="text" id="mserial" name="mserial"/><br/><br/>

                    <label htmlFor="mac">MAC Address:</label><br/>
                    <input type="text" id="mac" name="mac"/><br/><br/>

                    <label htmlFor="pserial">Product Serial Number:</label><br/>
                    <input type="text" id="pserial" name="pserial"/><br/><br/>

                </div>
                <div className="input-field">
                    <label htmlFor="img">Insert Image:</label><br/>
                    <input type="file" id="img" name="img" accept="image/*" onChange={previewImage}/><br/><br/>
                    
                    <img id="preview" alt="Product Preview"/>
                </div>
                <input type="submit" value="Register Product"/>
            </form> 
        </div>
    );


}

export default App; 
