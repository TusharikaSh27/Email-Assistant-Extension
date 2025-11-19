# 📬✨ Email Assistant – Chrome Extension

A smart Chrome Extension that integrates directly with Gmail and generates **AI‑powered email replies** based on the content of an email thread. It adds a custom **AI Reply** button inside Gmail’s compose toolbar using DOM observation and a backend AI API.

---

## 🚀✨ Features

* 🧠 Generates professional, context‑aware email replies
* ✨ Injects an **AI Reply** button directly into Gmail’s toolbar
* 🔍 Uses MutationObserver to detect Gmail compose window in real time
* 🌐 Communicates with backend API (Node/Spring Boot)
* 💬 Auto‑inserts generated reply into Gmail compose box

---

## 📥📦 Installation Instructions

### **1. Clone the repository**

```
git clone https://github.com/yourusername/email-assistant-extension.git
cd email-assistant-extension
```

### **2. Load the Chrome Extension**

1. Open **Chrome** → go to `chrome://extensions/`
2. Enable **Developer Mode** (top right)
3. Click **Load unpacked**
4. Select the project folder
5. You should now see **Email Assistant** in your extensions list

---

## 🖼️📸 Screenshots

### **AI Reply Button inside Gmail**
<img width="1920" height="1080" alt="Screenshot (3)" src="https://github.com/user-attachments/assets/3fc78160-3908-45b5-98cb-ff676def3a06" />
<img width="1920" height="1080" alt="Screenshot (4)" src="https://github.com/user-attachments/assets/06a71536-a324-47ca-be9b-d7e57cb9ebd2" />


![Screenshot of AI Reply Button]

### **Generated reply inserted in compose box**
<img width="1920" height="1080" alt="Screenshot (5)" src="https://github.com/user-attachments/assets/9bd5dd14-437f-4da3-9278-9150828eca10" />

![Screenshot of generated reply]

---

## 🎥🎞️ Demo GIF

 GIF inside a `demo/` folder and reference it:

![Demo GIF](demo/demo.gif)

---

## 🧩📡 API Documentation

The extension sends a POST request to your backend:

### **Endpoint**

```
POST /api/email/generate
```

### **Request Body**

```json
{
  "emailContent": "text of the last email or thread",
  "tone": "professional"
}
```

### **Response (text/plain)**

```
<generated email reply>
```

### **Example Flow**

1. User clicks **AI Reply**
2. Extension extracts visible email content
3. Sends content to backend API
4. API generates AI-based reply
5. Extension inserts reply into Gmail compose box

---

## 🛠️⚙️ Tech Stack

* JavaScript (ES6)
* Chrome Extensions API
* MutationObserver
* Gmail DOM hooks
* Fetch API → Backend
* Optional Backend: Node.js / Spring Boot
* Optional AI Models: Gemini / OpenAI

---

## 📁🗂️ Project Structure

```
email-assistant-extension/
│
├── manifest.json
├── content.js
├── popup.html (optional)
├── popup.js (optional)
├── background.js (optional)
├── screenshots/
│   ├── ai-button.png
│   └── generated-reply.png
├── demo/
│   └── demo.gif
└── README.md
```

---

## 📄📝 License

MIT License – you are free to modify and use this project.

---

## 🙌👤 Author

**Your Name**

* GitHub: [https://github.com/TusharikaSh27](https://github.com/TusharikaSh27)
* Portfolio: 
