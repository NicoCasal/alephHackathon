// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract NFCNFT {
    struct UserData {
        string username;
        string email;
        string phone;
        string dni;
        string nftHash;
    }

    mapping(string => UserData) public users;

    function registerUser(string memory chipId, string memory username, string memory email, string memory phone, string memory dni, string memory nftHash) public {
        require(bytes(users[chipId].username).length == 0, "Chip ya registrado");
        users[chipId] = UserData(username, email, phone, dni, nftHash);
    }

    function getUser(string memory chipId) public view returns (UserData memory) {
        return users[chipId];
    }
}
