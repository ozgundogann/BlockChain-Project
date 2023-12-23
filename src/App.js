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

            <form action="/submit_product_info">
                <div>
                    <label htmlFor="img">Insert Image:</label><br />
                    <input type="file" id="img" name="img" accept="image/*" /><br /><br />
                </div>

                <label htmlFor="pname">Product Name:</label><br />
                <input type="text" id="pname" name="pname" /><br /><br />

                <label htmlFor="pserial">Product Serial Number:</label><br />
                <input type="text" id="pserial" name="pserial" /><br /><br />

                <label htmlFor="mac">MAC Address:</label><br />
                <input type="text" id="mac" name="mac" /><br /><br />

                <label htmlFor="mserial">Motherboard Serial Number:</label><br />
                <input type="text" id="mserial" name="mserial" /><br /><br />

                <input type="submit" value="Register Product" />
            </form>
        </div>
    );
}

export default App; 