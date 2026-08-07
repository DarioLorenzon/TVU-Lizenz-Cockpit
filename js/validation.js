// ======================================
// TVU Lizenz-Cockpit
// validation.js
// Version 1.0.0
// ======================================

"use strict";

/**
 * Prüft, ob alle Pflichtspalten vorhanden sind.
 */
function validateColumns(rows, requiredColumns) {

    if (!rows || rows.length === 0) {
        return {
            ok: false,
            message: "Die Excel-Datei ist leer."
        };
    }

    const columns = Object.keys(rows[0]);

    for (const column of requiredColumns) {

        if (!columns.includes(column)) {

            return {
                ok: false,
                message:
                    "Die Spalte '" +
                    column +
                    "' wurde nicht gefunden."
            };

        }

    }

    return {
        ok: true
    };

}