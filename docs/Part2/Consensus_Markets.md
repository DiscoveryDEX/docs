---
sidebar_position: 2
---

# Consensus Markets

As mentioned above, DiscoveryDEX consensus markets are the result of creating a Schelling point consensus mechanism for price discovery that uses token-backed and settled options as the reward / slashing mechanism. The result is not only better suited as a fair and real-time reward incentive, it also is an oracle consensus price that promotes price competition for its hedging mechanism through trading.  Because it’s an actual on-chain market, all the stages (discovery, observation, aggregation and commitment) happen on chain so its DeFi oracle ranking approaches 4.0.

In this section we'll take a look at how the price consensus markets work in DiscoveryDEX (highlighted in green in the diagram below).

![alt_text](/img/whitepaper_images/System_Diagram.png "image_tooltip")


The consensus price that links the option and futures markets is backed by DiscoveryDEX tokens and can be directly hedged using short-term options traded over the standardized time duration, and externally arbitraged by trading the corresponding short-term token futures contract over the same time duration.  Additionally, there can be multiple consensus price pools of different time durations that feed into the same weighted consensus price.  These pools are inversely weighted by market premium, so the shorter time durations will generally have more weight in the market.

The averaging effect will tend to bring a more stable price discovery mechanism to DeFi, one that can offset the price runups and selloffs that happen frequently on order book DEXs and AMMs.
