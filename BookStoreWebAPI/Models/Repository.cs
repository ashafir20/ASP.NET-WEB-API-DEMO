using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookStoreWebAPI.Models
{
    public class Repository : IRepository
    {
        private BookStoreWebAPIContext db;

        public Repository(BookStoreWebAPIContext db)
        {
            this.db = db;
        }

        public IQueryable<Order> GetAllOrders()
        {
            return db.Orders;
        }

        public IQueryable<Order> GetAllOrdersWithDetails()
        {
            return db.Orders.Include("OrderDetails");
        }

        public Order GetOrder(int id)
        {
            return db.Orders.Include("OrderDetails.Book")
                .FirstOrDefault(order => order.Id == id);
        } 
    }
}