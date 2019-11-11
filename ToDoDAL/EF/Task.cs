using System;
using System.Collections.Generic;

namespace ToDoDAL.EF
{
    public partial class Task
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Deadline { get; set; }
        public int Priority { get; set; }
        public int ProjectId { get; set; }
        public int StatusId { get; set; }

        public virtual Project Project { get; set; }
        public virtual Status Status { get; set; }
    }
}
