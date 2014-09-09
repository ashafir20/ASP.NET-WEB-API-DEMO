using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BookStoreWebAPI.Models
{
    public class BookStoreContextInitializer : DropCreateDatabaseAlways<BookStoreWebAPIContext>
    {
        protected override void Seed(BookStoreWebAPIContext context)
        {

            var books = new List<Book>
            {
                new Book() { Name  = "War and Peace", Author  = "Tolstoy", Price = 19.5m },
                new Book() { Name  = "As I Lay Dying", Author  = "Faulkner", Price = 27.5m },
                new Book() { Name  = "Pro Win 8", Author  = "Liberty", Price = 19.5m },
                new Book() { Name  = "Harr Potter", Author  = "J.K.Rowling", Price = 19.5m },
                new Book() { Name  = "Book One", Author  = "Author1", Price = 19.5m },
                new Book() { Name  = "Book Two", Author  = "Author2", Price = 19.5m },
                new Book() { Name  = "Book Three", Author  = "Author3", Price = 19.5m },

            };

            books.ForEach(book => context.Books.Add(book));
            context.SaveChanges();


            var order = new Order() {Customer = "John Doe", OrderDate = new DateTime(2014, 4, 1)};
            var details = new List<OrderDetail>
            {
                new OrderDetail() { Book = books[0], Quantity = 1, Order = order },
                new OrderDetail() { Book = books[2], Quantity = 2, Order = order },
                new OrderDetail() { Book = books[1], Quantity = 3, Order = order },
            };

            context.Orders.Add(order);
            details.ForEach(o => context.OrderDetails.Add(o));
            context.SaveChanges();

            order = new Order() { Customer = "Joe Smith", OrderDate = new DateTime(2014, 9, 18) };
            details = new List<OrderDetail>
            {
                new OrderDetail() { Book = books[1], Quantity = 1, Order = order },
                new OrderDetail() { Book = books[1], Quantity = 1, Order = order },
                new OrderDetail() { Book = books[3], Quantity = 12, Order = order },
                new OrderDetail() { Book = books[4], Quantity = 3, Order = order },
            };

            context.Orders.Add(order);
            details.ForEach(o => context.OrderDetails.Add(o));
            context.SaveChanges();


            order = new Order() { Customer = "Ward Bell", OrderDate = new DateTime(2014, 12, 25) };
            details = new List<OrderDetail>
            {
                new OrderDetail() { Book = books[2], Quantity = 1, Order = order },
                new OrderDetail() { Book = books[4], Quantity = 1, Order = order },
                new OrderDetail() { Book = books[3], Quantity = 1, Order = order },
                new OrderDetail() { Book = books[1], Quantity = 3, Order = order },
            };

            context.Orders.Add(order);
            details.ForEach(o => context.OrderDetails.Add(o));
            context.SaveChanges();



            base.Seed(context);
        }
    }
}