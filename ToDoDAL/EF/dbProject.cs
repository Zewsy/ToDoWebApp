using System;
using System.Collections.Generic;

namespace ToDoDAL.EF
{
    internal partial class dbProject
    {
        public dbProject()
        {
            Tasks = new HashSet<dbTask>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<dbTask> Tasks { get; set; }
        public virtual ICollection<dbStatus> Statuses { get; set; }
    }
}
