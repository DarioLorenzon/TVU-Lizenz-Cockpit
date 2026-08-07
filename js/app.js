// ======================================
// TVU Lizenz-Cockpit
// app.js
// Version 1.5.0
// ======================================

"use strict";

// ======================================
// Daten
// ======================================

let members = [];
let archive = [];
let licences = [];

let result = null;

// ======================================
// Elemente
// ======================================

const membersFile = document.getElementById("membersFile");
const archiveFile = document.getElementById("archiveFile");
const licensesFile = document.getElementById("licensesFile");

const compareButton = document.getElementById("compareBtn");
const exportButton = document.getElementById("exportBtn");

const memberCount = document.getElementById("memberCount");
const archiveCount = document.getElementById("archiveCount");
const licenseCount = document.getElementById("licenseCount");

// ======================================
// Initialisierung
// ======================================

exportButton.classList.add("hidden");

// ======================================
// Events
// ======================================

membersFile.addEventListener("change", loadMembers);
archiveFile.addEventListener("change", loadArchive);
licensesFile.addEventListener("change", loadLicences);

compareButton.addEventListener("click", compare);

exportButton.addEventListener("click", () => {

    if (result) {
        exportExcel(result);
    }

});

// ======================================
// Mitglieder laden
// ======================================

async function loadMembers(event) {

    try {

        const file = event.target.files[0];

        if (!file)
            return;

        const rows = await readExcel(file);

        const validation = validateColumns(rows, [
            "Name",
            "Vorname",
            "Geburt",
            "Team"
        ]);

        if (!validation.ok) {

            alert(validation.message);
            return;

        }

        members = convertMembers(rows);

        memberCount.textContent = members.length;

        clearSummary();
        exportButton.classList.add("hidden");

        console.log("=================================");
        console.log("Mitglieder geladen");
        console.table(members);

    }

    catch (error) {

        console.error(error);
        alert("Die Mitgliederdatei konnte nicht gelesen werden.");

    }

}

// ======================================
// Archiv laden
// ======================================

async function loadArchive(event) {

    try {

        const file = event.target.files[0];

        if (!file)
            return;

        const rows = await readExcel(file);

        const validation = validateColumns(rows, [
            "Name",
            "Vorname",
            "Geburt",
            "Austrittsdatum"
        ]);

        if (!validation.ok) {

            alert(validation.message);
            return;

        }

        archive = convertArchive(rows);

        archiveCount.textContent = archive.length;

        clearSummary();
        exportButton.classList.add("hidden");

        console.log("=================================");
        console.log("Archiv geladen");
        console.table(archive);

    }

    catch (error) {

        console.error(error);
        alert("Die Archivdatei konnte nicht gelesen werden.");

    }

}

// ======================================
// Lizenzen laden
// ======================================

async function loadLicences(event) {

    try {

        const file = event.target.files[0];

        if (!file)
            return;

        const rows = await readExcel(file);

        const validation = validateColumns(rows, [
            "Name",
            "Vorname",
            "Geburt",
            "Lizenz"
        ]);

        if (!validation.ok) {

            alert(validation.message);
            return;

        }

        licences = convertLicences(rows);

        licenseCount.textContent = licences.length;

        clearSummary();
        exportButton.classList.add("hidden");

        console.log("=================================");
        console.log("Lizenzen geladen");
        console.table(licences);

    }

    catch (error) {

        console.error(error);
        alert("Die Lizenzdatei konnte nicht gelesen werden.");

    }

}

// ======================================
// Vergleich
// ======================================

function compare() {

    // -----------------------------
    // Prüfungen
    // -----------------------------

    if (members.length === 0) {

        alert("Bitte zuerst die Mitgliederverwaltung laden.");
        return;

    }

    if (licences.length === 0) {

        alert("Bitte zuerst die SHV-Lizenzen laden.");
        return;

    }

    if (archive.length === 0) {

        const ok = confirm(

            "Es wurde keine Archivdatei geladen.\n\n" +
            "Archivierte Mitglieder können dadurch nicht erkannt werden.\n\n" +
            "Trotzdem fortfahren?"

        );

        if (!ok)
            return;

    }

    // -----------------------------
    // Vergleich
    // -----------------------------

    result = compareData(
        members,
        archive,
        licences
    );

    // -----------------------------
    // Dashboard
    // -----------------------------

    updateDashboard(result);

    // -----------------------------
    // Statusmeldung
    // -----------------------------

    showSummary(result);

    // -----------------------------
    // Export aktivieren
    // -----------------------------

    exportButton.classList.remove("hidden");

    // -----------------------------
    // Console
    // -----------------------------

    console.clear();

    console.log("=================================");
    console.log("TVU Lizenz-Cockpit");
    console.log("Version 1.5.0");
    console.log("=================================");

    console.log("");

    console.log("Mitglieder :", members.length);
    console.log("Archiv     :", archive.length);
    console.log("Lizenzen   :", licences.length);

    console.log("");

    console.log("Keine Aktion :", result.vorhanden.length);
    console.log("Erstellen    :", result.erstellen.length);
    console.log("Löschen      :", result.loeschen.length);
    console.log("Abklären     :", result.pruefen.length);

    console.log("");

    console.log("========== KEINE AKTION ==========");
    console.table(result.vorhanden);

    console.log("========== ERSTELLEN ==========");
    console.table(result.erstellen);

    console.log("========== LÖSCHEN ==========");
    console.table(result.loeschen);

    console.log("========== ABKLÄREN ==========");
    console.table(result.pruefen);

}