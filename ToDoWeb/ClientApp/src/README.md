# Index és App, alapvető felépítés
A React alkalmazás az **index.js** fájlból indul ki.
Az alkalmazás két fontos komponensbe csomagolja be a vázat leíró App komponenst:
 - **BrowserRouter**: A routingot biztosítja. A react-router-dom csomag része.
 - **Provider**: A belső komponensek számára elérhetővé teszi a redux store-t. A react-redux csomag része.

Az **App** a **Switch**-en belül hozza létre az alkalmazásban fellelhető **Route**-okat.

 - /: A *ProjectTable*, mint home képernyő.
 - /create-project: *CreateProject* képernyő
 - /tasks: *TaskBoard* által megjelenített teendők képernyője

További komponensek: [Komponensek](https://github.com/Zewsy/ToDoWebApp/tree/master/ToDoWeb/ClientApp/src/components)

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
