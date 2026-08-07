// ======================================
// TVU Lizenz-Cockpit
// excel.js
// Version 1.2.0
// ======================================

"use strict";

/**
 * Excel-Datei einlesen
 */
async function readExcel(file) {

    const buffer = await file.arrayBuffer();

    const workbook = XLSX.read(buffer, {
        type: "array"
    });

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    return XLSX.utils.sheet_to_json(sheet, {
        defval: ""
    });

}

/**
 * Mitglieder umwandeln
 */
function convertMembers(rows) {

    return rows.map(row => createPerson(row, "member"));

}

/**
 * Archiv umwandeln
 */
function convertArchive(rows) {

    return rows.map(row => createPerson(row, "archive"));

}

/**
 * Lizenzen umwandeln
 */
function convertLicences(rows) {

    return rows.map(row => createPerson(row, "licence"));

}

/**
 * Einheitliches Personenobjekt erzeugen
 */
function createPerson(row, source) {

    const person = {

        nachname: "",
        vorname: "",
        geburt: "",

        team: "",
        info: "",

        lizenz: "",

        austritt: "",

        source: source,

        id: "",
        fullId: ""

    };

    switch (source) {

        case "member":

            person.nachname = clean(row.Name);
            person.vorname = clean(row.Vorname);
            person.geburt = normalizeBirth(row.Geburt);

            person.team = clean(row.Team);
            person.info = clean(row.Info);

            break;

        case "archive":

            person.nachname = clean(row.Name);
            person.vorname = clean(row.Vorname);
            person.geburt = normalizeBirth(row.Geburt);

            person.austritt = normalizeBirth(row.Austrittsdatum);

            break;

        case "licence":

            person.nachname = clean(row.Name);
            person.vorname = clean(row.Vorname);
            person.geburt = normalizeBirth(row.Geburt);

            person.lizenz = clean(row.Lizenz);

            break;

    }

    person.id = createPersonId(person);

    person.fullId =
        person.id +
        "|" +
        normalizeName(person.vorname);

    return person;

}