// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.2;

contract main {

    int public product_count = 0;

    struct Product {
        string product_name;
        string motherboard_serial;
        string mac_address;
        string product_serial;
    }

    mapping(bytes32 => Product) private products;

    function register_product  (
    string memory _product_name,
    string memory _motherboard_serial,
    string memory _mac_address, 
    string memory _product_serial) public
    {
        bytes32 hash = sha256(bytes(abi.encodePacked(_motherboard_serial,_mac_address, _product_serial)));
        products[hash] = Product(_product_name,_motherboard_serial,_mac_address,_product_serial);
        product_count++;
    }

    function get_product(bytes32 hash) public view returns(Product memory){
        return products[hash];
    }

}

