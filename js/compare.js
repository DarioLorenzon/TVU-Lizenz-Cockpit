// ======================================
// TVU Lizenz-Cockpit
// compare.js
// Version 1.2.0
// ======================================

"use strict";

/**
 * Hauptfunktion
 */
function compareData(members, archive, licences) {

    const memberMap = createMap(members);
    const archiveMap = createMap(archive);
    const licenceMap = createMap(licences);

    return {

        vorhanden: findExistingLicences(
            members,
            licenceMap
        ),

        erstellen: findMissingLicences(
            members,
            licenceMap
        ),

        loeschen: findArchivedLicences(
            archive,
            licenceMap
        ),

        pruefen: findUnknownLicences(
            licences,
            memberMap,
            archiveMap
        )

    };

}

/**
 * =====================================
 * Keine Aktion
 * Mitglied aktiv + Lizenz vorhanden
 * =====================================
 */
function findExistingLicences(members, licenceMap) {

    const result = [];

    for (const member of members) {

        const licence = licenceMap.get(member.id);

        if (!licence)
            continue;

        if (!fullnamesEqual(member, licence))
            continue;

        result.push({

            member,
            licence

        });

    }

    return result;

}

/**
 * =====================================
 * Lizenz erstellen
 * Mitglied aktiv + keine Lizenz
 * =====================================
 */
function findMissingLicences(members, licenceMap) {

    const result = [];

    for (const member of members) {

        if (licenceMap.has(member.id))
            continue;

        result.push(member);

    }

    return result;

}

/**
 * =====================================
 * Lizenz löschen
 * Archiviert + Lizenz vorhanden
 * =====================================
 */
function findArchivedLicences(archive, licenceMap) {

    const result = [];

    for (const person of archive) {

        const licence = licenceMap.get(person.id);

        if (!licence)
            continue;

        result.push({

            archive: person,
            licence

        });

    }

    return result;

}

/**
 * =====================================
 * Abklären
 *
 * Lizenz vorhanden
 * Nicht aktiv
 * Nicht archiviert
 * =====================================
 */
function findUnknownLicences(
    licences,
    memberMap,
    archiveMap
) {

    const result = [];

    for (const licence of licences) {

        if (memberMap.has(licence.id))
            continue;

        if (archiveMap.has(licence.id))
            continue;

        result.push(licence);

    }

    return result;

}