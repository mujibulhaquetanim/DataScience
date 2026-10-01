# gen-phishing-emails

> ⚠️ **Security-research / defensive tooling.** This project generates **synthetic
> phishing-style email samples** via AWS Bedrock. It exists to support *defensive*
> work — e.g. producing labeled samples to train and evaluate phishing **detectors**,
> or authorized red-team / security-awareness exercises. It is **not** intended for,
> and must not be used to, target real people or send unsolicited email.

## Purpose

<!-- TODO: state the real, specific purpose. Examples:
  - "Generate a labeled dataset of synthetic phishing vs. benign emails to train a
     classifier that flags phishing in <system>."
  - "Produce simulated phishing content for an internal, authorized security-awareness
     program run by <team>." -->

_Describe the concrete defensive/research goal here._

## Authorization & scope

This tool may only be run under explicit authorization. Fill in before use:

- **Owner / responsible party:** _<name / team>_
- **Authorization:** _<engagement, program, or research approval reference>_
- **Scope & boundaries:** _<what it may target — e.g. test mailboxes only; never real recipients>_
- **Data handling:** generated samples are **synthetic**; do not include real personal data.

If you cannot fill in the authorization above, do not run this tool.

## Responsible-use notice

- Generated content is for **detection, analysis, or authorized simulation only**.
- Do **not** send generated emails to anyone who has not consented as part of an
  authorized program.
- Using this to deceive, defraud, or harvest credentials from real targets is
  illegal in most jurisdictions and violates provider acceptable-use policies
  (AWS Bedrock, GitHub).

## Setup

```bash
uv sync          # install deps (boto3)
```

Credentials are read from the standard AWS provider chain (env vars, shared config,
or an IAM role) — **no keys are stored in this repo**. Configure your region and
credentials outside the project (e.g. `aws configure` / environment).

## Run

```bash
uv run main.py
```

## Notes on publishing

- Keep this repository **private** unless you have a clear reason and authorization
  to publish offensive-security tooling.
- `.env`, `node_modules/`, and `.venv/` are git-ignored; verify no credentials or
  real data are committed before pushing.
