pragma solidity ^0.5.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WindfallToken is ERC20 {
    constructor() ERC20("Windfall", "WIND") {
        uint256 initialSupply = 100000000 * (10 ** uint256(decimals())); // 100 million tokens
        _mint(msg.sender, initialSupply);
    }

    // Burn mechanism (uncomment)
    // function burn(uint256 amount) public {
    //     _burn(msg.sender, amount);
    // }
}
