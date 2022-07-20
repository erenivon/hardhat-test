// SPDX-License-Identifier: MIT
import "hardhat/console.sol";

pragma solidity ^0.8.0;

contract CreateAlias {
   mapping(string => address) private aliases;
   mapping(address => string) private aliasAddresses;
   
   error AlreadyTaken();
   error AlreadySet();

   function setAlias(string memory enterAlias) public {
   require(bytes(aliasAddresses[msg.sender]).length < 1, "You Already Set");
   require(aliases[enterAlias] == address(0),"Already Taken");
   aliasAddresses[msg.sender]=enterAlias;
   aliases[enterAlias]=msg.sender;
   }
}