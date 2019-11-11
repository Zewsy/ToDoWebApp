using System;
using System.Collections.Generic;
using System.Text;

namespace ToDoDAL
{
    public class Status
    {
        public Status(string name, int id = 0)
        {
            Id = id;
            Name = name;
        }

        public int Id { get; set; }
        public string Name { get; set; }
    }
}
