// ======================================
// TVU Lizenz-Cockpit
// ui.js
// Version 1.3.0
// ======================================

"use strict";

// ======================================
// Dashboard aktualisieren
// ======================================

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

// ======================================
// Statusmeldung anzeigen
// ======================================

function showSummary(result) {

    const totalActions =
        result.erstellen.length +
        result.loeschen.length +
        result.pruefen.length;

    const messageBox = document.getElementById("messageBox");
    const messageText = document.getElementById("messageText");

    messageBox.style.display = "block";

    if (totalActions === 0) {

        messageText.innerHTML =
            "✅ <strong>Vergleich erfolgreich abgeschlossen.</strong><br>" +
            "Es wurden keine Unterschiede gefunden.";

        return;

    }

    messageText.innerHTML =
        "✅ <strong>Vergleich erfolgreich abgeschlossen.</strong><br>" +
        "Es wurden <strong>" +
        totalActions +
        "</strong> Aktionen gefunden.<br>" +
        "Erstellen Sie nun den Excel-Bericht, um die Details anzuzeigen.";

}

// ======================================
// Statusmeldung ausblenden
// ======================================

function clearSummary() {

    const messageBox = document.getElementById("messageBox");

    messageBox.style.display = "none";

}