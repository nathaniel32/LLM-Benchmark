docker build -t llm-benchmark .
docker run --name benchmark-app -p 5000:5000 llm-benchmark