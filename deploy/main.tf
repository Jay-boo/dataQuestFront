terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.84.0"
    }
  }
}



provider "google" {
  project = var.project_id
  region  = var.region
}
provider "google-beta" {
  project     = var.project_id
  region      = var.region
}

