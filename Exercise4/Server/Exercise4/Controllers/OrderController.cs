using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Exercise4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _service;

        public OrderController(IOrderService service)
        {
            _service = service;
        }

        // GET: api/<OrderController>
        [HttpGet]
        public IEnumerable<OrderDto> Get()
        {
            return _service.GetAll();
        }

        // GET api/<OrderController>/5
        [HttpGet("{id}")]
        public OrderDto Get(int id)
        {
            return _service.Get(id);
        }

        // POST api/<OrderController>
        [HttpPost]
        public OrderDto Post([FromBody]OrderDto value)
        {
           return _service.Add(value);
        }
        //[HttpGet("{id}/user")]
        //public IEnumerable<OrderDto> GetOrdersByUser(int id)
        //{
        //    return _service.GetOrdersByUser(id);
        //}
        [HttpGet("{id}/pending")]
        public IEnumerable<OrderDto> GetOrdersPending(int id)
        {
            return _service.GetOrdersPending(id);
        }
        [HttpGet("{id}/completed")]
        public OrderDto UpdateOrderToCompleted(int id)
        {
            return _service.UpdateOrderToCompleted(id);
        }
        [HttpGet("{id}/inProgress")]
        public OrderDto UpdateOrderToInProgress(int id)
        {
            return _service.UpdateOrderToInProgress(id);
        }
        [HttpGet("{id}/bySupplier")]
        public IEnumerable<OrderDto> GetOrderBySupplier(int id)
        {
            return _service.GetOrderBySupplier(id);
        }
    }
}
