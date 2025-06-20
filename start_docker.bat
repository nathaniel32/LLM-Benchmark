@echo off
echo Building Docker image...
docker build -t llm-benchmark .
if errorlevel 1 (
    echo [ERROR] Build failed.
    exit /b 1
)

echo Running Docker container...
docker run -p 5000:5000 llm-benchmark