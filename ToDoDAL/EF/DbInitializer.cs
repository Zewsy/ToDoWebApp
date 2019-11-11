using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TodoAppDAL.EF
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

            var statuses = new Status[]
            {
                new Status{Name="Done"},
                new Status{Name="In Progress"},
                new Status{Name="Pending"},
                new Status{Name="Suspended"}
            };

            foreach (Status s in statuses)
                context.Statuses.Add(s);

            context.SaveChanges();

            var projects = new Project[]
            {
                new Project{Title="Main Project", Description="Making the backend"},
                new Project{Title="Project 2", Description="asd1234 afafoepfio poakfe apfkao ffjaiofh fe iuafeaeufnnafnief if heu"}
            };

            foreach (Project p in projects)
                context.Projects.Add(p);

            context.SaveChanges();

            var tasks = new Task[]
            {
                new Task{Title="Planning",Description="Fixed plan",Deadline=DateTime.Parse("2019-10-25"),Priority=1,StatusId=1, ProjectId=1},
                new Task{Title="Preparation", Description="Tasks specified", Deadline=DateTime.Parse("2019-10-25"), Priority=2, StatusId=1, ProjectId=1},
                new Task{Title="Task A", Description="As soon as possible", Deadline=DateTime.Parse("2019-10-25"), Priority=1, StatusId=2, ProjectId=1},
                new Task{Title="Task B", Description="in parallel with Task A", Deadline=DateTime.Parse("2019-10-25"), Priority=2, StatusId=2, ProjectId=1},
                new Task{Title="Task C", Description="Not urgent", Deadline=DateTime.Parse("2019-10-25"), Priority=3, StatusId=3, ProjectId=1},
                new Task{Title="Task D", Description="Important to do", Deadline=DateTime.Parse("2019-10-25"), Priority=1, StatusId=3, ProjectId=2},
                new Task{Title="Task E", Description="", Deadline=DateTime.Parse("2019-10-25"), Priority=3, StatusId=2, ProjectId=2}
            };

            foreach (Task t in tasks)
                context.Tasks.Add(t);

            context.SaveChanges();
        }
    }
}
