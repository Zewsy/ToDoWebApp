using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using ToDoDAL.EF;

namespace ToDoDAL
{
    public class StatusRepository : IStatusRepository
    {
        private readonly TodoDb db;

        public StatusRepository(TodoDb db)
        {
            this.db = db;
        }
        public async System.Threading.Tasks.Task DeleteStatus(int projectId, int statusID)
        {
            EF.dbStatus status = null;
            status = await db.Statuses.Where(s => s.Id == statusID).FirstOrDefaultAsync();

            if (status == null)
                return;

            db.Statuses.Remove(status);
            await db.SaveChangesAsync();
        }

        public IEnumerable<Status> GetStatuses(int projectId)
        {
            return db.Statuses.Where(s => s.ProjectId == projectId).Select(s => new Status(s.Name, s.Id)).ToList();
        }

        public Status GetStatus(int projectId, int id)
        {
            return db.Statuses
                .Where(s => s.Id == id)
                .Select(s => new Status(s.Name, s.Id))
                .FirstOrDefault();
        }

        public async System.Threading.Tasks.Task InsertStatus(int projectId, Status status)
        {
            EF.dbStatus dbStatus = new EF.dbStatus
            {
                Name = status.Name,
                ProjectId = projectId
            };

            db.Statuses.Add(dbStatus);
            await db.SaveChangesAsync();
            status.Id = dbStatus.Id;
        }
    }
}
