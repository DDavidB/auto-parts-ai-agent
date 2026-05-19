// src/index.js

// טעינת משתני סביבה מקובץ .env (אם קיים)
require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// הגדרה שכל בקשה שמגיעה לשרת תבדוק קודם כל אם יש קובץ מתאים בתיקיית public
// זה מה שיגרום ל-index.html ו-style.css להיות זמינים בדפדפן
app.use(express.static(path.join(__dirname, 'public')));

// פירסור בקשות JSON (נצטרך את זה בהמשך כשה-Frontend ידבר עם ה-Backend)
app.use(express.json());

// נקודת קצה (Endpoint) לבדיקה שהשרת באמת באוויר
app.get('/api/health', (req, res) => {
    res.json({ status: "up", message: "AutoParts AI Server is running!" });
});

// הפעלת השרת
app.listen(PORT, () => {
    console.log(`🚀 השרת רץ בהצלחה! כנס לכתובת: http://localhost:${PORT}`);
});
