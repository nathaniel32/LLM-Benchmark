# LLM Benchmark

## Getting Started

Follow these steps to set up and run the server:

### 1. Clone the Repository

```bash
git clone https://github.com/nathaniel32/LLM-Benchmark.git
cd LLM-Benchmark
````

### 2. Install Dependencies

```bash
npm install sqlite3
npm install express
npm install swagger-ui-express swagger-jsdoc
```

or

```bash
./install.bat
```

### 3. Start the Server

```bash
npm start
```

The server will start on `http://localhost:3000`.

## 📘 Data Control

Once the server is running, you can manage your data at:

```
http://localhost:3000/admin
```

## API Documentation

After starting the server, you can access the Swagger UI at:

```
http://localhost:3000/api-docs
```

Use this interface to test endpoints and explore available features.


<!-- 
erwan2/DeepSeek-R1-Distill-Qwen-1.5B:latest
erwan2/DeepSeek-R1-Distill-Qwen-7B:latest
cyberuser42/DeepSeek-R1-Distill-Llama-8B:latest 
-->