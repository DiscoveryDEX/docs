---
sidebar_position: 1
---
# Consensus Markets Operation

#### Makers

Makers provide price assertions with DiscoveryDEX token backing. DiscoveryDEX uses its native token as backing for all price assertions placed on its consensus markets. These price quotes are combined using a weighted average to arrive at a real-time consensus price. The weights in individual liquidity pools are based on the amount of backing the maker is willing to put behind the price quote.


#### Takers

Takers place long or short trades, always choosing which direction (call or put):

* A call trade is a bet that the consensus price goes up over the time duration of the trade.
* A put trade is a bet that the consensus price goes down over the time duration of the trade.
* A long position is where the taker pays the option premium and the trade backing comes from the maker’s token backing.
* A short position is where the taker receives the option premium paid directly to their wallet, but must put up the DiscoveryDEX token backing for the duration of the trade.  The backing is refunded at expiration, minus any payout due to price movement (see below).


#### Trades

All trades are either calls or puts with a strike price set at the current market consensus price (point A in both call and put diagrams below).  Trades last for the fixed time duration of the pool.  At the end of the time duration, trades pay out according to where the market consensus price is at expiration. The trade pays out as multiples of the premium paid, as shown in the diagram.

As an example, point B in both the call and put payouts is positioned at approximately the 50% profit point (the trade pays back to the taker the original premium paid, plus 50%).  If the taker paid 10 tokens for a long position, represented by the height of the blue shaded region, in this example they would receive 15 tokens back.  If the taker received 10 tokens in premium for a short position (and put up 100 tokens in backing), they would get 85 tokens back (100 backing minus 15 tokens trade profit) at the completion of the trade.

On the other hand, point C in the diagram is “out of the money” indicating that the market consensus price moved in the opposite direction from the profitable direction of the long trade.  If the taker paid 10 tokens for a long position, they would receive nothing at the trade expiration.  If the taker received 10 tokens in premium for a short position (and put up 100 tokens in backing), they would get the full 100 tokens back at trade completion for a profit of the original 10 premium tokens.

![](/img/whitepaper_images/call_put_payout.png)

It should be obvious that the taker will want to pay as little premium as possible for a long position in order to tighten the profit bands so the same consensus price movement over the option’s time duration pays out more.  For a short position, the taker will generally want a large premium in order to lessen the potential profitability for a given price movement.


#### Liquidity Pools

In order to concentrate liquidity, DiscoveryDEX pools are standardized by time durations.  As an example, these may be:

* 5-minute
* 15-minute
* 1-hour
* 4-hour
* 12-hour

As mentioned, each liquidity pool maintains its internal premium rate, a number that adjusts based on total pool backing and the trade backing for the trade in a similar way to how an AMM bonding curve works.  However, the premium rate is not tied to liquidity as with an AMM.  The purpose is to approximate how premium would tend to go up with increased demand and go down with reduced demand on traditional markets.

