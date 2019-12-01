using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ToDoDAL.EF
{
    public static class DbInitializer
    {
        public static void Initialize(TodoDb context)
        {
            context.Database.EnsureCreated();

            if (context.Projects.Any())
            {
                return;
            }

            var projects = new dbProject[]
            {
                new dbProject{Name="Main Project", Description="Making the backend"},
                new dbProject{Name="Project 2", Description="asd1234 afafoepfio poakfe apfkao ffjaiofh fe iuafeaeufnnafnief if heu"}
            };

            foreach (dbProject p in projects)
                context.Projects.Add(p);

            context.SaveChanges();

            var statuses = new dbStatus[]
{
                new dbStatus{Name="Done", ProjectId=1},
                new dbStatus{Name="In Progress", ProjectId=1},
                new dbStatus{Name="Pending", ProjectId=1},
                new dbStatus{Name="Suspended", ProjectId=1}
};

            foreach (dbStatus s in statuses)
                context.Statuses.Add(s);

            context.SaveChanges();

            var tasks = new dbTask[]
            {
                new dbTask{Title="Planning",Description="Fixed plan",Deadline=DateTime.Parse("2019-10-25"),Priority=1,StatusId=1, ProjectId=1},
                new dbTask{Title="Preparation", Description="Tasks specified", Deadline=DateTime.Parse("2019-10-25"), Priority=2, StatusId=1, ProjectId=1},
                new dbTask{Title="Task A", Description="As soon as possible", Deadline=DateTime.Parse("2019-10-25"), Priority=1, StatusId=2, ProjectId=1},
                new dbTask{Title="Task B", Description="in parallel with Task A", Deadline=DateTime.Parse("2019-10-25"), Priority=2, StatusId=2, ProjectId=1},
                new dbTask{Title="Task C", Description="Not urgent", Deadline=DateTime.Parse("2019-10-25"), Priority=3, StatusId=3, ProjectId=1},
                new dbTask{Title="Task D", Description="Important to do", Deadline=DateTime.Parse("2019-10-25"), Priority=1, StatusId=3, ProjectId=2},
                new dbTask{Title="Task E", Description="", Deadline=DateTime.Parse("2019-10-25"), Priority=3, StatusId=2, ProjectId=2}
            };

            foreach (dbTask t in tasks)
                context.Tasks.Add(t);

            context.SaveChanges();
        }
    }
}
