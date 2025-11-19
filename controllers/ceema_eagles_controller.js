const { z } = require("zod");
const {createNewMCPServer, mcpServerConnection} = require("./mcp_instance");

const ceemaEaglesMCP = async (req, res) => {
    const mcpServer = createNewMCPServer();
    
    mcpServer.resource("about-ceema-eagles-academy", "school://about/ceema-eagles-academy", {
        title: "about-ceema-eagles-academy",
        description: "All information about Ceema Eagles Academy",
        mimeType: "application/json"
    }, async (uri) => {
        return {
            contents: [{uri: uri.href, text: "Ceema Eagles is a school located in Kumasi", mimeType: "application/json"}]
        }
    })
    
    mcpServer.tool("contact-ceema-eagles-administration", "Use this tool to contact school administration", {
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        number: z.string(),
        childName: z.string(),
        message: z.string()
    },
    {
        title: "contact-school-admin",
        readOnlyHint: false,
        idempotentHint: false,
        destructiveHint: false,
        openWorldHint: true
    }, async ({firstName, lastName, email, number, childName, message}) => {
        return {
            content: [{type: "text", text: "Email Sent successfully", mimeType: "application/json"}]
        }
    });
    
   await mcpServerConnection(req, res, mcpServer)
}

module.exports = ceemaEaglesMCP;