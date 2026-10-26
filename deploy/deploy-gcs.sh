#!/usr/bin/env bash
# =============================================================================
# Swiss Atelier Design System — Google Cloud Storage (GCS) Static Host & CDN Sync
# Usage: ./deploy/deploy-gcs.sh <YOUR_GCS_BUCKET_NAME> [GCP_REGION]
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.."
if [[ ! -f _site/index.html ]]; then
  echo "Run npm run build before deployment." >&2
  exit 1
fi

BUCKET_NAME="${1:-}"
REGION="${2:-asia-southeast1}"

if [[ -z "$BUCKET_NAME" ]]; then
  echo "Usage: ./deploy/deploy-gcs.sh <YOUR_GCS_BUCKET_NAME> [GCP_REGION]"
  exit 1
fi

echo "==> 1. Ensuring bucket gs://${BUCKET_NAME} exists in ${REGION}..."
if ! gcloud storage buckets describe "gs://${BUCKET_NAME}" >/dev/null 2>&1; then
  gcloud storage buckets create "gs://${BUCKET_NAME}" --location="${REGION}" --uniform-bucket-level-access
fi

echo "==> 2. Configuring static website index & applying CORS policy for cross-origin CSS/JS..."
gcloud storage buckets update "gs://${BUCKET_NAME}" \
  --web-main-page-suffix=index.html \
  --web-error-page=index.html \
  --cors-file=deploy/cors.json

echo "==> 3. Granting public read access (allUsers:objectViewer)..."
gcloud storage buckets add-iam-policy-binding "gs://${BUCKET_NAME}" \
  --member=allUsers \
  --role=roles/storage.objectViewer

echo "==> 4. Syncing Swiss Atelier files to gs://${BUCKET_NAME}..."
gcloud storage rsync _site "gs://${BUCKET_NAME}" \
  --recursive

echo ""
echo "============================================================================="
echo "Swiss Atelier deployed to Google Cloud Storage!"
echo "Living Design System URL : https://storage.googleapis.com/${BUCKET_NAME}/index.html"
echo "Shared Stylesheet URL    : https://storage.googleapis.com/${BUCKET_NAME}/dist/atelier.css"
echo "Shared JS Runtime URL    : https://storage.googleapis.com/${BUCKET_NAME}/dist/atelier.js"
echo "Agent Skill URL          : https://storage.googleapis.com/${BUCKET_NAME}/skills/swiss-atelier/SKILL.md"
echo "LLM Index URL            : https://storage.googleapis.com/${BUCKET_NAME}/llms.txt"
echo "============================================================================="
