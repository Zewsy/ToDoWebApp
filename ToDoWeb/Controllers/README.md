# REST API Endpoints

## Projects

 - Összes projekt: `GET /api/Projects/`
 - Egy projekt: `GET /api/Projects/:id/`
 - Egy projekt törlése: `DELETE /api/Projects/:id/`
 - Projekt készítése: `POST /api/Projects/`
 - Projekt módosítása: `PUT /api/Projects/:id/`

## Tasks
Minden Task egy projekten keresztül érhető el.

 - Összes task: `GET api/Projects/:projectid/Tasks/`
- Egy task: `GET api/Projects/:projectId/Tasks/:id/`
- Task törlése: `DELETE api/Projects/:projectId/Tasks/:id/`
- Task létrehozása: `POST api/Projects/:projectId/Tasks/`
- Task módosítása: `PUT api/Projects/:projectId/Tasks/:id/`

 ## Statuses
 Minden Status egy projekten keresztül érhető el.
 - Összes status: `GET api/Projects/:projectid/Statuses/`
- Egy status: `GET api/Projects/:projectId/Statuses/:id/`
- Status törlése: `DELETE api/Projects/:projectId/Statuses/:id/`
- Status létrehozása: `POST api/Projects/:projectId/Statuses/`
