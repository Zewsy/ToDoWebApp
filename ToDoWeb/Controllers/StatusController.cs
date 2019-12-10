using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ToDoDAL;

namespace ToDoWeb.Controllers
{
    [Route("api/Projects/{projectId}/[controller]")]
    [ApiController]
    public class StatusesController : ControllerBase
    {
        private readonly IStatusRepository statusRepository;

        public StatusesController(IStatusRepository srepo)
        {
            statusRepository = srepo;
        }

        [HttpGet]
        public ActionResult<List<Status>> GetStatuses(int projectId)
        {
            return statusRepository.GetStatuses(projectId).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Status> GetStatus(int projectId, int id)
        {
            var status = statusRepository.GetStatus(projectId, id);
            if (status == null)
                return NotFound();
            return status;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteStatus(int projectId, int id)
        {
            await statusRepository.DeleteStatus(projectId, id);
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Status>> PostStatus(int projectId, Status status)
        {
            await statusRepository.InsertStatus(projectId, status);
            return CreatedAtAction(nameof(GetStatus), new { id = status.Id }, status);
        }
    }
}