Specifically, for long trades:
![](https://i.imgur.com/FF4y66B.png)

Short trades:
![](https://i.imgur.com/VHMH380.png)

In both cases the new premium in the pool’s smart contract is updated to the latest trade premium for the last successful trade.


#### Markets

Consensus markets must contain at least one liquidity pool, but may have multiple pools of various time durations.  The combined consensus price for the market is the consensus price for each liquidity pool, weighted inversely based on the pool premium for each pool.  The formula is:

![](https://i.imgur.com/nyijcD1.png)

In general, pools with shorter time durations will have less premium because there is less potential price movement over the smaller amount of time.  Therefore, the pools with the shortest time durations will generally have the most weight in the market consensus.  Note that the weighting is determined by market conditions so in some cases this may not always be true, for example if premium from a specific pool becomes heavily bought or sold.

The market’s creator decides what time durations will be listed and the number of liquidity pools to create.  The creator may add time durations later, but in general once a time duration is created it cannot be deleted if it has token backing.

Makers join the liquidity pool by providing a price assertion in addition to the backing they add to the pool.  As multiple makers join a pool, their price assertions will naturally form a distribution of prices, due to maker disagreement and the underlying observed price drifting over time.  No assumptions are made in DiscoveryDEX protocol about the shape of distribution, except that it will have an average (weighted by token backing).  For visualization purposes a bell curve can be used, because the outlying prices away from the consensus will generally have less token backing due to more active trade matching as well as more risk for makers placing those quotes.

![](https://i.imgur.com/XAD9XyP.png)

It is the responsibility of the maker to keep their price assertions up-to-date.  If they fail to do so, their quote will drift over time from the center to the edges as the consensus moves, eventually becoming an outlier in the pool’s price distribution and will be more likely to be traded (see the following section on linear premium approximation).


#### Linear Premium Approximation

A pool’s outlying price quotes are matched first when trades come in, according to the same linear premium pricing approximation inherited from Microtick protocol.  It relies on the fact that the delta of an at-the-money option will almost always be close to +/- 0.5.  Using a linear approximation is much easier to compute than a complex option pricing formula such as Black-Scholes, and since DiscoveryDEX is designed specifically for at-the-money options a linear approximation will work well.

For long call (and short put) trades, the lowest price assertions in a pool’s price distribution are matched first because they have the lowest (highest) premiums.  For long put (and short call) trades, the highest price assertions in a pools price distribution are matched first because they have the lowest (highest) premiums. This is summarized in the table below:

For a long trade, the difference between paid premium and received premium is paid to the liquidity pool as a fee.  For a short trade, the difference between the received premium and the pool premium Therefore the liquidity pool earns its fees based on price disagreement between makers in the pool.

The following diagram illustrates how a maker with a price assertion below the current market consensus is matched for a long call trade, the result being the collateral pool receives a lower fair value premium than the paid pool premium.  In this example, the taker pays the pool premium, the collateral pool receives the fair value premium, and the liquidity pool receives the difference.

![alt_text](/img/whitepaper_images/Linear_approximation-long_call.png "Linear approximation - Long call")

Conversely, for a short call trade, the trade is matched first against makers with assertions higher than the consensus because these represent higher fair value.  In this example, the taker receives the pool premium but the collateral pool pays out the higher fair value.  The difference again goes into the liquidity pool as a fee.

![alt_text](/img/whitepaper_images/Linear_approximation-short_call.png "Linear approximation - Short call")

From these diagrams and the description it should be easy to visualize how a long put would match against the lowest fair value premium using the second chart and a short put would match against highest fair value premium on the first chart.  These cases are summarized in the table below:


<table>
  <tr>
   <td><strong>Type</strong>
   </td>
   <td><strong>Direction</strong>
   </td>
   <td><strong>Matched First:</strong>
   </td>
  </tr>
  <tr>
   <td>Long
   </td>
   <td>Call
   </td>
   <td>Lowest price assertions
   </td>
  </tr>
  <tr>
   <td>Short
   </td>
   <td>Call
   </td>
   <td>Highest price assertions
   </td>
  </tr>
  <tr>
   <td>Long
   </td>
   <td>Put
   </td>
   <td>Highest price assertions
   </td>
  </tr>
  <tr>
   <td>Short
   </td>
   <td>Put
   </td>
   <td>Lowest price assertions
   </td>
  </tr>
</table>


#### Collateral Pools

Collateral pools are the token pool that consensus option trades are executed against.  A maker’s token backing from the liquidity pool, once matched to a trade, is moved to the collateral pool and the maker receives a percentage claim against the pool’s total collateral in return.  Whether the collateral pool earns or loses tokens depends solely on whether the trades that are undertaken are successful for the taker(s) placing those trades.  In other words, the collateral pool is the counter party for all option trades executed in DiscoveryDEX consensus markets.  The purpose for pooling tokens in this manner is to distribute risk from individual trades.

A maker’s claim against the collateral pool is timestamped to the expiration time of the latest trade they have been matched against.  If a maker already has a collateral claim with a timestamp, the new timestamp is updated to whichever time is the latest.  A maker’s claim cannot be withdrawn from the collateral pool until after this timestamp.

When withdrawing collateral, the maker receives a portion of the total pool collateral according to the percentage basis of their claim.  If the collateral pool has earned tokens over the time the maker has had the claim, the maker earns a corresponding percentage.  If the pool has lost tokens, the maker loses the corresponding amount.

The maker is not required to withdraw collateral after the expiration timestamp - they may opt to let their backing remain in the collateral pool for as long as they determine it is in their best interest at their sole discretion.  Withdrawn collateral can be claimed back into a liquidity pool, in which case the maker must supply a new price assertion for the token backing, similar to how makers provide price assertions when adding new collateral.  Collateral can also be withdrawn directly into a wallet.


#### Collateral Pools versus Liquidity Pools

While in a collateral pool, a maker does not have to continually update prices so under some conditions this may be desirable.  Instead, makers are exposed to trade risk in the collateral pool (although they can earn trade profits too).

Liquidity pool backing earns a stable increasing return over time because there is no case where the pool loses tokens.  Keep in mind however, in the liquidity pool makers must pay chain gas fees to update their prices in order to stay close to the middle of the distribution, so they don’t get trade matched and moved into the collateral pool.  Which pool is better is a factor of market conditions, gas fees and the magnitude of price disagreement between makers.


#### Trade Execution

Trade execution is handled through the trade matching and trade execution functions according to the diagram below.  At trade initiation the trade is assigned a strike price and an expiration time.  These are unique to the trade depending on the time the trade is placed, the consensus price at that time, and the liquidity pool’s duration.

The following diagram is for long trades (takers pay premium, collateral comes from maker’s backing).  For short trades the premium is paid from the maker’s backing, and the taker provides the premium.

![alt_text](/img/whitepaper_images/DiscoveryDEX_block_diagram.png "DiscoveryDEX Block Diagram")


The following table summarizes the actions taken for trade initiation and expiration for long and short trades:
<table>
  <tr>
   <td><strong>Trade Type</strong>
   </td>
   <td><strong>Trade Initiation</strong>
   </td>
   <td><strong>Trade Expiration</strong>
   </td>
  </tr>
  <tr>
   <td>Long
   </td>
   <td>
<ul>

Trade backing is moved to the collateral pool from the maker’s price assertion backing.

Taker pays pool premium

Collateral pool receives fair value premium (always less than the pool premium).

Liquidity pool earns (pool premium - fair value premium).

Maker's collateral claim is timestamped with the trade expiration if the trade expiration is after the current timestamp.

</ul>
   </td>
   <td>
<ul>

Collateral pool pays trade rewards to taker.

</ul>
   </td>
  </tr>
  <tr>
   <td>Short
   </td>
   <td>
<ul>

Trade backing is provided by the taker.

Taker receives pool premium.

Collateral pool pays fair value premium (always greater than the pool premium)

Liquidity pool earns (fair value premium - pool premium).

</ul>
   </td>
   <td>
<ul>

Collateral pool receives trade rewards.

Taker is refunded (trade backing - trade rewards).

</ul>
   </td>
  </tr>
</table>
