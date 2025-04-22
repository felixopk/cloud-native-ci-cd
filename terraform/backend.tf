terraform {
  backend "s3" {
    bucket = "oppg-tfstate-bucket"
    key    = "eks/terraform.tfstate"
    region = "us-west-2"
  }
}


