using System.Collections.Generic;

namespace ToDoDAL
{
    public interface IProjectRepository
    {
        System.Threading.Tasks.Task<IEnumerable<Project>> GetProjects();
        System.Threading.Tasks.Task DeleteProject(int projectID);
        System.Threading.Tasks.Task InsertProject(Project project);
        System.Threading.Tasks.Task UpdateProject(Project project);
    }
}
