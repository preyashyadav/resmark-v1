# What is ResMark? 

ResMark is system designed to streamline attendance and quiz monitoring in educational institutions by integrating geolocation technology with the robust security of blockchain. Built on ResilientDB and ResVault, this system offers a secure and tamper-proof solution to ensure fairness and accuracy in tracking students' attendance and quiz submissions. Using HTML5 Geolocation and JavaScript, ResMark determines the coordinates of the classroom location and verifies whether a student’s request originates within a 50-meter proximity of the class. If the student is physically present within this geofenced area, they are granted access to mark their attendance and proceed to take the quiz. By combining geofencing and blockchain, ResMark eliminates fraudulent attempts at remote check-ins or quiz submissions, ensuring that attendance and quiz participation are strictly tied to physical presence.

# Technology stack
- Web Application: ReactJS, HTML5/CSS3, JavaScript, TailwindCSS
- Backend: NodeJS, ExpressJS, Python, GraphQL
- Database: ResilientDB (blockchain), MongoDB, resilient-node-cache (package for syncing)
- APIs: HTML5 Geolocation API

# Running the Application

## Prerequisites

Before running the ResMark application, you need to start KV service on the ResDB backend and the SDK and setup the ResVault.

### ResilientDB
Clone the resilientDB repository and follow the instructions to set it up:
```bash
git clone https://github.com/apache/incubator-resilientdb
```
Setup KV Service:
```bash
./service/tools/kv/server_tools/start_kv_service.sh
```

### SDK
Clone the GraphQL Repository and follow the instructions on the ReadMe to set it up:

Install GraphQL:
```bash
git clone https://github.com/ResilientApp/ResilientDB-GraphQL
```

Setup SDK:
```bash
bazel build service/http_server:crow_service_main

bazel-bin/service/http_server/crow_service_main service/tools/config/interface/client.config service/http_server/server_config.config
```

### ResVault

```bash
git clone https://github.com/apache/incubator-resilientdb-resvault
```

Steps -
1. Generate the build file
2. Enable developr mode and unpack the build file in chrome extensions.
3. Register on ResVault

## Running the ResMark Application

Clone the repo and open it in a new folder.

```bash
git clone https://github.com/preyashyadav/resmark-v1/
cd resmark-v1
```

For syncing between ResDB and mongoDB package called resilient-node-cache. 
To install this -
```bash
npm i resilient-node-cache
```

Install other dependencies
```bash
npm install
```

To run the code - 
#### ResMark - Client
```bash
cd client
npm start
```
Application will be deployed on http://localhost:3000.

#### ResMark - Server
```bash 
cd server
npm start
```
Server runs on http://localhost:5000 in development mode.
