const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");
const { StreamableHTTPServerTransport } = require("@modelcontextprotocol/sdk/server/streamableHttp.js");

const PORT = process.env.PORT || 3000;

function createNewMCPServer(){
    return new McpServer({
        name: "Shinig-vessels-academy",
        version: "1.0.0",
        capailities: {
            tools: true,
            resources: true
        }
    })
}

async function mcpServerConnection(req, res, mcpServer){
    const transport = new StreamableHTTPServerTransport({
        host: "localhost",
        port: PORT, 
        path: "/api/mcp-server/",
    });
    await mcpServer.connect(transport);
    await transport.handleRequest(req, res, req.body);
}

module.exports = {createNewMCPServer, mcpServerConnection, PORT}