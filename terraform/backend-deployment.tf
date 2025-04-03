resource "kubernetes_deployment" "backend" {
  metadata {
    name = "backend-app"
    labels = {
      app = "backend"
    }
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        app = "backend"
      }
    }

    template {
      metadata {
        labels = {
          app = "backend"
        }
      }

      spec {
        container {
          name  = "backend-container"
          image = "felixopk101/backend:v2" # Ensure this image exists

          port {
            container_port = 5000
          }

          env {
            name  = "MONGO_URI"
            value = "mongodb://mongo-service:27017/mydatabase" # Update with your DB service name
          }

          env {
            name  = "PORT"
            value = "5000"
          }
        }
      }
    }
  }
}
