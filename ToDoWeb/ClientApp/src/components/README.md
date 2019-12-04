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
 
 # Redux logika
A logikai műveletek az **actions**-ben, az állapotok kezelése a **reducer**-ekben találhatók.

Az actionok között Task/Project/Status esetén a *Success* postfixű functionok a reducer felé továbbítanak üzeneteket, hogy az a megfelelő változtatásokat elvégezze.

## Task actions
- **projectSelected(projectId)**: Beállítja a jelenleg kiválasztott projektet. Ez szükséges a megfelelő URL-ek használatához a kérések küldése esetén.
- **fetchTasks()**: GET kéréssel lekérdezi a kiválasztott projecthez tartozó taskokat.
 - **addTask(task)**: POST kéréssel elküldi a paraméterben adott task-ot. A visszakapott task-ot delegálja a *handleAddingNewPriority*-nak.
 - **handleAddingNewPriority(addResult)**: Az újonnan hozzáadott tasknak megfelelően a már meglévő taskokat rendezi prioritás alapján, majd delegál a megfelelő *Success* function-nek.
 
 - **editTask(task)**: PUT kéréssel elküldi a paraméterben kapott task-ot az **id** alapján, majd delegál.
 - **deleteTask(taskId)**: DELETE kérést küld az adott id-hoz.
 - **deleteTasksWithStatus(statusName)**: Státusz törlése esetén kell meghívni, hogy a hozzá tartozó taskok is törölve legyenek a reducer-ből.

## Project actions

 -  **fetchProjects()**: GET kéréssel lekérdezi az összes projektet.
 - **deleteProject()**: DELETE kérés küldése adott id-hoz.
 - **addProject(project, history)**: POST kérés küldése a projecttel, majd delegálás után a *Home* képernyőre való navigálás.

## Status actions
- **fetchStatuses()**: Kiválasztott projekthez tartozó statusok lekérdezése (GET).
- **deleteStatus(statusName)**: Név alapján kikeresi a megfelelő statusId-t és DELETE kérést küld. Az első *dispatch* a *deleteTasksWithStatus*-nak szól.
- **addStatus(status)**: POST kérés küldése a status-al.

## Dialog actions/reducer

 - **openDialog()**: *FormDialog* nyitása. A reducerben az **isDialogActive** tartozik hozzá.
 - **openEditDialog()**: Annak jelzése, hogy a *FormDialog* ***meglévő*** task-on dolgozik épp. **isEditing** tartozik hozzá.
 - **openNewStatusDialog()**: *NewStatusDialog* nyitása. **isNewStatusDialogActive** tartozik hozzá.
 - **closeDialog()**: Az összes dialógus zárása (összes booleant false-ra állítja).
 - **submitDialog()**: *FormDialog* által összeállított Task adatok elküldése, az **isEditing** állapotától függően.

*Megjegyzés:* A *FormDialog* a reducerben lévő **editingTaskData**-n végzi a módosításokat, a **submitDialog()** végső soron innen kapja az adatokat.
