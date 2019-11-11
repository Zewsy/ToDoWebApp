using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TodoAppDAL.EF;

namespace TodoAppDAL
{
    public class TaskRepository : ITaskRepository
    {

        private readonly TodoDb db;

        public TaskRepository(TodoDb db)
        {
            this.db = db;
        }

        public async System.Threading.Tasks.Task DeleteTask(int taskID)
        {
            EF.Task task = null;
            try
            {
                task = await db.Tasks.Where(t => t.Id == taskID).FirstOrDefaultAsync();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            
            
            if (task == null)
                return;

            db.Tasks.Remove(task);
            await db.SaveChangesAsync();
        }

        public async System.Threading.Tasks.Task<IEnumerable<Task>> GetTasks()
        {
            return await db.Tasks.Select(dbTask => new Task(dbTask.Title, dbTask.Description, dbTask.Deadline, dbTask.Priority, dbTask.Status.Name)).ToListAsync();
        }

        public async System.Threading.Tasks.Task InsertTask(Task task, int projectID)
        {
            int statusID = await GetStatusIDByName(task.StatusName);

            EF.Task dbTask = new EF.Task();
            dbTask.Priority = task.Priority;
            dbTask.StatusId = statusID;
            dbTask.Title = task.Title;
            dbTask.ProjectId = projectID;
            dbTask.Deadline = task.Deadline;
            dbTask.Description = task.Description;

            db.Tasks.Add(dbTask);
            await db.SaveChangesAsync();
            return;
        }

        public async System.Threading.Tasks.Task UpdateTask(Task task, int taskId)
        {
            int statusID = await GetStatusIDByName(task.StatusName);
            var taskDb = await db.Tasks.Where(t => t.Id == taskId).FirstOrDefaultAsync();
            taskDb.Priority = task.Priority;
            taskDb.StatusId = statusID;
            taskDb.Title = task.Title;
            taskDb.Description = task.Description;
            taskDb.Deadline = task.Deadline;

            await db.SaveChangesAsync();
        }

        private async System.Threading.Tasks.Task<int> GetStatusIDByName(string statusName)
        {
            return await System.Threading.Tasks.Task.FromResult<int>(db.Statuses
                .Where(s => s.Name == statusName)
                .Select(s => s.Id)
                .FirstOrDefault());
        }
    }
}
