# CipherSafeTests - Cryptographically Secure Examination System

CipherSafeTests is a highly secure, cryptography-driven examination platform designed to prevent question leaks, tampering, and result manipulation. It ensures exam integrity, transparency, and trustworthiness using modern cryptographic techniques such as encryption, Shamir’s Secret Sharing, and public key infrastructure (PKI).

## Features

- **Enhance Security**: Encrypts exam questions and data to prevent unauthorized access before and during exams.
- **Ensure Fairness**: Uses Shamir's Secret Sharing to securely decrypt questions only at the authorized exam time.
- **Guarantee Transparency**: Implements digital signatures and public key cryptography for tamper-proof auditing.
- **Time-Locked Question Access**: Implements Shamir’s Secret Sharing to ensure that questions are only decrypted at the scheduled time, and only with multiple trusted parties’ cooperation.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Cryptography**: AES, RSA, Shamir's Secret Sharing
- **Caching**: Redis
- **Deployment**: Vercel (Frontend), Render (Backend)

## Installation

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or higher)
- [MongoDB](https://www.mongodb.com/) or a MongoDB Atlas account for the database
- [Git](https://git-scm.com/)

### Steps to Run Locally

1. Clone the repository:
   ```
   git clone https://github.com/rishvant/Cipher-Safe-Tests.git
   cd Cipher-Safe-Tests
   ```

2. Install Frontend Dependencies:
   ```
   cd client
   npm install
   ```

3. Install Backend Dependencies:
   ```
   cd server
   npm install
   ```

4. Set Up Environment Variables

5. Run Frontend Server:
   ```
   npm run dev
   ```
   
6. Run Backend Server:
   ```
   node server.js
   ```
