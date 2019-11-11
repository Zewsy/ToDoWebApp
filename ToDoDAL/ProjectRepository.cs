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
            EF.Project project = null;
            project = await db.Projects.Where(project => project.Id == projectID).FirstOrDefaultAsync();

            if (project == null)
                return;

            db.Projects.Remove(project);
            await db.SaveChangesAsync();
            
        }

        public async System.Threading.Tasks.Task<IEnumerable<Project>> GetProjects()
        {
            return await db.Projects.Select(dbProject => new Project(dbProject.Title, dbProject.Description, dbProject.Id)).ToListAsync();
        }

        public async System.Threading.Tasks.Task InsertProject(Project project)
        {
            EF.Project dbProject = new EF.Project();
            dbProject.Title = project.Title;
            dbProject.Description = project.Description;

            db.Projects.Add(dbProject);
            await db.SaveChangesAsync();
        }

        public async System.Threading.Tasks.Task UpdateProject(Project project)
        {
            if (project.Id == 0)
                return;
            var dbProject = await db.Projects.Where(p => p.Id == project.Id).FirstOrDefaultAsync();
            dbProject.Title = project.Title;
            dbProject.Description = project.Description;

            await db.SaveChangesAsync();
        }
    }
}
