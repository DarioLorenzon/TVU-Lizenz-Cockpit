# 🏐 TVU Lizenz-Cockpit

Ein Werkzeug zum Abgleich der **TV Unterstrass Mitgliederverwaltung** mit den **SHV-Lizenzen**.

Das Lizenz-Cockpit unterstützt den Lizenzverantwortlichen dabei, fehlende oder überzählige SHV-Lizenzen schnell zu erkennen und als Arbeitsliste nach Excel zu exportieren.

---

# Funktionen

Das Cockpit vergleicht drei Excel-Dateien:

- Mitgliederverwaltung
- Archivierte Mitglieder
- SHV-Lizenzen

Daraus entstehen vier Kategorien:

| Status | Bedeutung |
|---------|-----------|
| ✅ Keine Aktion | Mitglied aktiv und Lizenz vorhanden |
| ➕ Lizenz erstellen | Mitglied aktiv, aber keine SHV-Lizenz vorhanden |
| ❌ Lizenz löschen | Lizenz vorhanden, Mitglied ist archiviert |
| ⚠️ Abklären | Lizenz vorhanden, Mitglied weder aktiv noch archiviert |

---

# Intelligenter Namensvergleich

Der Vergleich berücksichtigt verschiedene Schreibweisen automatisch.

Unter anderem werden:

- Gross-/Kleinschreibung ignoriert
- Umlaute (ä → ae usw.) berücksichtigt
- Akzente entfernt
- Apostrophe ignoriert
- Bindestriche ignoriert
- doppelte Vornamen erkannt
- erste Vornamen verglichen

Dadurch werden viele Unterschiede zwischen Mitgliederverwaltung und SHV automatisch erkannt.

---

# Benötigte Dateien

## Mitgliederverwaltung

Pflichtfelder:

- Name
- Vorname
- Geburt
- Team

---

## Archivierte Mitglieder

Pflichtfelder:

- Name
- Vorname
- Geburt
- Austrittsdatum

---

## SHV-Lizenzen

Pflichtfelder:

- Name
- Vorname
- Geburt
- Lizenz

---

# Ergebnis

Im Browser wird ein Dashboard angezeigt.

Der eigentliche Arbeitsrapport wird als Excel-Datei exportiert.

Der Excel-Bericht enthält:

- Aktion
- Name
- Vorname
- Geburtsdatum
- Team
- Lizenz
- Austrittsdatum
- Bemerkung

---

# Projektstruktur

```
TVU-Lizenz-Cockpit
│
├── index.html
├── css/
│   └── style.css
│
└── js/
    ├── app.js
    ├── compare.js
    ├── excel.js
    ├── export.js
    ├── ui.js
    ├── utils.js
    └── validation.js
```

---

# Technologien

- HTML5
- CSS3
- JavaScript (ES6)
- SheetJS (xlsx)

---

# Version

Aktuelle Version:

**v1.0.0**

---

# Lizenz

Dieses Projekt wurde für den internen Einsatz beim **TV Unterstrass Handball** entwickelt.

---

# Autor

**Dario Lorenzon**

TV Unterstrass Handball

Lizenzverantwortlicher
