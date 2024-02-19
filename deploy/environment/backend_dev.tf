terraform {
  backend "gcs" {
    bucket  = "remote-config-dataquest-dev"
    prefix  = "frontend.tfstate"
  }
}

