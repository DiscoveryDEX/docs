---
sidebar_position: 1
---
# Option pricing applied to the oracle problem

DiscoveryDEX takes a novel approach to gather accurate price inputs on-chain. Rather than dividing time into epochs, DiscoveryDEX creates a set of markets trading option contracts of standardized time _duration_. Each maker “quote” consists of a single price input and DiscoveryDEX token backing used for trades matched against the quote.  The weighted average of price inputs is calculated based on the amount of token backing for each quote.  This average is updated block by block inside the smart contract, resulting in a real-time consensus price that automatically updates with every change in backing or price value.

The distinguishing characteristics of DiscoveryDEX operation can be summarized by the following bullet points:

* Smart contract based.
* Consensus estimation does not require tokenization of the underlying assets, but for on-chain futures trading this is still necessary.  In theory off-chain assets could be traded with futures and an on-chain consensus using the same mechanism as will be discussed below.
* Similar to decentralized oracle pools, DiscoveryDEX uses Schelling points and averages of price assertions.
* DiscoveryDEX does not use epochs, slashing or reputation. Instead, it creates trading opportunities using option pricing to adjust quotes in real-time (block-by-block).
* Can theoretically run on multiple chains.  Very easy to combine liquidity cross-chain - assuming the same backing token (or wrapped equivalent) is used for each chain.
* Similar to AMMs, DEXs or oracles, the market price from the on-chain smart contract can double as a price oracle for other Dapps.
