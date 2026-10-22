#!/bin/bash

# ===================================================================
# 🌾 SMART FARMER ASSISTANT - Application Runner
# Digital India Innovation • Viksit Bharat 2047 | Batch 2B15
# ===================================================================

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "🌾 Starting Smart Farmer Assistant..."

# 1. Clean up any existing instances on ports 8080 and 3000
echo "🧹 Checking and freeing ports 8080 and 3000..."
EXISTING_PIDS=$(lsof -ti :8080 -ti :3000 2>/dev/null)
if [ -n "$EXISTING_PIDS" ]; then
    echo "Stopping existing processes (PIDs: $EXISTING_PIDS)..."
    kill -9 $EXISTING_PIDS 2>/dev/null
    sleep 1
fi

# 2. Configure Java Environment
if /usr/libexec/java_home -v 21 >/dev/null 2>&1; then
    export JAVA_HOME=$(/usr/libexec/java_home -v 21)
elif /usr/libexec/java_home >/dev/null 2>&1; then
    export JAVA_HOME=$(/usr/libexec/java_home)
fi

echo "☕ Using Java: $JAVA_HOME"

# 3. Start Spring Boot Backend
echo "🚀 Starting Spring Boot Backend on http://localhost:8080..."
(cd "$PROJECT_ROOT/Backend" && ./mvnw spring-boot:run) &
BACKEND_PID=$!

# Wait for backend to be ready
echo "⏳ Waiting for Backend to be online..."
while ! nc -z localhost 8080 2>/dev/null; do
    sleep 1
done
echo "✅ Backend is ONLINE at http://localhost:8080!"

# 4. Start React Frontend
echo "🚀 Starting React Frontend on http://localhost:3000..."
(cd "$PROJECT_ROOT/frontend" && BROWSER=none PORT=3000 npm start) &
FRONTEND_PID=$!

# Wait for frontend to be ready
echo "⏳ Waiting for Frontend to compile..."
while ! nc -z localhost 3000 2>/dev/null; do
    sleep 1
done
echo "✅ Frontend is ONLINE at http://localhost:3000!"

# Open Browser automatically
if which open >/dev/null 2>&1; then
    open http://localhost:3000
fi

echo ""
echo "=========================================================="
echo "🌾 Smart Farmer Assistant is now running!"
echo "👉 Frontend Portal: http://localhost:3000"
echo "👉 Backend REST API: http://localhost:8080"
echo "👉 H2 DB Web Console: http://localhost:8080/h2-console"
echo "🔑 Demo Credentials: see LOGIN_DATA.md"
echo "Press Ctrl+C to stop both servers."
echo "=========================================================="

cleanup() {
    echo ""
    echo "Stopping Smart Farmer Assistant services..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    kill -9 $(lsof -ti :8080 -ti :3000 2>/dev/null) 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM
wait
