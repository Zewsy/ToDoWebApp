using System;
using System.Collections.Generic;

namespace ToDoDAL.EF
{
    public partial class Project
    {
        public Project()
        {
            Tasks = new HashSet<Task>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Task> Tasks { get; set; }
    }
}
