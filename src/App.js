import Web3 from 'web3';
import './App.css';

console.clear();
const web3 = new Web3(Web3.givenProvider);

async function interactWithContract() {

    const accounts = await web3.eth.getAccounts();
    console.log(accounts);

    const address = "0xbF48F95FEB98eebd108B1Eb0A49eF39f06612372";
    const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getHelloMessage",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "helloMessage",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
    const contract = new web3.eth.Contract(abi, address);

    const value = await contract.methods.getHelloMessage().call(); 
    console.log(value);
}

function previewImage() {
    let reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('preview').src = e.target.result;
      document.getElementById('preview').style.display = 'block';
    };
    reader.readAsDataURL(document.getElementById('img').files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Get the form data
    let productName = document.getElementById('pname').value;
    let productSerial = document.getElementById('pserial').value;
    let macAddress = document.getElementById('mac').value;
    let motherboardSerial = document.getElementById('mserial').value;
    let productImage = localStorage.getItem('productImage');

    // Create a string of the form data
    let formData = 
        'Product Name: ' + productName + '\n' +
        'Product Serial: ' + productSerial + '\n' +
        'MAC Address: ' + macAddress + '\n' +
        'Motherboard Serial: ' + motherboardSerial + '\n' +
        'Product Image: ' + productImage;

    // Create a blob from the form data string
    let blob = new Blob([formData], {type: "text/plain;charset=utf-8"});

    // Create a link element
    let url = URL.createObjectURL(blob);
    let link = document.createElement('a');
    link.href = url;

    // Set the download attribute of the link
    link.download = 'product_info.txt';

    // Trigger the download by programmatically clicking the link
    link.click();
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
                    
                    <label htmlFor="pserial">Product Serial Number:</label><br/>
                    <input type="text" id="pserial" name="pserial"/><br/><br/>
                    
                    <label htmlFor="mac">MAC Address:</label><br/>
                    <input type="text" id="mac" name="mac"/><br/><br/>
                    
                    <label htmlFor="mserial">Motherboard Serial Number:</label><br/>
                    <input type="text" id="mserial" name="mserial"/><br/><br/>
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
