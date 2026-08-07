// ======================================
// TVU Lizenz-Cockpit
// export.js
// Version 1.2.0
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
            Bemerkung: "Mitglied archiviert",

            MöglicherTreffer: "",
            Grund: ""

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
            Bemerkung: "Keine Lizenz vorhanden",

            MöglicherTreffer: "",
            Grund: ""

        });

    }

    // ----------------------------------
    // Abklären
    // ----------------------------------

    for (const item of result.pruefen) {

        let moeglicherTreffer = "";
        let grund = "";

        if (item.match) {

            moeglicherTreffer =
                item.match.person.nachname +
                ", " +
                item.match.person.vorname +
                " (" +
                item.match.person.geburt +
                ")";

            grund = item.match.reason;

        }

        worklist.push({

            Aktion: "Abklären",
            Name: item.licence.nachname,
            Vorname: item.licence.vorname,
            Geburt: item.licence.geburt,
            Team: "",
            Lizenz: item.licence.lizenz,
            Austrittsdatum: "",
            Bemerkung:
                "Lizenz vorhanden, aber weder aktiv noch archiviert",

            MöglicherTreffer: moeglicherTreffer,
            Grund: grund

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
    // Titel
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
            "Bemerkung",
            "Möglicher Treffer",
            "Grund"
        ]

    ];

    // ----------------------------------
    // Daten
    // ----------------------------------

    worklist.forEach(item => {

        sheetData.push([

            item.Aktion,
            item.Name,
            item.Vorname,
            item.Geburt,
            item.Team,
            item.Lizenz,
            item.Austrittsdatum,
            item.Bemerkung,
            item.MöglicherTreffer,
            item.Grund

        ]);

    });

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

    // ----------------------------------
    // Autofilter
    // ----------------------------------

    worksheet["!autofilter"] = {

        ref: "A5:J" + sheetData.length

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

        { wch: 18 }, // Aktion
        { wch: 22 }, // Name
        { wch: 22 }, // Vorname
        { wch: 14 }, // Geburt
        { wch: 14 }, // Team
        { wch: 14 }, // Lizenz
        { wch: 18 }, // Austrittsdatum
        { wch: 45 }, // Bemerkung
        { wch: 35 }, // Möglicher Treffer
        { wch: 30 }  // Grund

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