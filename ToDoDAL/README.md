# Data Access Layer

## Relációs séma
Az adattárolás *Entity Framework* alapú, egyszerű relációs sémában történik.

![Image](/ER.png)

Az EntityFramework által használt entitások a db prefixel kezdődő fájlokban vannak leírva.

Az EF/TodoDb konfigurálja a DbContext-et.

Az adatbázis kezdeti feltöltését az EF/DbInitializer végzi.

## Repositories
A projekt a Repository patternt valósítja meg, minden repositoryhoz egy interface-el és saját entitás osztályok használatával.

A controllerek ezen repositorykat használják az adatbázissal való kommunikációra.

### Task insert/update
A Task repository Insert/Update művelete komplexebb a többitől.

 - Mivel a **Task** entitásban csak a **StatusName** tárolódik, először meg kell keresni az adatbázisból a megfelelő **Status Id**-t (*GetStatusIDByName*).
 - Az új/módosított task prioritása változhatott, ami ütközhet a már meglévő prioritásokkal. Ennek kezelését a *HandleAddingNewPriority* metódus végzi.
 - A hozzáadás/módosítás ez után történhet meg.
