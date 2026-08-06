// ======================================
// TVU Lizenz-Cockpit
// app.js
// Version 1.0.0
// ======================================

"use strict";

let members = [];
let licences = [];
let result = null;

// --------------------------------------
// Elemente
// --------------------------------------

const membersFile = document.getElementById("membersFile");
const licencesFile = document.getElementById("licensesFile");
const compareButton = document.getElementById("compareBtn");

const memberCount = document.getElementById("memberCount");
const licenseCount = document.getElementById("licenseCount");

// --------------------------------------
// Dateien laden
// --------------------------------------

membersFile.addEventListener("change", loadMembers);
licencesFile.addEventListener("change", loadLicences);

compareButton.addEventListener("click", compare);

// --------------------------------------
// Mitglieder laden
// --------------------------------------

async function loadMembers(event) {

    const file = event.target.files[0];

    if (!file) return;

    const rows = await readExcel(file);

    members = convertMembers(rows);

    memberCount.textContent = members.length;

    console.log("Mitglieder geladen");
    console.table(members);

}

// --------------------------------------
// Lizenzen laden
// --------------------------------------

async function loadLicences(event) {

    const file = event.target.files[0];

    if (!file) return;

    const rows = await readExcel(file);

    licences = convertLicences(rows);

    licenseCount.textContent = licences.length;

    console.log("Lizenzen geladen");
    console.table(licences);

}

// --------------------------------------
// Vergleich
// --------------------------------------

function compare() {

    if (members.length === 0) {

        alert("Bitte zuerst die Mitgliederverwaltung laden.");

        return;

    }

    if (licences.length === 0) {

        alert("Bitte zuerst die Lizenzen laden.");

        return;

    }

    result = compareData(members, licences);

    console.clear();

    console.log("=================================");
    console.log("TVU Lizenz-Cockpit");
    console.log("=================================");

    console.log("");

    console.log("Vorhanden:", result.vorhanden.length);
    console.log("Erstellen:", result.erstellen.length);
    console.log("Löschen:", result.loeschen.length);
    console.log("Prüfen:", result.pruefen.length);

    console.log("");

    console.log("========== VORHANDEN ==========");
    console.table(result.vorhanden);

    console.log("========== ERSTELLEN ==========");
    console.table(result.erstellen);

    console.log("========== LÖSCHEN ==========");
    console.table(result.loeschen);

    console.log("========== PRÜFEN ==========");
    console.table(result.pruefen);

}