using System;
using System.Collections.Generic;
using System.Text;

namespace ToDoDAL
{
    public class Project
    {
        public Project() { }
        public Project(string name, string description, int id)
        {
            Id = id;
            Name = name;
            Description = description;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
