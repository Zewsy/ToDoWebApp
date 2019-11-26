using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ToDoDAL.EF;

namespace ToDoDAL
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
            EF.dbTask task = null;
            task = await db.Tasks.Where(t => t.Id == taskID).FirstOrDefaultAsync();  
            
            if (task == null)
                return;

            db.Tasks.Remove(task);
            await db.SaveChangesAsync();
        }

        public IEnumerable<Task> GetTasks()
        {
            return db.Tasks.Select(dbTask => new Task(dbTask.Title, dbTask.Description, dbTask.Deadline, dbTask.Priority, dbTask.Status.Name, dbTask.Id)).ToList();
        }

        public async System.Threading.Tasks.Task InsertTaskToProject(Task task, int projectID)
        {
            int statusID = await GetStatusIDByName(task.StatusName);
            await HandleAddingNewPriority(task.Priority, statusID, projectID);

            EF.dbTask dbTask = new EF.dbTask();
            dbTask.Priority = task.Priority;
            dbTask.StatusId = statusID;
            dbTask.Title = task.Title;
            dbTask.ProjectId = projectID;
            dbTask.Deadline = task.Deadline;
            dbTask.Description = task.Description;

            db.Tasks.Add(dbTask);
            await db.SaveChangesAsync();
        }

        public async System.Threading.Tasks.Task UpdateTask(Task task)
        {
            if (task.ID == 0)
                return;

            int statusID = await GetStatusIDByName(task.StatusName);
            var taskDb = await db.Tasks.Where(t => t.Id == task.ID).FirstOrDefaultAsync();
            await HandleAddingNewPriority(task.Priority, statusID, taskDb.ProjectId);

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

        private async System.Threading.Tasks.Task HandleAddingNewPriority(int priority, int statusId, int projectId)
        {
            var conflictTask = await db.Tasks
                                    .Where(t => t.ProjectId == projectId &&t.StatusId == statusId && t.Priority == priority)
                                    .FirstOrDefaultAsync();
            if(conflictTask != null)
            {
                var tasks = await db.Tasks
                            .OrderBy(t => t.Priority)
                            .Where(t => t.ProjectId == projectId && t.StatusId == statusId && t.Priority >= priority)
                            .ToListAsync();
                foreach (EF.dbTask t in tasks)
                    t.Priority++;
                await db.SaveChangesAsync();
            }
        }
    }
}
