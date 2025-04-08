using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Exercise4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemController : ControllerBase
    {
        private readonly IOrderItemService _service;

        public OrderItemController(IOrderItemService service)
        {
            _service = service;
        }

        // GET: api/<OrderItemController>
        [HttpGet]
        public IEnumerable<OrderItemDto> Get()
        {
            return _service.GetAll();
        }

        // GET api/<OrderItemController>/5
        [HttpGet("{id}")]
        public OrderItemDto Get(int id)
        {
            return _service.Get(id);
        }

        // POST api/<OrderItemController>
        [HttpPost]
        public void Post([FromBody]OrderItemDto value)
        {
            _service.Add(value);
        }
    }
}
