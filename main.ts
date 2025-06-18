import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {z} from 'zod'

//First we create the server
//Main interface with MCP. Manages coms between client<->server

const server = new McpServer({
    name : 'Test',
    version : '1.0.0'
})

//Tools
//Tools help LLM to make actions through the server

server.tool(
    'fetch-weather', //Tool title
    'Tool to fetch the weather of a city', //Tool Description
    {
        city: z.string().describe('City Name'),
        country: z.string().describe('Country code'),
    },
    async ({city}) => {
        //Action
        return{
        content: [
                {
                    type: 'text',
                    text: `The weather in ${city} is sunny`
                }
            ]
        }
    })