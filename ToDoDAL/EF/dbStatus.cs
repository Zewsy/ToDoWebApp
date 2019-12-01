using System;
using System.Collections.Generic;

namespace ToDoDAL.EF
{
    internal partial class dbStatus
    {
        public dbStatus()
        {
            Tasks = new HashSet<dbTask>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int ProjectId { get; set; }
        public virtual ICollection<dbTask> Tasks { get; set; }
        public virtual dbProject Project { get; set; }

    }
}
