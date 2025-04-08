using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Repository.Interfaces;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Exercise4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly ISupplierService _service;

        public SupplierController(ISupplierService service)
        {
            _service = service;
        }

        // GET: api/<SupplierController>
        [HttpGet]
        public IEnumerable<SupplierDto> Get()
        {
            return _service.GetAll();
        }

        // GET api/<SupplierController>/5
        [HttpGet("{id}")]
        public SupplierDto Get(int id)
        {
            return _service.Get(id);
        }

        // POST api/<SupplierController>
        [HttpPost]
        public void Post([FromBody]SupplierDto value)
        {
            _service.Add(value);
        }
    }
}
