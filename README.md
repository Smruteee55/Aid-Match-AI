# AidMatch-AI 🚀
**Smart Resource Allocation for NGOs using Gemma 4 AI**

AidMatch-AI is a real-time crisis management ecosystem designed to bridge the gap between NGOs and volunteers. By utilizing simulated AI logic, the platform categorizes incoming crisis reports and ranks the best-fit volunteers based on location and skill set.

## ✨ Key Features
- **AI Crisis Analysis:** Automatically categorizes reports (Food, Water, Medical) and assigns urgency levels.
- **Smart Matching Engine:** NGO admins can view ranked lists of volunteers based on proximity and relevant skills.
- **Dual-Dashboard Ecosystem:**
  - **NGO Portal (Midnight Indigo):** Track deployments and manage crisis lifecycles.
  - **Volunteer Portal (Electric Emerald):** Accept missions and provide real-time updates.
- **Live Status Tracking:** Real-time feedback loop from "Assigned" to "In-Progress" to "Resolved."

## 🛠 Tech Stack
- **Frontend:** React.js, Lucide Icons, Custom Indigo/Emerald UI
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **AI Integration:** Simulated Gemma 4 NLP Logic for crisis categorization

## 🚀 How to Run Locally

### 1. Backend Setup
```bash
cd server
npm install
# Create a .env file with your MONGO_URI
node server.js

cd client
npm install
npm start

