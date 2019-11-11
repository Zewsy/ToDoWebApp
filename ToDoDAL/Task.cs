using System;
using System.Collections.Generic;
using System.Text;

namespace ToDoDAL
{
    public class Task
    {
        public Task(string title, string description, DateTime deadline, int priority, string status, int id = 0)
        {
            ID = id;
            Title = title;
            Description = description;
            Deadline = deadline;
            Priority = priority;
            StatusName = status;
        }

        public int? ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Deadline { get; set; }
        public int Priority { get; set; }
        public string StatusName { get; set; }
    }
}
