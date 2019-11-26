using System;
using System.Collections.Generic;

namespace ToDoDAL.EF
{
    public partial class dbProject
    {
        public dbProject()
        {
            Tasks = new HashSet<dbTask>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public virtual ICollection<dbTask> Tasks { get; set; }
    }
}
