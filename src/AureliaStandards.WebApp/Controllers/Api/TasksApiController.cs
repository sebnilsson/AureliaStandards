using System;
using System.Collections.Generic;
using System.Net.Http;

using Microsoft.AspNetCore.Mvc;

namespace AureliaStandards.WebApp.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/tasks")]
    public class TasksApiController : Controller
    {
        private readonly TasksRepository _repository;

        public TasksApiController(TasksRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        // GET: api/tasks
        [HttpGet]
        public IEnumerable<TaskItem> Get()
        {
            var items = this._repository.GetAll();
            return items;
        }

        // GET: api/tasks/5
        [HttpGet("{id:guid}", Name = "Get")]
        public TaskItem Get(Guid id)
        {
            try
            {
                var item = this._repository.GetById(id);
                return item;
            }
            catch (ArgumentException ex)
            {
                throw new HttpRequestException($"Task with ID '{id}' not found.", ex);
            }
        }

        // POST: api/tasks
        [HttpPost]
        public void Post([FromBody] TaskItem task)
        {
            this._repository.AddOrUpdate(task);
        }

        // PUT: api/tasks/5
        [HttpPut("{id}")]
        public void Put(Guid id, [FromBody] TaskItem task)
        {
            task.Id = id;

            this._repository.AddOrUpdate(task);
        }

        // DELETE: api/tasks/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            try
            {
                this._repository.RemoveById(id);
            }
            catch (ArgumentException ex)
            {
                throw new HttpRequestException($"Task with ID '{id}' could not be deleted.", ex);
            }
        }
    }
}