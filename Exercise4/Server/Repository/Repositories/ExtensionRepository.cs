using Microsoft.Extensions.DependencyInjection;
using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public static class ExtensionRepository
    {
        public static IServiceCollection AddRepository(this IServiceCollection services)
        {
            services.AddScoped<IOrderRepository, OrderRepository>();
            //services.AddScoped<IOrderItemRepositiry, OrderItemRepository>();
            services.AddScoped<IProductRepositiry, ProductRepository>();
            //services.AddScoped<ISupplierProductRepository, SupplierProductRepository>();
            //services.AddScoped<ISupplierRepositiry, SupplierRepository>();
            //services.AddScoped<IUserRepositiry, UserRepository>();
            //services.AddScoped<IRepository<Order>, OrderRepository>();
            services.AddScoped<IRepository<OrderItem>, OrderItemRepository>();
            //services.AddScoped<IRepository<Product>, ProductRepository>();
            services.AddScoped<IRepository<Supplier>, SupplierRepository>();
            services.AddScoped<IRepository<SupplierProduct>, SupplierProductRepository>();
            services.AddScoped<IRepository<User>, UserRepository>();

            return services;

        }
    }
}
