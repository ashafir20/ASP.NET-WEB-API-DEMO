using System.Linq;
using Breeze.ContextProvider;
using Newtonsoft.Json.Linq;

namespace BookStoreWebAPI.Models
{
    public interface IRepository
    {
        string MetaData { get; }
        SaveResult SaveChanges(JObject saveBundle);
        IQueryable<Book> Books();
        IQueryable<Order> Orders();
    }
}