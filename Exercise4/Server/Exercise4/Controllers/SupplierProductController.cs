using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Service.Dtos;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Exercise4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierProductController : ControllerBase
    {
        private readonly ISupplierProductService _service;

        public SupplierProductController(ISupplierProductService service)
        {
            _service = service;
        }

        // GET: api/<SupplierProductController>
        [HttpGet]
        public IEnumerable<SupplierProductDto> Get()
        {
            return _service.GetAll();
        }

        // GET api/<SupplierProductController>/5
        [HttpGet("{id}")]
        public SupplierProductDto Get(int id)
        {
            return _service.Get(id);
        }

        // POST api/<SupplierProductController>
        [HttpPost]
        public void Post([FromBody] SupplierProductDto value)
        {
            _service.Add(value);
        }

    }
}
