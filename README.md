# backend-api
Node application for providing API endpoints to CS:GO server management


## Routes

| Route                           | HTTP method | Description                |
| ------------------------------- | ----------- | -------------------------- |
| /api/v1/servers                 | GET         | Get all servers            |
| /api/v1/servers/start           | GET         | Start all servers          |
| /api/v1/servers/stop            | GET         | Stop all servers           |
| /api/v1/servers/:server/start   | GET         | Start specific server      |
| /api/v1/servers/:server/stop    | GET         | Stop specific server       |
| /api/v1/servers/:server/execute | POST        | Execute commands on server |
