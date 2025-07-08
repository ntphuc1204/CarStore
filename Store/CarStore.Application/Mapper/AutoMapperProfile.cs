using AutoMapper;
using CarStore.Application.Dtos;
using CarStore.Domain.Entities;

namespace CarStore.Application.Mapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // Ánh xạ Category
            CreateMap<Category, CategoryDto>();
            CreateMap<CategoryCreateDto, Category>();
            CreateMap<UpdateCategoryDto, Category>();

            // Ánh xạ Product => ProductDto (phải có cho BookingDetailDto)
            CreateMap<Product, ProductDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : ""));

            CreateMap<CreateProductDto, Product>();
            CreateMap<UpdateProductDto, Product>();

            // Booking CreateDto => Booking Entity
            CreateMap<BookingCreateDto, Booking>();

            // User
            CreateMap<ApplicationUser, UserDto>();
            CreateMap<UpdateUserDto,ApplicationUser>()
                   .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber))
                    .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address));

            // Booking => BookingDetailDto (User + Product)
            CreateMap<BookingConfirm, Booking>();
            CreateMap<Booking, BookingDetailDto>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.UserName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User.Email))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.User.PhoneNumber))
                .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.User.Address))
                .ForMember(dest => dest.Product, opt => opt.MapFrom(src => src.Product)) // map sang ProductDto
                .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity))
                .ForMember(dest => dest.BookingDate, opt => opt.MapFrom(src => src.BookingDate))
                .ForMember(dest => dest.Note, opt => opt.MapFrom(src => src.Note))
                .ForMember(dest => dest.PromotionID, opt => opt.MapFrom(src => src.Promotion.Id))
                .ForMember(dest => dest.PromotionTitle, opt => opt.MapFrom(src => src.Promotion.Title))
                .ForMember(dest => dest.DiscountPercent, opt => opt.MapFrom(src => src.Promotion.DiscountPercent));

            CreateMap<Promotion, PromotionDto>()
               .ForMember(dest => dest.Status, opt => opt.MapFrom(src =>
                   src.EndDate < DateTime.Now ? "Hết hạn" :
                   src.StartDate > DateTime.Now ? "Sắp diễn ra" : "Đang áp dụng"
               ));

            CreateMap<PromotionUpdate, Promotion>();
            // PromotionCreateDto → Promotion
            CreateMap<PromotionCreateDto, Promotion>()
                .ForMember(dest => dest.InitialQuantity, opt => opt.MapFrom(src => src.Quantity));

            //Message
            CreateMap<CreateConversationDto, Conversation>()
           .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
           .ForMember(dest => dest.LastMessageTime, opt => opt.MapFrom(_ => DateTime.UtcNow));

            CreateMap<Message, MessageDto>();
            CreateMap<Message, MessageByUserDto>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Conversation.User1Id));
        }
    }
}
