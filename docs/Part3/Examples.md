---
sidebar_position: 3
---
# Examples

Here are a few examples.  For the following examples assume a consensus price for ACME/USDC is currently at $100 and futures contract reserves of 200 ACME tokens and 15000 USDC tokens.  Also assume there are 100,000 liquidity tokens open interest in the liquidity pool contract.


#### Contributing Liquidity

A maker wants to contribute liquidity.  They are evaluating whether to contribute a majority of either ACME, USDC or an equal value of both.  The maker has 1000 USDC available and wants to evaluate the best combination in order to earn the most liquidity tokens.  (Assume they will first trade some amount of USDC for ACME on an external AMM before contributing quantities of both tokens into the DiscoveryDEX smart contract)

The formula for liquidity tokens is:

![](https://i.imgur.com/QgHWEVH.png)

Given our example assumptions above:

![](https://i.imgur.com/olDB74F.png)

This leads to the following table to visualize a few sample choices the maker has:


<table>
  <tr>
   <td>
   </td>
   <td>ACME
   </td>
   <td>USDC
   </td>
   <td>Liquidity Tokens Earned
   </td>
  </tr>
  <tr>
   <td>Scenario 1
   </td>
   <td>1
   </td>
   <td>900
   </td>
   <td>1732.051
   </td>
  </tr>
  <tr>
   <td>Scenario 2
   </td>
   <td>5
   </td>
   <td>500
   </td>
   <td>2886.751
   </td>
  </tr>
  <tr>
   <td>Scenario 3
   </td>
   <td>9
   </td>
   <td>100
   </td>
   <td>1732.051
   </td>
  </tr>
</table>


In order to earn the most liquidity tokens when contributing to the pool, it is in the maker’s best interest to contribute equal value of each token (option 2), based on the current consensus price (5 ACME is approximately the same value as 500 USDC with a consensus price of $100 for ACME tokens).


#### Withdrawing Liquidity

The maker decides to withdraw their tokens after contributing the amounts in Scenario 2 above.  The total withdrawn is:

![](https://i.imgur.com/54AqP0M.png)

Note that the total value withdrawn (5.752 * 100 + 434.892 = 1010.092) is actually a bit more than originally contributed.  This is because the contract reserves had slightly mismatched value (200 ACME reserves = 20000 USDC > 15000 USDC reserves).


#### Buying / Selling Futures

A taker wants to trade a futures contract.  Assume they want to either go long with 50 USDC or short with 0.5 ACME and are evaluating the best choice.

![](https://i.imgur.com/uDeHLha.png)

For a long position the taker will pay 50 USDC and receive ACME:

![](https://i.imgur.com/9e2j9pt.png)

For a short position the taker will pay 0.5 ACME and receive USDC:

![](https://i.imgur.com/BwtCgIy.png)

Calculating the fill price using the following formula leads to the table below:

![](https://i.imgur.com/IcHUXTW.png)

<table>
  <tr>
   <td>Trade in qty
   </td>
   <td>In token
   </td>
   <td>Out token
   </td>
   <td>Virtual in reserve
   </td>
   <td>Trade out qty
   </td>
   <td>Fill price
   </td>
  </tr>
  <tr>
   <td>Long 50 USDC
   </td>
   <td>USDC
   </td>
   <td>ACME
   </td>
   <td>20000 USDC
   </td>
   <td>0.499 ACME
   </td>
   <td>100.200
   </td>
  </tr>
  <tr>
   <td>Short 0.5 ACME
   </td>
   <td>ACME
   </td>
   <td>USDC
   </td>
   <td>150 ACME
   </td>
   <td>49.834 USDC
   </td>
   <td>99.668
   </td>
  </tr>
</table>


Note that the virtual spread is not centered around the market consensus.  This is because the contract reserves have mismatched value (200 ACME reserves = 20000 USDC > 15000 USDC reserves).  Therefore, if the taker is direction agnostic, the spread is tighter for the long trade versus the short trade, because the USDC reserves have slightly less value than the ACME reserves in the smart contract.


#### Hedging Token Futures with Consensus Price Options

Suppose the taker above goes with the long trade of 5000 USDC for 50 ACME (ignoring slippage due to spread for this example).  Also assume DiscoveryDEX tokens (the consensus market backing) are currently valued at 10 USDC, and will be relatively stable at this value over the short time duration of the position.  The taker can then hedge his downside risk by buying 5 ACME/USDC puts with a strike at the current consensus price of 100.  Hedging with puts works because the option pays out in DiscoveryDEX token backing.

The following table shows how the combined long futures + long puts will net out if the position is closed out at various consensus prices:


<table>
  <tr>
   <td>Ending consensus price
   </td>
   <td>50 ACME value
   </td>
   <td>Put payout
   </td>
   <td>Net profit (loss)
   </td>
  </tr>
  <tr>
   <td>102
   </td>
   <td>5100 USDC
   </td>
   <td>0
   </td>
   <td>100 USDC
   </td>
  </tr>
  <tr>
   <td>101
   </td>
   <td>5050 USDC
   </td>
   <td>0
   </td>
   <td>50 USDC
   </td>
  </tr>
  <tr>
   <td>100
   </td>
   <td>5000 USDC
   </td>
   <td>0
   </td>
   <td>0
   </td>
  </tr>
  <tr>
   <td>99
   </td>
   <td>4950 USDC
   </td>
   <td>50 USDC
   </td>
   <td>0
   </td>
  </tr>
  <tr>
   <td>98
   </td>
   <td>4900 USDC
   </td>
   <td>100 USDC
   </td>
   <td>0
   </td>
  </tr>
</table>


By purchasing the put option the trader is protected against downside risk, as long as the DiscoveryDEX token maintains its short-term value over the life of the position.
