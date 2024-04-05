
resource "google_service_account" "sa-cloudrun-frontend" {
  project = var.project_id
  account_id   = "sa-cloudrun-frontend"
  description  = "SA used by Cloud Run for the react front end"
  display_name =  "sa-cloudrun-frontend"
}

resource "google_project_iam_member" "cloudrun_backend_access" {
  project = var.project_id
  role    = "roles/run.admin"
  member  = "serviceAccount:${google_service_account.sa-cloudrun-frontend.email}"
}
