---
sidebar_position: 6
---

# Blockchain Oracles

Blockchain smart contracts can’t reach out and query the internet for the current price of an asset. They rely on third parties to provide the current price of an asset, usually as separate transactions submitted to the blockchain.  It is important for these third parties to be honest and trustworthy.  Setting up the incentives for the third parties to be both honest and real-time with their prices is the job of a blockchain oracle.

The following metric can be used as a basis for ranking various blockchain-based price oracles. The diagram illustrates the stages of price discovery for any oracle. The more of those stages that happen on-chain, the higher the DeFi ranking for an oracle should be (note: this is a proposed metric for the purposes of this whitepaper and not currently an industry accepted standard).

![](https://i.imgur.com/D3bPAL0.png)

As an example, the standard approach some blockchains take for oracles is to enlist observers to input externally observed (off-chain) prices to the chain over a specified time interval or "epoch". The price inputs are collected and there is an on-chain calculation using statistical math to obtain a mean / median as well as a confidence interval or error margin for the epoch.  The observers who submitted price values that lie above or below the confidence interval are then penalized, either financially through “slashing” their token balances, or using an indirect reputation based mechanism.

This type of oracle relies on off-chain discovery and partially off-chain observation, but performs the aggregation and commitment stages on-chain.  According to the ranking above, the oracle has a DeFi ranking of between 2.0 and 3.0, depending on how decentralized the observation is.

One obvious problem with this method of collecting price inputs is prices can change, (sometimes dramatically) over the course of a time epoch, therefore by penalizing outliers these types of oracles may discourage observers from submitting a price at a new high or low even if this is the correct real-time price.

DiscoveryDEX handles outliers in a natural, real-time manner by using option pricing as described below.  Using this method, outlying price quotes are the first to be matched and there is no need for time epochs or statistical calculations, other than the weighted consensus price.  Everything, including the competitive trading happens on-chain for a theoretical decentralization ranking approaching 4.0.
