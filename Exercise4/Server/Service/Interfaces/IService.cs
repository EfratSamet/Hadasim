using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IService<T>
    {
        List<T> GetAll();
        T Get(int id);
        T Add(T item);
    }
}
