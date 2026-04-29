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

##  How to Run Locally

 Setup Instructions
1. Clone the Repository
git clone https://github.com/your-username/aid-match-ai.git
cd aid-match-ai
2. Install Dependencies
npm install
cd client
npm install
3. Setup Environment Variables

Create a .env file inside the server/ folder and add:

MONGO_URI=your_mongodb_connection_string
PORT=5000

 You can refer to .env.example for guidance.

4. Run the Project

Start Backend:

cd server
npm start

Start Frontend:

cd client
npm start
 Deployment (Optional)

You can deploy this project using:

Render / Vercel / Azure

 Security Note

Sensitive data like database credentials are not included in this repository.
Please create your own .env file using the provided .env.example.

