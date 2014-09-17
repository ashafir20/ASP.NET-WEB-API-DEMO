using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BookStoreWebAPI.Models;

namespace BookStoreWebAPI.Controllers
{
    public class OrderController : ApiController
    {
        private IRepository _repo;

        public OrderController(IRepository repo)
        {
            _repo = repo;
        }

        public IQueryable<Order> Get()
        {
            return _repo.GetAllOrders();
        }

        public IQueryable<Order> Get(bool includeDetails)
        {
            IQueryable<Order> query;

            if (includeDetails)
            {
                query = _repo.GetAllOrdersWithDetails();
            }
            else
            {
                query = _repo.GetAllOrders();
            }

            return query;
        }

        public Order Get(int id)
        {
            return _repo.GetOrder(id);
        }
    }
}
