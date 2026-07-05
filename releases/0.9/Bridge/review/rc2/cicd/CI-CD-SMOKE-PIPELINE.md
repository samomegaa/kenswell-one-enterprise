# RC2-D1 — CI/CD Smoke Pipeline

## Objective

Add an automated GitHub Actions smoke pipeline for Kenswell One Bridge.

## Workflow

```text
.github/workflows/bridge-smoke.yml
Trigger

The workflow runs on:

push to main
pull requests to main
manual workflow dispatch
Checks

The pipeline verifies:

dependency installation
client portal dependency installation
RC2 configuration layer
RC2 bootstrap
RC2 logging
RC2 HTTP hardening
RC2 HTTP security
RC2 error handling
RC2 API contract
RC2 Docker packaging metadata
RC2 deployment automation
RC2 proxy configuration
RC1 full smoke baseline
Purpose

This gives Bridge a repeatable CI gate before moving toward RC3 validation and 0.9.0 GA.

Future Work

RC2-D2 should add:

linting
test runner
build artifacts
release packaging
version tagging
deployment workflow
