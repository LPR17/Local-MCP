//Import Dependencies
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {z} from 'zod';

//First Instantiate the MCP server with basic metadata
//This server acts as the main interface to handle communication with the client
const server = new McpServer({
    name : 'Test',  // Server name
    version : '1.0.0'  // Server version
})

//Tools
//Tools help LLM to make actions through the server
server.tool(
    'fetch-weather',                                         //Tool title
    'Tool to fetch the weather of a city',                   //Tool Description
    { //Parameters
        city: z.string().describe('City Name'),
    },
    async ({city}) => {                                      // Action performed when tool is called
        const respose = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`)
        const data = await respose.json()

        if (data.length === 0){
            return{
            content: [                                           // Response content
                    {
                        type: 'text',
                        text: `No information found for ${city}`
                    }
                ]
            }
        }
        const {latitude, longitude} = data.results[0]

        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,precipitation,is_day,rain&forecast_days=1`)
        const weatherData = await weatherResponse.json()

        return{
        content: [                                           // Response content
                {
                    type: 'text',
                    text: JSON.stringify(weatherData, null, 2)
                }
            ]
        }
    })

// Set up communication channel between the client and the server via standard input/output
const transport = new StdioServerTransport()
await server.connect(transport);