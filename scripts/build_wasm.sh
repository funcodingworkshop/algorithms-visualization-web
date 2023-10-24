rm -rf build_wasm
mkdir -p build_wasm

emcc --bind -o build_wasm/alg.js src_cpp/main.cpp
