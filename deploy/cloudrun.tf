resource "google_cloud_run_v2_service" "react-frontend" {
  project  = var.project_id
  name     = var.service_name
  location = "europe-west1"
  ingress = "INGRESS_TRAFFIC_ALL"

  template {
    service_account = google_service_account.sa-cloudrun-frontend.email
    containers {
      image = "${var.region}-docker.pkg.dev/${var.project_id}/${var.artifact_repo_name}/${var.image_name}:${var.image_version}"
      
      resources {
        limits = {
          cpu    = "1"
          memory = "2Gi"
        }
        # Determines whether CPU should be throttled or not outside of requests
        cpu_idle = false
        startup_cpu_boost= true
      }
      liveness_probe {
          http_get {
            path = "/"
          }
          initial_delay_seconds= 3600 
          period_seconds=1000
          timeout_seconds=1
      }
      ports{
        container_port = 3000
      }
      env { 
          name = "REACT_APP_API_URL"
          value = var.api_url
      }
    }
  }
}

resource "google_cloud_run_service_iam_binding" "default" {
  project  = var.project_id
  location = google_cloud_run_v2_service.react-frontend.location
  service  = google_cloud_run_v2_service.react-frontend.name
  role     = "roles/run.invoker"
  members = [
    "allUsers"
  ]
}



resource "google_firebase_hosting_site" "default" {
  provider = google-beta
  project  = var.project_id
  site_id  ="dataquest-datafab" 
}


resource "google_firebase_hosting_version" "default" {
  provider = google-beta
  site_id  = google_firebase_hosting_site.default.site_id
  config {
    rewrites {
      glob = "**"
      run {
        service_id = google_cloud_run_v2_service.react-frontend.name
        region = google_cloud_run_v2_service.react-frontend.location
      }
    }
  }
}

resource "google_firebase_hosting_release" "default" {
  provider     = google-beta
  site_id      = google_firebase_hosting_site.default.site_id
  version_name = google_firebase_hosting_version.default.name
  message      = "Cloud Run Integration"
}

resource "google_firebase_hosting_custom_domain" "default" {
  provider = google-beta
  project  = var.project_id
  site_id  = google_firebase_hosting_site.default.site_id
  custom_domain = "run.custom.domaindataquest.com"
  wait_dns_verification = false
}
