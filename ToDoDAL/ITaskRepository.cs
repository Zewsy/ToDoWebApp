using System.Collections.Generic;

namespace ToDoDAL
{
    public interface ITaskRepository
    {
        IEnumerable<Task> GetTasksFromProject(int projectId);
        Task GetTask(int projectId, int taskId);
        System.Threading.Tasks.Task DeleteTask(int taskId);
        System.Threading.Tasks.Task InsertTaskToProject(int projectId, Task task);
        System.Threading.Tasks.Task UpdateTask(int projectId, Task task);

    }
}
