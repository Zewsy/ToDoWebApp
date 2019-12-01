using System;
using System.Collections.Generic;
using System.Text;

namespace ToDoDAL
{
    public interface IStatusRepository
    {
        IEnumerable<Status> GetStatuses(int projectId);
        Status GetStatus(int projectId, int statusID);
        System.Threading.Tasks.Task DeleteStatus(int projectId, int statusID);
        System.Threading.Tasks.Task InsertStatus(int projectId, Status status);
    }
}
