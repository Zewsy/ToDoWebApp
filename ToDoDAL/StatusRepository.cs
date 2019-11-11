using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
        public async System.Threading.Tasks.Task DeleteStatus(int statusID)
        {
            EF.Status status = null;
            status = await db.Statuses.Where(s => s.Id == statusID).FirstOrDefaultAsync();

            if (status == null)
                return;

            db.Statuses.Remove(status);
            await db.SaveChangesAsync();
        }

        public async Task<IEnumerable<Status>> GetStatuses()
        {
            return await db.Statuses.Select(s => new Status(s.Name, s.Id)).ToListAsync();
        }

        public async System.Threading.Tasks.Task InsertStatus(Status status)
        {
            EF.Status dbStatus = new EF.Status();
            dbStatus.Name = status.Name;

            db.Statuses.Add(dbStatus);
            await db.SaveChangesAsync();
        }
    }
}
