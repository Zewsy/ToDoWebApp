# Komponensek
A komponensek mellett sok esetben egy hasonló nevű, "Styles"/"Theme" postfix-el ellátott .js fájl is megtalálható, amelyben az adott komponens ***CSS-in-JS*** alapú stílusozása található.
Ez a kinézet testreszabásához használt **Material-UI** által használt megoldás.

## Home
### ProjectTable
A lekérdezett projekteket 1-1 **Project** komponensbe teszi, majd táblázatos formában rendereli őket.

Biztosít továbbá egy *"Projekt hozzáadása"* gombot.

### Project

 - Projekt adatok megjelenítése.
 - Biztosít egy törlés gombot.
 - Kiválasztás esetén értesíti a *store*-t és a *history* objektumon keresztül a teendők oldalára navigál.

## CreateProject
Projekt név és leírás megadás után a "Hozzáadás" gomb hatására üzen a *store*-nak, amellyel új projekt hozható létre.

## TaskBoard

### TaskBoard

 - A **ProjectBar**-nak a kiválasztott **Project** által megadott nevet adja át.
 - Megjelenít egy **TaskContainer**-t is.

### ProjectBar

 - Megjeleníti a TaskBoard tetején a projekt nevét.
 - Biztosít egy "Projekt hozzáadása" és egy "Projekt kiválasztása" gombot a név mellett.

### TaskContainer

 - A lekérdezett teendőket prioritás szerint sorrendezi.
 - A lekérdezett státuszok alapján a kiválogatja a teendőket és mindhez 1-1 **TaskTable** komponenst köt, amiket meg is jelenít.
 - "Új státusz felvétele" gombot megjelenít
 - **NewStatusDialog** és **FormDialog** megjelenítése

### TaskTable

 - ***StatusBar*** megjelenítése
 - Teendők ***Task*** komponensbe csomagolás és megjelenítése

### StatusBar

 - Teendő hozzáadás és státusz törlés gombok megjelenítése

### Task

 - Teendő szerkesztés/törlés gombok megjelenítése
 - Teendő adatok megjelenítése

### NewStatusDialog

 - Státusz felvétele dialógus megjelenítése
 - Státusz felvétel gomb biztosítása

### FormDialog

 - Teendő felvétele/módsoítása dialógus megjelenítése: *redux* logika vezérli, hogy melyik lesz.
