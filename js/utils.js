// ======================================
// TVU Lizenz-Cockpit
// utils.js
// Version 1.0.0
// ======================================

"use strict";

/**
 * Führende und nachfolgende Leerzeichen entfernen.
 */
function clean(value) {
    return String(value ?? "").trim();
}

/**
 * Namen normalisieren.
 *
 * Regeln:
 * - Gross-/Kleinschreibung ignorieren
 * - Umlaute ersetzen
 * - Akzente entfernen
 * - Bindestriche entfernen
 * - Apostrophe entfernen
 * - Mehrfach-Leerzeichen entfernen
 */
function normalizeName(value) {

    return clean(value)
        .toLowerCase()

        // Umlaute
        .replace(/ä/g, "ae")
        .replace(/ö/g, "oe")
        .replace(/ü/g, "ue")
        .replace(/ß/g, "ss")

        // Akzente
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")

        // Bindestriche
        .replace(/-/g, " ")

        // Apostrophe
        .replace(/'/g, "")
        .replace(/`/g, "")

        // mehrere Leerzeichen
        .replace(/\s+/g, " ")

        .trim();
}

/**
 * Geburtsdatum normalisieren.
 *
 * Aktuell bleibt das Format TT.MM.JJJJ erhalten.
 */
function normalizeBirth(value) {

    if (value === null || value === undefined || value === "")
        return "";

    // Excel-Datum (Seriennummer)
    if (typeof value === "number") {

        const date = XLSX.SSF.parse_date_code(value);

        const day = String(date.d).padStart(2, "0");
        const month = String(date.m).padStart(2, "0");
        const year = String(date.y);

        return `${day}.${month}.${year}`;
    }

    return clean(value);

}

/**
 * ID erzeugen
 *
 * Primärschlüssel:
 * Geburt + Nachname
 */
function createPersonId(person) {

    return normalizeBirth(person.geburt)
        + "|"
        + normalizeName(person.nachname);

}

/**
 * Zwei Vornamen vergleichen.
 *
 * Beispiele:
 *
 * "Sophia Jasmin"
 * =
 * "Sophia"
 *
 * "Frederik Finn"
 * =
 * "Frederik"
 */
function firstFirstname(value) {

    const parts = normalizeName(value).split(" ");

    return parts[0] ?? "";

}

/**
 * Prüfen ob zwei Vornamen zusammenpassen.
 */
function firstnamesEqual(a, b) {

    return firstFirstname(a) === firstFirstname(b);

}

/**
 * Nachnamen vergleichen.
 */
function surnamesEqual(a, b) {

    return normalizeName(a) === normalizeName(b);

}

/**
 * Gesamten Namen vergleichen.
 */
function fullnamesEqual(personA, personB) {

    return (
        surnamesEqual(personA.nachname, personB.nachname)
        &&
        firstnamesEqual(personA.vorname, personB.vorname)
    );

}

/**
 * Zeitstempel
 */
function now() {

    return new Date().toLocaleTimeString("de-CH", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

}
