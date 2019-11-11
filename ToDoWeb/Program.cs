using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using ToDoDAL.EF;
using ToDoDAL;

namespace TodoAppWeb
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();
            InitializeDb();
            _ = RunTestAsync();
            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();

        public static void InitializeDb()
        {
            using (TodoDb db = new TodoDb())
            {
                DbInitializer.Initialize(db);
            }
        }

        public static void PrintTestResults(IEnumerable<ToDoDAL.Task> tasks, IEnumerable<ToDoDAL.Project> projects, IEnumerable<ToDoDAL.Status> statuses)
        {
            foreach (ToDoDAL.Task t in tasks)
            {
                System.Diagnostics.Trace.WriteLine(t.Title + " TestRes");
            }
            foreach (ToDoDAL.Project p in projects)
            {
                System.Diagnostics.Trace.WriteLine(p.Title + " TestRes");
            }
            foreach (ToDoDAL.Status s in statuses)
            {
                System.Diagnostics.Trace.WriteLine(s.Name + " TestRes");
            }
        }

        public static async System.Threading.Tasks.Task RunTestAsync()
        {
            using (TodoDb db = new TodoDb())
            {
                TaskRepository taskTestRepo = new TaskRepository(db);
                ProjectRepository projectTestRepo = new ProjectRepository(db);
                StatusRepository statusTestRepo = new ToDoDAL.StatusRepository(db);

                await taskTestRepo.InsertTaskToProject(new ToDoDAL.Task("InsertedTask", "My task from Test", DateTime.Parse("2019-11-11"), 2, "In Progress"), 1);
                await taskTestRepo.DeleteTask(4);
                await taskTestRepo.UpdateTask(new ToDoDAL.Task("InsertedTask", "My task from Test But Updated", DateTime.Parse("2019-11-11"), 2, "In Progress", 8));

                await projectTestRepo.DeleteProject(2);
                await projectTestRepo.InsertProject(new ToDoDAL.Project("Third project", "Inserted"));
                var projects = await projectTestRepo.GetProjects();

                var tasks = await taskTestRepo.GetTasks();

                await statusTestRepo.InsertStatus(new ToDoDAL.Status("Very important"));
                await statusTestRepo.DeleteStatus(4);
                var statuses = await statusTestRepo.GetStatuses();

                PrintTestResults(tasks, projects, statuses);   
            }
        }
    }
}
