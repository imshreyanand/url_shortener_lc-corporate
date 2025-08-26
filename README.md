# 🔗 URL Shortener App (MERN)

A simple **MERN stack** web application that allows users to shorten long URLs and redirect them through a generated short link.

---

## 📌 Objective

Build a web app where users can:

- Submit long URLs and get a shortened version.
- Visit the short URL to be redirected to the original long URL.

---

## 🚀 Features

### User Side

- ✅ Input a long URL (e.g., `https://www.example.com/some/very/long/path`)
- ✅ Receive a shortened URL (e.g., `http://localhost:3000/abc123`)
- ✅ Redirect to the original URL when visiting the short link

### Bonus (Optional)

- 🔐 Admin-only page:
  - View all shortened URLs
  - Track the number of visits for each short URL

---

## 🛠️ Tech Stack

**Frontend (React)**

- React.js with form to submit long URLs
- Display of shortened URL after submission

**Backend (Node.js + Express + MongoDB)**

- `POST /api/shorten` → Accepts long URL & returns shortcode
- `GET /:shortcode` → Redirects to the original URL
- MongoDB with Mongoose for schema management

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/imshreyanand/url_shortener_lc-corporate.git
   cd url_shortener_lc-corporate
   ```
