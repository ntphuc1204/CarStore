using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Application.Dtos
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Logo { get; set; }
    }
    public class CategoryCreateDto
    {
        public string Name { get; set; }
        public string Brand {  get; set; }
        public string Logo { get; set; }
    }
    public class UpdateCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public string? NewLogo { get; set; }
    }
}
