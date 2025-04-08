using AutoMapper;
using Repository.Entities;
using Repository.Interfaces;
using Service.Dtos;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _repository;
        private readonly IMapper _mapper;

        public UserService(IRepository<User> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public UserDto Add(UserDto item)
        {
            return _mapper.Map<UserDto>(_repository.Add(_mapper.Map<User>(item)));
        }

        public UserDto Get(int id)
        {
            return _mapper.Map<UserDto>(_repository.Get(id));
        }

        public List<UserDto> GetAll()
        {
            return _mapper.Map<List<UserDto>>(_repository.GetAll());
        }
    }
}
