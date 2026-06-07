import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Static files in public
  app.use(express.static(path.join(process.cwd(), 'public')));

  app.use(express.json());

  // API endpoints for MCP / Agent
  const mcpHandlerGet = (req: any, res: any) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.json({
      protocol: "MCP",
      version: "1.0.0",
      name: "WarpReal MCP Endpoint",
      status: "active",
      description: "Active MCP server for WarpReal Orchestrator Agent",
      capabilities: ["real-time-operations", "warp-mechanics", "dynamic-content-management"],
      timestamp: new Date().toISOString()
    });
  };

  const mcpHandlerPost = (req: any, res: any) => {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    try {
      const body = req.body || {};
      const id = body.id || null;
      
      if (body.method === 'initialize') {
        return res.json({
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: { tools: {}, prompts: {}, resources: {} },
            serverInfo: { name: 'WarpReal MCP Endpoint', version: '1.0.0' }
          }
        });
      }

      if (body.method === 'tools/list') {
        return res.json({
          jsonrpc: '2.0',
          id,
          result: {
            tools: [
              { name: 'get_race_status', description: 'Get the current running race status.', inputSchema: { type: 'object', properties: {} } },
              { name: 'start_race', description: 'Start a new race.', inputSchema: { type: 'object', properties: {} } },
              { name: 'get_leaderboard', description: 'Retrieve the current leaderboard.', inputSchema: { type: 'object', properties: {} } },
              { name: 'optimize_speed', description: 'Optimize speed parameters.', inputSchema: { type: 'object', properties: {} } },
              { name: 'get_track_info', description: 'Get track information.', inputSchema: { type: 'object', properties: {} } }
            ]
          }
        });
      }

      if (body.method === 'tools/call') {
        const toolName = body.params?.name;
        return res.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: `Tool ${toolName} executed successfully. [PLACEHOLDER for actual implementation]` }]
          }
        });
      }

      if (body.method === 'prompts/list') {
        return res.json({ jsonrpc: '2.0', id, result: { prompts: [] } });
      }

      if (body.method === 'resources/list') {
        return res.json({ jsonrpc: '2.0', id, result: { resources: [] } });
      }

      res.json({
        jsonrpc: '2.0',
        id,
        result: {
          status: "success",
          message: "MCP command received",
          agent: "WarpReal Orchestrator",
          receivedAt: new Date().toISOString(),
          payload: body
        }
      });
    } catch (error) {
      res.status(400).json({ jsonrpc: '2.0', error: { code: -32700, message: "Parse error" } });
    }
  };

  const agentHandlerGet = (req: any, res: any) => {
    res.json({
      name: "WarpReal Orchestrator",
      status: "active",
      wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
      platform: "WarpReal",
      version: "1.0.0"
    });
  };

  const agentHandlerPost = (req: any, res: any) => {
    try {
      const body = req.body || {};
      res.json({
        status: "success",
        message: "Agent operational command received",
        agent: "WarpReal Orchestrator",
        receivedAt: new Date().toISOString(),
        payload: body
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid Agent request" });
    }
  };

  app.options("/api/paymaster", (req, res) => {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.status(204).end();
  });

  app.post("/api/paymaster", async (req, res) => {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    try {
      const paymasterUrl = "https://api.developer.coinbase.com/rpc/v1/base/leLFnweOIe3IS05mdklyuy59QDLWVCas";
      
      const response = await fetch(paymasterUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Paymaster Proxy Error:", error);
      res.status(500).json({ error: "Paymaster error" });
    }
  });

  app.get("/api/mcp", mcpHandlerGet);
  app.post("/api/mcp", mcpHandlerPost);
  app.options("/api/mcp", (req, res) => {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.status(204).end();
  });

  app.get("/app/api/mcp", mcpHandlerGet);
  app.post("/app/api/mcp", mcpHandlerPost);
  app.options("/app/api/mcp", (req, res) => {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.status(204).end();
  });

  app.get("/api/agent", agentHandlerGet);
  app.post("/api/agent", agentHandlerPost);
  app.get("/app/api/agent", agentHandlerGet);
  app.post("/app/api/agent", agentHandlerPost);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
