# Algorithms Visualization Web Project

## How to build

Install Emscripten Compiler

Install latest version of emscripten compiler https://emscripten.org/docs/getting_started/downloads.html

Run source emsdk_env.sh to set env variables
`source ./emsdk_env.sh `

Development mode

* npm run build_wasm - builds wasm
* npm run dev - start the app in dev mode with webpack dev server

The app will be running at http://localhost:8080

Production mode

* npm run build_wasm - builds wasm
* npm run build - builds production JS bundle
* npm start - TODO
