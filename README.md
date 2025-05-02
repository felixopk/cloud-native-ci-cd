

# cloud-native-ci-cd

# Prerequisite 

**Install Kubectl**
https://kubernetes.io/docs/tasks/tools/


**Install Helm**
https://helm.sh/docs/intro/install/

```
helm repo update
```

**Install/update latest AWS CLI:** (make sure install v2 only)
https://aws.amazon.com/cli/

**Refer to below Youtube Video Tutorial**




#update the Kubernetes context
aws eks update-kubeconfig --name my-eks-cluster --region us-west-2

# verify access:
```
kubectl auth can-i "*" "*"
kubectl get nodes
```

# Verify autoscaler running:
```
kubectl get pods -n kube-system
```

# Check Autoscaler logs
```
kubectl logs -f \
  -n kube-system \
  -l app=cluster-autoscaler
```

# Check load balancer logs
```
kubectl logs -f -n kube-system \
  -l app.kubernetes.io/name=aws-load-balancer-controller
```

<!-- aws eks update-kubeconfig \
  --name my-eks \
  --region us-west-2 \
  --profile eks-admin -->


# Buid Docker image :
**For Mac:**

```
export DOCKER_CLI_EXPERIMENTAL=enabled
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/w8u5e4v2
```

Buid Front End :

```
docker buildx build --platform linux/amd64 -t workshop-frontend:v1 . 
docker tag workshop-frontend:v1 public.ecr.aws/w8u5e4v2/workshop-frontend:v1
docker push public.ecr.aws/w8u5e4v2/workshop-frontend:v1
```


Buid Back End :

```
docker buildx build --platform linux/amd64 -t workshop-backend:v1 . 
docker tag workshop-backend:v1 public.ecr.aws/w8u5e4v2/workshop-backend:v1
docker push public.ecr.aws/w8u5e4v2/workshop-backend:v1
```

**For Linux/Windows:**

Buid Front End :

```
docker build -t workshop-frontend:v1 . 
docker tag workshop-frontend:v1 public.ecr.aws/w8u5e4v2/workshop-frontend:v1
docker push public.ecr.aws/w8u5e4v2/workshop-frontend:v1
```


Buid Back End :

```
docker build -t workshop-backend:v1 . 
docker tag workshop-backend:v1 public.ecr.aws/w8u5e4v2/workshop-backend:v1
docker push public.ecr.aws/w8u5e4v2/workshop-backend:v1
```

**Update Kubeconfig**
Syntax: aws eks update-kubeconfig --region region-code --name your-cluster-name
```
aws eks update-kubeconfig --region us-west-2 --name my-eks-cluster
```
**This is to check if you have authorised access to the EKS**
kubectl auth can-i "*" "*"



**Create Namespace**
```kubectl create ns workshop

kubectl config set-context --current --namespace workshop
```

# MongoDB Database Setup

**To create MongoDB Resources**
```
cd k8s_manifests/mongo_v1
kubectl apply -f secrets.yaml
kubectl apply -f deploy.yaml
kubectl apply -f service.yaml
```

# Backend API Setup

Create NodeJs API deployment by running the following command:
```
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
```


**Frontend setup**

Create the Frontend  resource. In the terminal run the following command:
```
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
```

Finally create the final load balancer to allow internet traffic:
```
kubectl apply -f full_stack_lb.yaml
```


# Any issue with the pods ? check logs:
```
kubectl logs -f POD_ID -f
```


# Grafana setup 

**Verify Services**
```
kubectl get svc -n prometheus
```

**edit the Prometheus-grafana service:**
```
kubectl edit svc prometheus-grafana -n prometheus
```

**change ‘type: ClusterIP’ to 'LoadBalancer'**

Username: admin
Password: prom-operator


Import Dashboard ID: 1860

Exlore more at: https://grafana.com/grafana/dashboards/

# Destroy Kubernetes resources and cluster
```
cd ./k8s_manifests
kubectl delete -f -f
```
**Remove AWS Resources to stop billing**
```
cd terraform
terraform destroy --auto-approve
```
# Fullstack Kubernetes Project - React + Node.js + MongoDB on AWS EKS

This project demonstrates a fullstack application deployed on Kubernetes (EKS on AWS).  
It consists of:
- Frontend: React
- Backend: Node.js + Express
- Database: MongoDB
- Infrastructure: AWS EKS, ALB (Application Load Balancer), Terraform, and Kubernetes manifests

---

## ⚙️ Tech Stack
- Frontend: React.js
- Backend: Node.js, Express.js, Mongoose
- Database: MongoDB
- Containerization: Docker
- Orchestration: Kubernetes (AWS EKS)
- Load Balancer: AWS ALB Ingress Controller
- Infrastructure Provisioning: Terraform

---

## 🏗️ Setup and Deployment Overview.

1. **Build Docker Images** for backend and frontend.
2. **Push Images** to a container registry (like DockerHub or ECR).
3. **Deploy** MongoDB, Backend, and Frontend to EKS using Kubernetes manifests.
4. **Expose Services** internally and externally.
5. **Set up an Ingress** using AWS ALB Ingress Controller.
6. **Access Application** via a custom domain (`app.opkcloudz.com`) with HTTPS enabled.

---

## 🚀 Deployment Commands (Quick Reference)

- Initialize Terraform:
  ```bash
  terraform init

Apply Terraform to provision AWS infrastructure:
terraform apply
docker build -t your-frontend-image .
docker build -t your-backend-image .

Push Docker images:
docker push your-frontend-image
docker push your-backend-image

Apply Kubernetes manifests:
kubectl apply -f k8s/mongodb-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/ingress.yaml

Verify deployments:
kubectl get pods
kubectl get services
kubectl get ingress
 
 🛠️Challenges Faced
 1. CrashLoopBackOff for Backend Pod
Cause: MongoDB connection issues because the database service was not reachable or environment variables were misconfigured.

Solution:

Verified MongoDB service name in Kubernetes YAML.

Ensured MONGO_CONN_STR was correctly set.

Added readiness/liveness probes for smoother startup.

2. 502 Bad Gateway from ALB
Cause:

Backend readiness issue: ALB health checks failed.

Incorrect health check paths.

Frontend expecting backend on wrong URL.

Solution:

Added a /ok health check endpoint to the backend.

Set the ALB health check annotation to /ok.

Confirmed ports matched between Service and Deployment.

3. Build Time Delays
Cause:

Multi-stage Dockerfile copying and building both frontend and backend.

Initial builds always take longer to fetch all npm packages.

Solution:

Used efficient .dockerignore files to avoid copying unnecessary files.

Separated backend and frontend into individual images to optimize build times.

Used node:alpine and lightweight base images.

Ingress Misconfigurations
Cause:

Wrong service names and ports in Ingress rules.

Missing backend pods leading to no endpoints.

Solution:

Ensured services are correctly named.

Matched Service port and Deployment containerPort.

Made sure pods were up and running before applying the Ingress.








