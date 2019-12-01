using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using ToDoDAL.EF;

namespace ToDoDAL
{
    public class ProjectRepository : IProjectRepository
    {

        private readonly TodoDb db;
        public ProjectRepository(TodoDb db)
        {
            this.db = db;
        }

        public async System.Threading.Tasks.Task DeleteProject(int projectID)
        {
            dbProject project = null;
            project = await db.Projects.Where(project => project.Id == projectID).FirstOrDefaultAsync();

            if (project == null)
                return;

            db.Projects.Remove(project);
            await db.SaveChangesAsync();
            
        }

        public IEnumerable<Project> GetProjects()
        {
            return db.Projects
                .Select(dbProject => new Project(dbProject.Name, dbProject.Description, dbProject.Id))
                .ToList();
        }

        public Project GetProjectById(int id)
        {
            return db.Projects
                .Where(dbProject => dbProject.Id == id)
                .Select(dbProject => new Project(dbProject.Name, dbProject.Description, dbProject.Id))
                .FirstOrDefault();
        }

        public async System.Threading.Tasks.Task InsertProject(Project project)
        {
            dbProject dbProject = new dbProject();
            dbProject.Name = project.Name;
            dbProject.Description = project.Description;

            db.Projects.Add(dbProject);
            await db.SaveChangesAsync();
            project.Id = dbProject.Id;
        }

        public async System.Threading.Tasks.Task UpdateProject(Project project)
        {
            if (project.Id == 0)
                return;
            var dbProject = await db.Projects.Where(p => p.Id == project.Id).FirstOrDefaultAsync();
            dbProject.Name = project.Name;
            dbProject.Description = project.Description;

            await db.SaveChangesAsync();
        }
    }
}
