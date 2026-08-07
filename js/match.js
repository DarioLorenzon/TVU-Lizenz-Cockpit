// ======================================
// TVU Lizenz-Cockpit
// match.js
// Version 1.0.0
// ======================================

"use strict";

/**
 * Sucht einen möglichen Treffer
 * für eine SHV-Lizenz in der Mitgliederverwaltung.
 */
function findPossibleMatch(licence, members) {

    // ----------------------------------
    // 1. Geburt + Nachname
    // ----------------------------------

    for (const member of members) {

        if (
            normalizeBirth(member.geburt) === normalizeBirth(licence.geburt) &&
            surnamesEqual(member.nachname, licence.nachname) &&
            !firstnamesEqual(member.vorname, licence.vorname)
        ) {

            return {

                person: member,
                reason: "Vorname unterschiedlich"

            };

        }

    }

    // ----------------------------------
    // 2. Geburt + Vorname
    // ----------------------------------

    for (const member of members) {

        if (
            normalizeBirth(member.geburt) === normalizeBirth(licence.geburt) &&
            firstnamesEqual(member.vorname, licence.vorname) &&
            !surnamesEqual(member.nachname, licence.nachname)
        ) {

            return {

                person: member,
                reason: "Nachname unterschiedlich"

            };

        }

    }

    // ----------------------------------
    // 3. Vor-/Nachname vertauscht
    // ----------------------------------

    for (const member of members) {

        if (
            normalizeName(member.nachname) === normalizeName(licence.vorname) &&
            normalizeName(member.vorname) === normalizeName(licence.nachname)
        ) {

            return {

                person: member,
                reason: "Vor- und Nachname vertauscht"

            };

        }

    }

    // ----------------------------------
    // Kein Treffer
    // ----------------------------------

    return null;

}