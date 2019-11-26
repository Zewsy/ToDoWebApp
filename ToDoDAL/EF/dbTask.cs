using System;
using System.Collections.Generic;

namespace ToDoDAL.EF
{
    internal partial class dbTask
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Deadline { get; set; }
        public int Priority { get; set; }
        public int ProjectId { get; set; }
        public int StatusId { get; set; }

        public virtual dbProject Project { get; set; }
        public virtual dbStatus Status { get; set; }
    }
}
