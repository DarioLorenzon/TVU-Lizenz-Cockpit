// ======================================
// TVU Lizenz-Cockpit
// excel.js
// Version 1.0.0
// ======================================

"use strict";

/**
 * Excel-Datei einlesen
 */
function readExcel(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = function (event) {

            try {

                const data = new Uint8Array(event.target.result);

                const workbook = XLSX.read(data, {
                    type: "array"
                });

                const sheet = workbook.Sheets[workbook.SheetNames[0]];

                const rows = XLSX.utils.sheet_to_json(sheet, {
                    defval: ""
                });

                resolve(rows);

            } catch (error) {

                reject(error);

            }

        };

        reader.onerror = reject;

        reader.readAsArrayBuffer(file);

    });

}


/**
 * Mitglieder normalisieren
 */
function convertMembers(rows) {

    return rows.map(row => {

        const person = {

            nachname: clean(row.Name),
            vorname: clean(row.Vorname),
            geburt: normalizeBirth(row.Geburt),
            team: clean(row.Team),
            info: clean(row.Info)

        };

        person.id = createPersonId(person);

        return person;

    });

}


/**
 * Lizenzen normalisieren
 */
function convertLicences(rows) {

    return rows.map(row => {

        const person = {

            nachname: clean(row.Name),
            vorname: clean(row.Vorname),
            geburt: normalizeBirth(row.Geburt),
            lizenz: clean(row.Lizenz)

        };

        person.id = createPersonId(person);

        console.log(person);

        return person;

    });

}
