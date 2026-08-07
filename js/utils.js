// ======================================
// TVU Lizenz-Cockpit
// utils.js
// Version 1.2.0
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

        // Mehrfach-Leerzeichen
        .replace(/\s+/g, " ")

        .trim();

}

/**
 * Geburtsdatum normalisieren.
 *
 * Ausgabe:
 * TT.MM.JJJJ
 */
function normalizeBirth(value) {

    if (value === null || value === undefined || value === "")
        return "";

    // Excel-Seriennummer
    if (typeof value === "number") {

        const date = XLSX.SSF.parse_date_code(value);

        if (!date)
            return "";

        const day = String(date.d).padStart(2, "0");
        const month = String(date.m).padStart(2, "0");
        const year = String(date.y);

        return `${day}.${month}.${year}`;

    }

    return clean(value);

}

/**
 * Primärschlüssel erzeugen.
 *
 * Geburt + Nachname
 */
function createPersonId(person) {

    return (
        normalizeBirth(person.geburt) +
        "|" +
        normalizeName(person.nachname)
    );

}

/**
 * Ersten Vornamen zurückgeben.
 *
 * Beispiele:
 * "Sophia Jasmin" → "sophia"
 * "Frederik Finn" → "frederik"
 */
function firstFirstname(value) {

    const parts = normalizeName(value).split(" ");

    return parts[0] ?? "";

}

/**
 * Vornamen vergleichen.
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
        surnamesEqual(personA.nachname, personB.nachname) &&
        firstnamesEqual(personA.vorname, personB.vorname)
    );

}

/**
 * Array anhand der Person-ID in eine Map umwandeln.
 *
 * map.get(person.id)
 */
function createMap(list) {

    const map = new Map();

    for (const item of list) {

        map.set(item.id, item);

    }

    return map;

}

/**
 * Datum formatieren.
 *
 * Platzhalter für spätere Erweiterungen.
 */
function formatDate(value) {

    return normalizeBirth(value);

}

/**
 * Aktuelle Uhrzeit.
 */
function now() {

    return new Date().toLocaleTimeString("de-CH", {

        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"

    });

}