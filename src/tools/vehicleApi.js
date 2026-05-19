const axios = require('axios');

async function getVehicleDetails(licensePlate) {
    try {
        // ניקוי המספר מרווחים או מקפים
        const cleanPlate = licensePlate.replace(/[-\s]/g, "");
        
        // הכתובת הרשמית של מאגר כלי הרכב הממשלתי
        const resourceId = "053cea08-09bc-40ec-8f7a-156f0677aff3";
        const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=${resourceId}&filters[mispar_rechev]=${cleanPlate}`;

        // ביצוע הבקשה למשרד התחבורה
        const response = await axios.get(url);
        const records = response.data.result.records;

        // אם חזרו תוצאות, נמפה אותן לשדות שלנו
        if (records && records.length > 0) {
            const car = records[0];
            return {
                brand: car.tozeret_nm || "לא ידוע",
                model: car.kinuy_mishari || "לא ידוע",
                year: car.shnat_yitzur || "לא ידוע",
                engineCode: car.degem_manoa || "לא ידוע",
                vin: car.mispar_shilda || "חסר במאגר", 
                group: car.kvutzat_rishuy || "לא ידוע"
            };
        } else {
            return { error: "הרכב לא נמצא במאגר משרד התחבורה." };
        }
    } catch (error) {
        console.error("שגיאה בתקשורת מול משרד התחבורה:", error.message);
        return { error: "שגיאת תקשורת מול שרתי הממשלה." };
    }
}

module.exports = { getVehicleDetails };
