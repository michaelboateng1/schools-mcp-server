const { z } = require("zod");
const {createNewMCPServer, mcpServerConnection} = require("./mcp_instance");

const test = function (req, res) {
    console.log("it's working")
}

module.exports = test;