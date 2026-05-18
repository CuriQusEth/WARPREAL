# WARP REALM

Warp Realm is a mesmerizing realm-hopping adventure game featuring a sophisticated Model Context Protocol (MCP) orchestrator algorithm. It seamlessly performs real-time operations, logic execution, and automation tasks.

## Core Features
- **Realm-Hopping Adventure**: Swipe to warp between realms. Each level features new environments, physics, and generative visual effects.
- **On-Chain Integration**: Integrated with Base Mainnet to securely record your journey using SIWE (Sign-In with Ethereum) and real smart contract transactions.
- **Trustless Agents**: Support for ERC-8004 for agent intent routing and execution recording capabilities.
- **Cross-App Execution Attribution**: Includes full support for ERC-8021 execution tags to ensure builders are properly attributed for all generated transaction volume.
- **Meso-Scale Progression**: Collect Realm Shards & Aether Orbs. Try to reach the deepest realm depth before the multiverse collapses!
- **Agent Orchestrator**: Supports Model Context Protocol (MCP) endpoints and active command execution capability.

## Architecture

* **Frontend**: React 19, Tailwind CSS v4, Framer Motion, and HTML5 Canvas API for rendering visual realm elements.
* **Web3 Integration**: Wagmi, Viem, Next.js 14 App Router for specific serverless routing integrations, and SIWE for message signing.
* **Agent Context**: Full implementation of MCP and Agent APIs for interaction via external systems.

## Capabilities

The WarpReal Orchestrator offers the following on-chain and off-chain capabilities:
- `real-time-operations`
- `warp-mechanics`
- `dynamic-content-management`
- `multi-task-automation`
- `live-orchestration`
- `mcp-command-execution`

## Connecting to Model Context Protocol (MCP)

This project features a fully compatible MCP endpoint to enable Agent-to-Agent (A2A) and interface logic. 

**Endpoint Information:**
- Method: `GET` / `POST`
- URL: `http://localhost:3000/api/mcp` (Local) / `/api/mcp` (Production)
- Expected Protocol: MCP Over HTTP/JSON-RPC

To test the MCP local orchestration:
1. Ensure the development server is running locally.
2. Send an `initialize` request to the MCP endpoint according to the standard specs.
3. Call `tools/list` to receive the full list of enabled operational tools (`get_race_status`, `start_race`, `get_leaderboard`, `optimize_speed`, `get_track_info`).

## Agent Registration Info

The agent conforms to standard ERC-8004 formatting. The full capabilities, service endpoints and version specifications can be openly accessed using the well-known discovery protocol at `/.well-known/agent-card.json`.

## Getting Started

1. Clone or download the repository.
2. Run `npm install` to install dependencies.
3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and fill in any required variables.
   ```bash
   cp .env.example .env
   ```
4. Start the game locally with:
   ```bash
   npm run dev
   ```

### Running with Real-Time Agent Control

This application exposes an orchestrated API via Vercel for automation agents to interact with the Weaver mechanics directly. See `.well-known/agent-card.json` for details on supported action payloads and the orchestration endpoints, specifically the MCP (Model Context Protocol).

*NOTE: Ensure you provide your own environment variables via a `.env` file based on `.env.example`. No private or mainnet keys are committed to this repository.*
