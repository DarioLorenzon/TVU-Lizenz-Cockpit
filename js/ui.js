// ======================================
// TVU Lizenz-Cockpit
// ui.js
// Version 1.1.0
// ======================================

"use strict";

function updateDashboard(result) {

    document.getElementById("countFound").textContent =
        result.vorhanden.length;

    document.getElementById("countCreate").textContent =
        result.erstellen.length;

    document.getElementById("countDelete").textContent =
        result.loeschen.length;

    document.getElementById("countReview").textContent =
        result.pruefen.length;

}
