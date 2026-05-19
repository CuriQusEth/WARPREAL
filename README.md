# WarpReal Orchestrator (WARP REALM)

WarpReal is a mesmerizing realm-hopping adventure game featuring a sophisticated Model Context Protocol (MCP) orchestrator algorithm. It seamlessly performs real-time operations, logic execution, and automation tasks.

## Project Overview

- **Realm-Hopping Adventure**: Swipe to warp between realms. Each level features new environments, physics, and generative visual effects.
- **On-Chain Integration**: Integrated with Base Mainnet to securely record your journey using SIWE (Sign-In with Ethereum) and real smart contract transactions.
- **Trustless Agents**: Support for ERC-8004 for agent intent routing and execution recording capabilities.
- **Cross-App Execution Attribution**: Includes full support for ERC-8021 execution tags to ensure builders are properly attributed for all generated transaction volume.
- **Meso-Scale Progression**: Collect Realm Shards & Aether Orbs. Try to reach the deepest realm depth before the multiverse collapses!
- **Agent Orchestrator**: Supports Model Context Protocol (MCP) endpoints and active command execution capability.

## Tech Stack

* **Frontend**: Next.js 14 App Router, React 19, Tailwind CSS v4, Framer Motion, HTML5 Canvas API.
* **Web3 Integration**: Wagmi, Viem, Next.js API Routes, SIWE.
* **Agent Context**: Full implementation of MCP and Agent APIs for external system interaction.

## Agent Card Information

The agent conforms to standard ERC-8004 formatting (Version 1.0.0). The full capabilities and service endpoints can be openly accessed using the well-known discovery protocol at `https://warpreal.vercel.app/.well-known/agent-card.json`.

**Agent Capabilities:**
- `real-time-operations`
- `warp-mechanics`
- `dynamic-content-management`
- `multi-task-automation`
- `live-orchestration`
- `mcp-command-execution`

**Live Endpoints:**
- Main Site: `https://warpreal.vercel.app`
- Agent API: `https://warpreal.vercel.app/api/agent`
- MCP Endpoint: `https://warpreal.vercel.app/api/mcp`

## Model Context Protocol (MCP) Guide

This project features a fully compatible MCP endpoint to enable Agent-to-Agent (A2A) and interface logic.

**Endpoint Details:**
- URL: `https://warpreal.vercel.app/api/mcp` (Production) / `http://localhost:3000/api/mcp` (Local)
- Method: `GET` / `POST` (JSON-RPC 2.0)

**Available Skills (Tools):**
- `get_race_status`: Get the current running race status.
- `start_race`: Start a new race.
- `get_leaderboard`: Retrieve the current leaderboard.
- `optimize_speed`: Optimize speed parameters.
- `get_track_info`: Get track information.

**To test the MCP local orchestration:**
1. Ensure the development server is running locally on port 3000.
2. Send an `initialize` JSON-RPC POST request to the MCP endpoint according to the standard specs.
3. Call `tools/list` to receive the full list of enabled operational tools.

## Local Setup

1. **Clone the repository:** Download the project files to your local machine.
2. **Install dependencies:** Run `npm install`.
3. **Environment Setup:** Copy `.env.example` to `.env` and fill in any required variables.
   ```bash
   cp .env.example .env
   ```
4. **Start Development Server:**
   ```bash
   npm run dev
   ```
5. Navigate to `http://localhost:3000` to interact with the game and test endpoints.

*Note: No private keys, wallet secrets, or restricted registry configurations are stored in this repository.*
