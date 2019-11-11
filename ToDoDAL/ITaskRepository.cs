using System.Collections.Generic;

namespace ToDoDAL
{
    public interface ITaskRepository
    {
        System.Threading.Tasks.Task<IEnumerable<Task>> GetTasks();
        System.Threading.Tasks.Task DeleteTask(int taskID);
        System.Threading.Tasks.Task InsertTaskToProject(Task task, int projectID);
        System.Threading.Tasks.Task UpdateTask(Task task);

    }
}
