using System.Collections.Generic;

namespace TodoAppDAL
{
    public interface ITaskRepository
    {
        System.Threading.Tasks.Task<IEnumerable<Task>> GetTasks();
        System.Threading.Tasks.Task DeleteTask(int taskID);
        System.Threading.Tasks.Task InsertTask(Task task, int projectID);
        System.Threading.Tasks.Task UpdateTask(Task task, int taskId);

    }
}
