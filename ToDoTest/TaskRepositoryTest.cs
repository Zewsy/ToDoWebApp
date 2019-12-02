using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Linq;
using ToDoDAL;
using ToDoDAL.EF;

namespace ToDoTest
{
    [TestClass]
    public class TaskRepositoryTest
    {
        [TestMethod]
        public async System.Threading.Tasks.Task TestInsertNewTaskWithPriorityConflict()
        {
            //Setup
            var options = new DbContextOptionsBuilder<TodoDb>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            var taskToAdd = new Task("ConflictTask", "TestDesc", new System.DateTime(2019, 12, 01), 2, "testStatus", 1);

            var status = new List<Status> { new Status("testStatus", 1) };
            var tasks = new List<Task>
            {
                new Task("Task 1", "desc", new System.DateTime(2019, 12, 01), 1, "testStatus", 1),
                new Task("Task 2", "desc", new System.DateTime(2019, 12, 01), 2, "testStatus", 2),
                new Task("Task 3", "desc", new System.DateTime(2019, 12, 01), 3, "testStatus", 3)
            };
            var project = new List<Project> { new Project("testProject", "anya", 1) };

            using (var context = new TodoDb(options))
            {

                var taskRepository = new TaskRepository(context);
                var statusRepository = new StatusRepository(context);
                var projectRepository = new ProjectRepository(context);
                await projectRepository.InsertProject(project.ElementAt(0));
                await statusRepository.InsertStatus(1, status.ElementAt(0));
                tasks.ForEach(async t => await taskRepository.InsertTaskToProject(1, t));

                await taskRepository.InsertTaskToProject(1, taskToAdd);
            }

            //Verify
            using(var context = new TodoDb(options))
            {
                var taskRepository = new TaskRepository(context);
                var addedTasks = taskRepository.GetTasksFromProject(1);
                Assert.AreEqual(4, addedTasks.Count());

                var taskWithPriority1 = addedTasks.Where(t => t.Priority == 1).FirstOrDefault();
                var taskWithPriority2 = addedTasks.Where(t => t.Priority == 2).FirstOrDefault();
                var taskWithPriority3 = addedTasks.Where(t => t.Priority == 3).FirstOrDefault();
                var taskWithPriority4 = addedTasks.Where(t => t.Priority == 4).FirstOrDefault();

                Assert.AreEqual("Task 1", taskWithPriority1.Title);
                Assert.AreEqual("ConflictTask", taskWithPriority2.Title);
                Assert.AreEqual("Task 2", taskWithPriority3.Title);
                Assert.AreEqual("Task 3", taskWithPriority4.Title);
            }
        }
    }
}
