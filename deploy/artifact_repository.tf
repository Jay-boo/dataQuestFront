
resource "google_artifact_registry_repository" "front_artifact_repo" {
  project       = var.project_id
  location      = var.region
  repository_id = var.artifact_repo_name
  description   = "Repository containing the image of the data collector"
  format        = "DOCKER"
  mode          = "STANDARD_REPOSITORY"
  depends_on=[]
}
