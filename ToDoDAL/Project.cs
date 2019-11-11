using System;
using System.Collections.Generic;
using System.Text;

namespace ToDoDAL
{
    public class Project
    {
        public Project(string title, string description, int id = 0)
        {
            Id = id;
            Title = title;
            Description = description;
        }

        public int? Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
