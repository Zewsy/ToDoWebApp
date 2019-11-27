using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDoDAL;

namespace ToDoWeb.Controllers
{
    [Route("api/Projects/{projectId}/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskRepository taskRepository;

        public TasksController(ITaskRepository trepo)
        {
            taskRepository = trepo;
        }

        [HttpGet]
        public IEnumerable<ToDoDAL.Task> GetTasks(int projectId)
        {
            return taskRepository.GetTasksFromProject(projectId);
        }

        [HttpGet("{id}")]
        public ActionResult<ToDoDAL.Task> GetTask(int projectId, int id)
        {
            var task = taskRepository.GetTask(projectId, id);
            if (task == null)
                return NotFound();
            return task;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTask(int projectId, int id)
        {
            await taskRepository.DeleteTask(id);
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<ToDoDAL.Task>> PostTask(int projectId, ToDoDAL.Task task)
        {
            await taskRepository.InsertTaskToProject(projectId, task);
            return CreatedAtAction(nameof(GetTask), new { id = task.ID }, task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int projectId, int id, ToDoDAL.Task task)
        {
            if (id != task.ID)
                return BadRequest();

            await taskRepository.UpdateTask(task);

            return NoContent();
        }

    }
}