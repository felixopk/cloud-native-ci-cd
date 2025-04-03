resource "kubernetes_deployment" "frontend" {
  metadata {
    name = "frontend-app"
    labels = {
      app = "frontend"
    }
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        app = "frontend"
      }
    }

    template {
      metadata {
        labels = {
          app = "frontend"
        }
      }

      spec {
        container {
          name  = "frontend-container"
          image = "felixopk101/frontend-app:v2" # Ensure this is accessible

          port {
            container_port = 80
          }
        }
      }
    }
  }
}
