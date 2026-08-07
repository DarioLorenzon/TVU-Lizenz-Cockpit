// ======================================
// TVU Lizenz-Cockpit
// export.js
// Version 1.1.0
// ======================================

"use strict";

/**
 * Arbeitsliste erzeugen
 */
function createWorklist(result) {

    const worklist = [];

    // ----------------------------------
    // Lizenz löschen
    // ----------------------------------

    for (const item of result.loeschen) {

        worklist.push({

            Aktion: "Lizenz löschen",
            Name: item.archive.nachname,
            Vorname: item.archive.vorname,
            Geburt: item.archive.geburt,
            Team: "",
            Lizenz: item.licence.lizenz,
            Austrittsdatum: item.archive.austritt,
            Bemerkung: "Mitglied archiviert"

        });

    }

    // ----------------------------------
    // Lizenz erstellen
    // ----------------------------------

    for (const member of result.erstellen) {

        worklist.push({

            Aktion: "Lizenz erstellen",
            Name: member.nachname,
            Vorname: member.vorname,
            Geburt: member.geburt,
            Team: member.team,
            Lizenz: "",
            Austrittsdatum: "",
            Bemerkung: "Keine Lizenz vorhanden"

        });

    }

    // ----------------------------------
    // Abklären
    // ----------------------------------

    for (const licence of result.pruefen) {

        worklist.push({

            Aktion: "Abklären",
            Name: licence.nachname,
            Vorname: licence.vorname,
            Geburt: licence.geburt,
            Team: "",
            Lizenz: licence.lizenz,
            Austrittsdatum: "",
            Bemerkung:
                "Lizenz vorhanden, aber weder aktiv noch archiviert"

        });

    }

    return worklist;

}

/**
 * Excel exportieren
 */
function exportExcel(result) {

    const worklist = createWorklist(result);

    const workbook = XLSX.utils.book_new();

    // ----------------------------------
    // Titelzeile
    // ----------------------------------

    const today = new Date();

    const dateString =
        today.toLocaleDateString("de-CH") +
        " " +
        today.toLocaleTimeString("de-CH");

    const sheetData = [

        ["TVU Lizenz-Cockpit"],
        ["Arbeitsliste"],
        ["Erstellt am", dateString],
        [],
        [
            "Aktion",
            "Name",
            "Vorname",
            "Geburt",
            "Team",
            "Lizenz",
            "Austrittsdatum",
            "Bemerkung"
        ]

    ];

    // Daten anhängen

    worklist.forEach(item => {

        sheetData.push([

            item.Aktion,
            item.Name,
            item.Vorname,
            item.Geburt,
            item.Team,
            item.Lizenz,
            item.Austrittsdatum,
            item.Bemerkung

        ]);

    });

    const worksheet =
        XLSX.utils.aoa_to_sheet(sheetData);

    // ----------------------------------
    // Autofilter
    // ----------------------------------

    worksheet["!autofilter"] = {

        ref: "A5:H" + sheetData.length

    };

    // ----------------------------------
    // Kopfzeile einfrieren
    // ----------------------------------

    worksheet["!freeze"] = {

        xSplit: 0,
        ySplit: 5

    };

    // ----------------------------------
    // Spaltenbreiten
    // ----------------------------------

    worksheet["!cols"] = [

        { wch: 18 },
        { wch: 22 },
        { wch: 22 },
        { wch: 14 },
        { wch: 12 },
        { wch: 15 },
        { wch: 18 },
        { wch: 45 }

    ];

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Arbeitsliste"
    );

    // ----------------------------------
    // Dateiname
    // ----------------------------------

    const filename =
        "TVU_Lizenzbericht_" +
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0") +
        ".xlsx";

    XLSX.writeFile(workbook, filename);

}