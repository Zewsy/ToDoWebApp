using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDoDAL;

namespace ToDoWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusesController : ControllerBase
    {
        private readonly IStatusRepository statusRepository;

        public StatusesController(IStatusRepository srepo)
        {
            statusRepository = srepo;
        }

        [HttpGet]
        public IEnumerable<Status> GetStatuses()
        {
            return statusRepository.GetStatuses();
        }

        [HttpGet("{id}")]
        public ActionResult<Status> GetStatus(int id)
        {
            var status = statusRepository.GetStatus(id);
            if (status == null)
                return NotFound();
            return status;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteStatus(int id)
        {
            await statusRepository.DeleteStatus(id);
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Status>> PostStatus(Status status)
        {
            await statusRepository.InsertStatus(status);
            return CreatedAtAction(nameof(GetStatus), new { id = status.Id }, status);
        }
    }
}