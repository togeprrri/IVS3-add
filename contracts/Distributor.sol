// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

interface Token{
    function transferFrom(address sender, address recepient, uint256 amount) external;

    function balanceOf(address account) external view returns(uint256);

    function getHolderByIndex(uint256 _index) external view returns(address);

    function holdersCount() external view returns(uint256);

    function totalSupply() external view returns(uint256);
}

contract Distributor{
    address IVS3 = 0x802dF8244585e14cC95156B5977d3b79DaAbF9eb;

    function changeIVS3TokenAddress(address _new) external{
        IVS3 = _new;
    }

    Token token = Token(IVS3);

    function handOut() external{
        uint256 _currentBalance = token.balanceOf(address(this));
        for(uint256 i=0; i < token.holdersCount(); i++){
            address _holder = token.getHolderByIndex(i);
            uint256 _amount = token.balanceOf(_holder) * _currentBalance / token.totalSupply();
            token.transferFrom(address(this), _holder, _amount);
        }
    }
}