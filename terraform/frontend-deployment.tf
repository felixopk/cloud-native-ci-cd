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
          image = "felixopk101/my-frontend-app:v1"
          name  = "frontend-container"

          port {
            container_port = 80
          }
        }
      }
    }
  }
}
