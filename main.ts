//Import Dependencies
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {z} from 'zod'

//First Instantiate the MCP server with basic metadata
//This server acts as the main interface to handle communication with the client
const server = new McpServer({
    name : 'Test',  // Server name
    version : '1.0.0'  // Server version
})

//Tools
//Tools help LLM to make actions through the server
server.tool(
    'fetch-weather', //Tool title
    'Tool to fetch the weather of a city', //Tool Description
    { //Parameters
        city: z.string().describe('City Name'),
        country: z.string().describe('Country code'),
    },
    async ({city}) => {                                      // Action performed when tool is called

        return{
        content: [                                           // Response content
                {
                    type: 'text',
                    text: `The weather in ${city} is sunny`
                }
            ]
        }
    })

//Client connection
const transport = new StdioServerTransport()
await server.connect(transport)