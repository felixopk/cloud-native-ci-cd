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
          image = "felixopk101/backend"
          name  = "backend-container"
          port {
            container_port = 5000
          }
        }
      }
    }
  }
}
