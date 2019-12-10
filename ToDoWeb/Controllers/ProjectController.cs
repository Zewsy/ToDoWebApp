using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ToDoDAL;

namespace ToDoWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectRepository projectRepository;

        public ProjectsController(IProjectRepository prepo)
        {
            projectRepository = prepo;
        }

        [HttpGet]
        public ActionResult<List<Project>> GetProjects()
        {
            return projectRepository.GetProjects().ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Project> GetProject(int id)
        {
            var project = projectRepository.GetProjectById(id);
            if (project == null)
                return NotFound();
            return project;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProject(int id)
        {
            await projectRepository.DeleteProject(id);
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Project>> PostProject(Project project)
        {
            await projectRepository.InsertProject(project);
            return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutTask(int id, Project project)
        {
            if (id != project.Id)
                return BadRequest();

            await projectRepository.UpdateProject(project);

            return NoContent();
        }
    }
}