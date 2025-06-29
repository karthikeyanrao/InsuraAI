# InsuraAI – Insurance Claim Frontend

## Overview
InsuraAI is a modern, AI-powered insurance claim management frontend built with React. It provides a seamless, user-friendly interface for users to submit, track, and manage insurance claims online. The application is designed for clarity, speed, and ease of use, leveraging automation and cloud technologies to deliver a next-generation insurance experience.

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
