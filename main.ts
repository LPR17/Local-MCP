import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {z} from 'zod'

//First we create the server
//Main interface with MCP. Manages coms between client<->server

const server = new McpServer({
    name : 'Test',
    version : '1.0.0'
})