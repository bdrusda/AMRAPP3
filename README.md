# My Notes - Running

# TODO write startup script that we can just call

-- will get node scripts working in time, tabling for now --

For client - npm start (inside client folder)
For server - run the Server debug launch script (which now uses ts-node)

# I think the attach is the important part, causes vscode to actually recognize the breakpoints

In case we lose them, here are the scripts:

Client:
"scripts": {
"start": "react-scripts start",
"build": "react-scripts build",
"test": "react-scripts test",
"eject": "react-scripts eject"
},

Server:
{
"name": "Server debug",
"type": "node",
"request": "launch",
"cwd": "${workspaceFolder}/server",
    "runtimeExecutable": "${workspaceFolder}/server/node_modules/nodemon/bin/nodemon.js",
"program": "${workspaceFolder}/server/index.tsx",
"runtimeArgs": ["--inspect"],
"restart": true,
"console": "integratedTerminal",
"internalConsoleOptions": "neverOpen"
},
