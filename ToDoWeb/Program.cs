using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using TodoAppDAL;
using TodoAppDAL.EF;

namespace TodoAppWeb
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();
            //_ = RunTestAsync();
            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();

        /*public static async System.Threading.Tasks.Task RunTestAsync()
        {
            using (TodoDb db = new TodoDb())
            {
                DbInitializer.Initialize(db);
                TaskRepository testrepo = new TaskRepository(db);
                //await testrepo.DeleteTask(4);
                //await testrepo.InsertTask(new TodoAppDAL.Task("InsertedTask", "My task from Test", DateTime.Parse("2019-11-11"), 2, "In Progress"), 1);
                //await testrepo.UpdateTask(new TodoAppDAL.Task("InsertedTask", "My task from Test But Updated", DateTime.Parse("2019-11-11"), 2, "In Progress"), 8);
                //IEnumerable<TodoAppDAL.Task> tasks = await testrepo.GetTasks();
                /*foreach(TodoAppDAL.Task t in tasks)
                {
                    System.Diagnostics.Debug.WriteLine(t.Title);
                }
            }
        }*/
    }
}
