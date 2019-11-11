﻿using System;
using System.Collections.Generic;
using System.Text;

namespace ToDoDAL
{
    public interface IStatusRepository
    {
        System.Threading.Tasks.Task<IEnumerable<Status>> GetStatuses();
        System.Threading.Tasks.Task DeleteStatus(int statusID);
        System.Threading.Tasks.Task InsertStatus(Status status);
    }
}
