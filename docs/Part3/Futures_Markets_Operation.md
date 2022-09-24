---
sidebar_position: 2
---

# Futures Markets Operation

DiscoveryDEX futures, standardized with the same time durations as DiscoveryDEX consensus options, have the ability to create a direct hedge against existing the consensus markets, but backed by native tokens as futures. In order to do this, the futures contracts must be standardized using the same method (time durations) as the DiscoveryDEX consensus markets use:


<table>
  <tr>
   <td><strong>Asset</strong>
   </td>
   <td><strong>Backing</strong>
   </td>
   <td><strong>Standardization</strong>
   </td>
  </tr>
  <tr>
   <td>Options
   </td>
   <td>DiscoveryDEX token
   </td>
   <td>Time duration (5-minute, 15-minute, 1-hour, etc)
   </td>
  </tr>
  <tr>
   <td>Futures
   </td>
   <td>Native tokens
   </td>
   <td>Time duration (5-minute, 15-minute, 1-hour, etc)
   </td>
  </tr>
</table>


A side benefit of this design, possible because price discovery is decoupled from trading, is gained when trading bridged assets of the same denomination but originating from different chains. The DiscoveryDEX system can trade these assets using the same consensus liquidity pools for price discovery.

Makers contributing base or counter token liquidity mint liquidity tokens that can be traded just like any other token.  These liquidity tokens represent a percentage claim on the current base, counter reserves and can be cashed out by the maker at any time.  Liquidity tokens are minted based on the following formula:

![](https://i.imgur.com/wM9y3nG.png)

Liquidity tokens are burned (cashed out) by claiming X% of the current base and counter token reserves, where X is the percentage of liquidity tokens being claimed as compared to the current total liquidity token open interest.


#### Makers

Makers provide token liquidity for a base and counter currency by contributing to a futures smart contact.  In return for adding liquidity they receive liquidity tokens, which are used on a percentage basis when withdrawing liquidity from the smart contract in the future, hopefully at a profit due to the liquidity spread the smart contract earns based on reserves and trade size described in “Trades” below.


#### Takers

Takers buy or sell futures contracts at the current consensus price associated with the DiscoveryDEX consensus market associated with the futures contract at creation.  There is a spread associated with taker trades, based on the amount of liquidity available.  The spread is calculated based on output token reserves based on a constant-K bonding curve (see “Trades” below).


#### Trades

For a long futures position the taker pays the counter token to the smart contract at trade initiation and can take delivery of the base token at expiration.  Alternatively the taker can opt to close the position at any time by selling the long position back to the smart contract at the realtime consensus price.

For a short futures position the taker pays the base token to the smart contract at trade initiation and can take delivery of the counter token at expiration.  Alternatively the taker can opt to close the position at any time by selling the long position back to the smart contract at the realtime consensus price.

The price a trade is filled at depends on the liquidity of the output token at the time of the trade.  This is the base token for futures buys, and the counter token for sells.  To calculate the trade output amount we create a virtual reserve of the input token based on the reserve of the output token and the consensus price as follows:


<table>
  <tr>
   <td>
   </td>
   <td>In token
   </td>
   <td>Out token
   </td>
   <td>“Virtual in” reserve
   </td>
  </tr>
  <tr>
   <td>Buy futures
   </td>
   <td>counter
   </td>
   <td>base
   </td>
   <td>base reserve * consensus price
   </td>
  </tr>
  <tr>
   <td>Sell futures
   </td>
   <td>base
   </td>
   <td>counter
   </td>
   <td>counter reserve  / consensus price
   </td>
  </tr>
</table>


Once the virtual in quantity is known, the trade output amount is:

![](https://i.imgur.com/eTuTRxI.png)

This formula is derived from a constant-K bonding curve calculation using K = output reserve * virtual input reserve, and requiring that K stays constant as a result of the trade.  Note that unlike an AMM, K will change with every trade rather than with liquidity mints or burns.

The fill price for the trade is then the ratio of:

![](https://i.imgur.com/3bVVaUX.png)

A futures trade may be negated at any time by selling a long position or buying back a short position at the corresponding fill price, but using the new consensus price.  On DiscoveryDEX, closing an existing position is different from opening a new opposing contract because the expiration times will always be different due to the way the contracts are standardized by time duration.

After expiration the only action available for a futures position is taking delivery of the trade output token, if it is available.  Taking delivery must occur within the settlement window after expiration of the trade.  The default will be configurable at contract creation, as a settlement time duration.

If sufficient output quantity is not available the futures position will be partially filled, or if there is no output quantity available the futures position will expire worthless after the settlement window.  It is up to the taker to decide whether to take delivery at expiration or cash out the position by selling back at the consensus price before expiration.


#### Markets

Makers contribute liquidity in the base token, counter token or both and get liquidity tokens in return.

There is no restriction on futures open interest.  If open interest exceeds output quantity, the best option for a taker is to close out their position prior to expiration, or risk not being able to take delivery, or being forced to take partial delivery.  Closing out a position depends on consensus price movement, so there is risk associated with adverse consensus price movement over the life of a futures contract.  This adverse price movement risk can be hedged by buying call or put options on the underlying consensus price market(s).
