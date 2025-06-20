# LLM Benchmark

## Getting Started

Follow these steps to set up and run the server:

### 1. Clone the Repository

```bash
git clone https://github.com/nathaniel32/LLM-Benchmark.git
cd LLM-Benchmark
````
### with Docker

#### 1. Build

```bash
docker build -t llm-benchmark .
```

#### 2. Run

```bash
docker run -p 5000:5000 llm-benchmark
```

### without Docker

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Start the Server

```bash
npm start
```

The server will start on `http://localhost:5000`.

## Data Control

Once the server is running, you can manage your data at:

```
http://localhost:5000/admin
```

## API Documentation

After starting the server, you can access the Swagger UI at:

```
http://localhost:5000/api-docs
```

<!-- 
npm install sqlite3
npm install express
npm install swagger-ui-express swagger-jsdoc

erwan2/DeepSeek-R1-Distill-Qwen-1.5B:latest
erwan2/DeepSeek-R1-Distill-Qwen-7B:latest
cyberuser42/DeepSeek-R1-Distill-Llama-8B:latest 
-->