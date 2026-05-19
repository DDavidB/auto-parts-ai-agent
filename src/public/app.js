document.getElementById('btn-search-vehicle').addEventListener('click', async () => {
    const plateInput = document.getElementById('vehicle-search').value;
    const btn = document.getElementById('btn-search-vehicle');
    
    if (!plateInput) {
        alert("אנא הזן מספר רכב");
        return;
    }

    // משנים את טקסט הכפתור כדי לתת חיווי למשתמש
    btn.innerText = "מחפש במסוף...";
    btn.disabled = true;
    
    try {
        // פנייה לשרת שלנו (שפונה למשרד התחבורה)
        const response = await fetch(`/api/vehicle/${plateInput}`);
        const data = await response.json();

        if (data.error) {
            alert(data.error);
        } else {
            // שתילת הנתונים שחזרו בתוך מסך פרטי הרכב
            document.getElementById('car-brand').innerText = data.brand;
            document.getElementById('car-model').innerText = data.model;
            document.getElementById('car-year').innerText = data.year;
            document.getElementById('car-engine').innerText = data.engineCode;
            document.getElementById('car-vin').innerText = data.vin;
            document.getElementById('car-group').innerText = data.group;
            
            // גלילה חלקה מטה אל אזור התוצאות
            document.getElementById('vehicle-details-box').scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        alert("אירעה שגיאה בחיפוש הרכב.");
    } finally {
        // החזרת הכפתור למצבו הרגיל
        btn.innerText = "חפש רכב";
        btn.disabled = false;
    }
});
