# WARP REALM

Warp Realm is a mesmerizing realm-hopping adventure game where you play as a **Realm Weaver**. Travel between fractured, beautiful, and dangerous parallel realms by creating and mastering **Warp Gates**. 

## Core Features
- **Realm-Hopping Adventure**: Swipe to warp between realms. Each level features new environments, physics, and generative visual effects.
- **On-Chain Integration**: Integrated with Base Mainnet to securely record your journey using SIWE (Sign-In with Ethereum) and real smart contract transactions.
- **Trustless Agents**: Support for ERC-8004 for agent intent routing and execution recording capabilities.
- **Cross-App Execution Attribution**: Includes full support for ERC-8021 execution tags to ensure builders are properly attributed for all generated transaction volume.
- **Meso-Scale Progression**: Collect Realm Shards & Aether Orbs. Try to reach the deepest realm depth before the multiverse collapses!

## Architecture

* **Frontend**: React 19, Tailwind CSS v4, Framer Motion, and HTML5 Canvas API for rendering visual realm elements.
* **Web3 Integration**: Wagmi, Viem, Next.js for specific serverless routing integrations, and SIWE for message signing.
* **Agent Context**: Full implementation of MCP and Agent APIs for interaction via external systems.

## Getting Started

1. Clone or download the repository.
2. Run `npm install` to install dependencies.
3. Start the game with `npm run dev` and navigate to the local interface.

### Running with Real-Time Agent Control

This application exposes an orchestrated API via Vercel for automation agents to interact with the Weaver mechanics directly. See `.well-known/agent-card.json` for details on supported action payloads and the orchestration endpoints, specifically the MCP (Model Context Protocol).

*NOTE: Ensure you provide your own environment variables via a `.env` file based on `.env.example`. No private or mainnet keys are committed to this repository.*
