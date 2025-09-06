veggiemarket-ci-cd/
├─ backend/                # Node.js backend
│  ├─ Dockerfile
│  ├─ package.json
│  └─ server.js
├─ website/                # React frontend
│  ├─ Dockerfile
│  ├─ package.json
│  ├─ nginx.conf
│  ├─ src/
│  └─ public/
├─ docker-compose.yml      # Local Docker setup
├─ docker-compose.prod.yml # Production Docker setup
├─ Jenkinsfile             # Jenkins CI/CD pipeline
└─ .github/workflows/      # GitHub Actions workflows






Prerequisites

Docker & Docker Compose

Node.js & npm

Git

Docker Hub account

Local Setup

Clone repository

git clone https://github.com/abhilashshivarchaka/veggiemarket-ci-cd.git
cd veggiemarket-ci-cd


Frontend

cd website
npm install
npm run build


Builds production-ready frontend in website/build.

Backend

cd ../backend
npm install


Backend uses Express and MongoDB.

Run locally using Docker Compose

docker-compose up -d


Frontend: http://localhost:80

Backend: http://localhost:5000

Docker Build & Push

Frontend

cd website
docker build -t abhilash29/veggiemarket-frontend:latest .
docker login
docker push abhilash29/veggiemarket-frontend:latest


Backend

cd ../backend
docker build -t abhilash29/veggiemarket-backend:latest .
docker push abhilash29/veggiemarket-backend:latest

Deployment

Production with Docker Compose

docker-compose -f docker-compose.prod.yml up -d


Runs frontend and backend in production mode.

Optional Kubernetes Deployment

kubectl apply -f k8s/deployment.yaml


Scales applications and provides advanced deployment options.

Nginx Frontend Configuration

Serves React build/ folder at /usr/share/nginx/html

Custom config in website/nginx.conf

Exposed port: 80

Environment Variables

Backend

PORT – server port (default: 5000)

MONGO_URI – MongoDB connection string

Frontend

REACT_APP_API_URL – backend API URL

CI/CD Pipeline

GitHub Actions / Jenkins automate:

Docker image build (frontend & backend)

Push images to Docker Hub

Deploy via Docker Compose or Kubernetes

Typical Flow

Push code to GitHub

CI workflow builds Docker images

Images pushed to Docker Hub

Deployment updated automatically

Commands & Useful Notes

Check running containers: docker ps

View logs: docker logs <container>

React production build: npm run build

Serve frontend locally:

npm install -g serve
serve -s build

References

React Deployment Docs

Docker Docs
<img width="1024" height="1536" alt="veggie project" src="https://github.com/user-attachments/assets/1b479974-589b-444f-b6b2-342120bbe7a4" />

<img width="1867" height="968" alt="front end" src="https://github.com/user-attachments/assets/d7230d80-d1d6-47d6-ab77-170c0b44afc1" />

<img width="1867" height="968" alt="front end" src="https://github.com/user-attachments/assets/84728a91-1779-4a7b-bba4-4f2cf6203783" />


