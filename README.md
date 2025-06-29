# InsuraAI – Insurance Claim Frontend

## Overview
InsuraAI is a modern, AI-powered insurance claim management frontend built with React. It provides a seamless, user-friendly interface for users to submit, track, and manage insurance claims online. The application is designed for clarity, speed, and ease of use, leveraging automation and cloud technologies to deliver a next-generation insurance experience.

## 🏦 Project Overview

InsuraAI+ is a serverless, AI-driven insurance claim validator built using AWS. It automates claim ingestion, OCR extraction, summarization, risk scoring, and notifications using modern AWS services like Lambda, Bedrock, Textract, EventBridge, and Step Functions.

---

## ✨ Workflow Summary

1. **User uploads claim document via frontend**
2. **Textract Lambda** extracts raw text from the file
3. **Bedrock Lambda** summarizes and classifies claim risk
4. **Data stored** in two DynamoDB tables (`InsuraAIClaims`, `ClaimSummaries`)
5. **EventBridge & SNS** trigger notifications if claim is high risk

---

## ⚖️ AWS Lambda Functions

### 1. `textractOCRHandler`

- **Trigger:** Start of Step Function
- **Job:** Uses Textract to extract text from uploaded claim PDF/image
- **Output:** `{ claimID, text, filename, uploadedBy, timestamp }`

### 2. `bedrockSummaryHandler`

- **Trigger:** StepFunction (after OCR)
- **Job:**
  - Extracts patient name, reason, policy value
  - Fetches `PolicyID` from `InsuraAIClaims` table using claimID
  - Summarizes claim using Amazon Titan (Bedrock)
  - Classifies risk level
  - Writes data to `ClaimSummaries`
  - Sends event to EventBridge (if risk = HIGH)

### 3. `notifyHighRiskClaim` (via EventBridge + SNS)

- **Trigger:** EventBridge rule
- **Job:** Sends notification email to subscriber via SNS

---

## 📅 DynamoDB Tables

### 1. `InsuraAIClaims`

- Stores metadata of uploaded claims (via UploadHandler Lambda)
- Primary Key: `ClaimID`
- Referenced in Bedrock Lambda to fetch `PolicyID`

### 2. `ClaimSummaries`

- Stores summary, extracted metadata, risk level
- Primary Key: `claimID`
- Used by frontend dashboard to show claim info

---

## ♻️ AWS Step Functions

```mermaid
stateDiagram-v2
    [*] --> OCR Textract
    OCR Textract --> Claude Summarize
    Claude Summarize --> Risk Check
    Risk Check --> Notify Claimant: if LOW/MEDIUM
    Risk Check --> Send To EventBridge: if HIGH
    Send To EventBridge --> Notify Claimant

## What is Done in the Frontend?
- **Claim Submission:** Users can upload claim documents (PDF, JPEG, PNG) with drag-and-drop or file selection, and provide required details (Policy ID, User ID).
- **AI-Powered Processing:** After upload, claims are automatically processed by an AI backend, extracting details and updating claim status.
- **Claim Status Tracking:** Users can check the real-time status of their claims, view detailed information, and download reports.
- **Claim List & Details:** A dashboard lists all claims with status badges, and users can view rich details for each claim, including document links and submission info.
- **Modern UI/UX:** The interface uses visually distinct cards, badges, icons, and clear spacing for a professional, accessible experience.

## Why is it Unique?
- **AI Integration:** Unlike traditional insurance portals, InsuraAI leverages AI to automate claim review, reducing manual effort and speeding up approvals.
- **Cloud-Native Document Handling:** Secure, scalable S3 storage for all uploaded documents, with instant access and download links.
- **User-Centric Design:** Every step is optimized for clarity—users always know what to do next, what is required, and the status of their claim.
- **Real-Time Feedback:** Users receive immediate feedback on uploads, errors, and claim progress, with helpful instructions and requirements.
- **Flexible Data Handling:** The frontend is robust to different backend field formats (camelCase, PascalCase, etc.), ensuring compatibility and reliability.

## Features
- 🚀 **AI-Powered Claim Processing**: Automatic extraction and review of claim details.
- 📄 **Easy Document Upload**: Drag-and-drop or click-to-upload, with file type and size validation.
- 📝 **Detailed Claim Status**: View claim progress, status badges, and all claim details in a modern card layout.
- 📋 **Claim List Dashboard**: See all your claims at a glance, filter by status, and select for more info.
- 🔒 **Secure Cloud Storage**: All documents are stored securely in AWS S3.
- 🧑‍💼 **User Guidance**: Step-by-step instructions, requirements checklist, and helpful error messages.
- 🎨 **Modern, Responsive UI**: Clean, accessible, and mobile-friendly design.

## Getting Started
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. The app will be available at `http://localhost:3000`.

## Tech Stack
- **React** (frontend framework)
- **AWS S3** (document storage)
- **Custom API** (for claim processing and status)

---

For questions or support, contact the InsuraAI team.
