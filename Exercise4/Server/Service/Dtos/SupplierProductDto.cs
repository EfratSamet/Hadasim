using Repository.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Dtos
{
    public class SupplierProductDto
    {
        public int Id { get; set; }
        public int SupplierID { get; set; }
        public int ProductID { get; set; }
    }
}
