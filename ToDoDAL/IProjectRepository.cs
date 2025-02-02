﻿using System.Collections.Generic;

namespace ToDoDAL
{
    public interface IProjectRepository
    {
        IEnumerable<Project> GetProjects();
        Project GetProjectById(int id);
        System.Threading.Tasks.Task DeleteProject(int projectID);
        System.Threading.Tasks.Task InsertProject(Project project);
        System.Threading.Tasks.Task UpdateProject(Project project);
    }
}
