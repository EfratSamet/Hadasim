using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Exercise4.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _service;

        public ProductController(IProductService service)
        {
            _service = service;
        }

        // GET: api/<ProductController>
        [HttpGet]
        public IEnumerable<ProductDto> Get()
        {
            return _service.GetAll();
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public ProductDto Get(int id)
        {
            return _service.Get(id);
        }

        // POST api/<ProductController>
        [HttpPost]
        public void Post([FromBody]ProductDto value)
        {
            _service.Add(value);
        }
        [HttpGet("{id}/GetProductsBySupplier")]
        public List< ProductDto> GetProductsBySupplieret(int id)
        {
            return _service.GetProductsBySupplier(id);
        }
    }
}
