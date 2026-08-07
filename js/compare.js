// ======================================
// TVU Lizenz-Cockpit
// compare.js
// Version 1.3.0
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
            members,
            archive,
            licenceMap
        ),

        pruefen: findUnknownLicences(
            licences,
            members,
            memberMap,
            archiveMap
        )

    };

}

/**
 * =====================================
 * Keine Aktion
 *
 * Mitglied aktiv + Lizenz vorhanden
 * =====================================
 */
function findExistingLicences(
    members,
    licenceMap
) {

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
 *
 * Mitglied aktiv + keine Lizenz
 * =====================================
 */
function findMissingLicences(
    members,
    licenceMap
) {

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
 *
 * Archiviert + Lizenz vorhanden
 *
 * Ausnahme:
 * Aktive Mitglieder haben Vorrang.
 * =====================================
 */
function findArchivedLicences(
    members,
    archive,
    licenceMap
) {

    const result = [];

    const memberMap = createMap(members);

    for (const person of archive) {

        // Aktiv schlägt Archiv
        if (memberMap.has(person.id))
            continue;

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
 *
 * Zusätzlich wird ein möglicher Treffer
 * in der Mitgliederverwaltung gesucht.
 * =====================================
 */
function findUnknownLicences(
    licences,
    members,
    memberMap,
    archiveMap
) {

    const result = [];

    for (const licence of licences) {

        if (memberMap.has(licence.id))
            continue;

        if (archiveMap.has(licence.id))
            continue;

        const match = findPossibleMatch(
            licence,
            members
        );

        result.push({

            licence,
            match

        });

    }

    return result;

}