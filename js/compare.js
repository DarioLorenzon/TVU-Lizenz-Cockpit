// ======================================
// TVU Lizenz-Cockpit
// compare.js
// Version 1.0.0
// ======================================

"use strict";

/**
 * Vergleicht Mitglieder und Lizenzen
 */
function compareData(members, licences) {

    const result = {
        vorhanden: [],
        erstellen: [],
        loeschen: [],
        pruefen: []
    };

    // ----------------------------------
    // Index Lizenzen
    // ----------------------------------

    const licenceMap = new Map();

    for (const licence of licences) {
        licenceMap.set(licence.id, licence);
    }

    // ----------------------------------
    // Mitglieder -> Lizenzen
    // ----------------------------------

    for (const member of members) {

        const licence = licenceMap.get(member.id);

        if (!licence) {

            result.erstellen.push(member);
            continue;

        }

        if (fullnamesEqual(member, licence)) {

            result.vorhanden.push({
                member,
                licence
            });

        } else {

            result.pruefen.push({
                member,
                licence
            });

        }

    }

    // ----------------------------------
    // Lizenzen -> Mitglieder
    // ----------------------------------

    const memberMap = new Map();

    for (const member of members) {
        memberMap.set(member.id, member);
    }

    for (const licence of licences) {

        if (!memberMap.has(licence.id)) {

            result.loeschen.push(licence);

        }

    }

    return result;

}
