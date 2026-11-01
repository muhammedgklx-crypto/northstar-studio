using web_sitem.Data;

namespace web_sitem.Models;

public static class SiteData
{
    public static IReadOnlyList<Service> DefaultServices { get; } = new[]
    {
        new Service { Title = "Kurumsal Web Tasarım", Description = "Marka değerini yükselten, kullanıcı dostu ve hızlı kurumsal web siteleri tasarlıyoruz.", Icon = "🖥️", ActionText = "İncele", ImageUrl = "/images/placeholder-service.svg" },
        new Service { Title = "E-Ticaret Çözümleri", Description = "Ürün keşfi, güvenli ödeme ve mobil satış deneyimini tek çatı altında optimize ediyoruz.", Icon = "🛒", ActionText = "Detayları Gör", ImageUrl = "/images/placeholder-service.svg" },
        new Service { Title = "Dijital Pazarlama", Description = "SEO, içerik ve reklam stratejileriyle marka görünürlüğünü artırıyoruz.", Icon = "📈", ActionText = "Hemen Başla", ImageUrl = "/images/placeholder-service.svg" },
        new Service { Title = "Süreç ve Otomasyon", Description = "İş akışlarınızı otomatikleştiren özel çözümler geliştiriyoruz.", Icon = "⚙️", ActionText = "Tavsiye Al", ImageUrl = "/images/placeholder-service.svg" }
    };

    public static IReadOnlyList<PortfolioItem> DefaultPortfolio { get; } = new[]
    {
        new PortfolioItem { Title = "Eğitim Portalı", Category = "Web Uygulaması", Description = "Öğrenci, öğretmen ve yönetim panelini tek bir deneyimde birleştiren modern portal.", ActionText = "Detayları Gör", ImageUrl = "/images/placeholder-portfolio.svg" },
        new PortfolioItem { Title = "Kafe Web Sitesi", Category = "Marka Hikayesi", Description = "Rezervasyon, menü ve sosyal medya içerik akışını bütünleştiren butik site.", ActionText = "İncele", ImageUrl = "/images/placeholder-portfolio.svg" },
        new PortfolioItem { Title = "Kurumsal Site", Category = "Kurumsal", Description = "Profesyonel görünüm ve hızlı içerik yönetimiyle markayı öne çıkaran çözüm.", ActionText = "Görüntüle", ImageUrl = "/images/placeholder-portfolio.svg" },
        new PortfolioItem { Title = "Sağlık Kliniği", Category = "Hizmet", Description = "Randevu, iletişim ve hizmet tanıtımı odaklı geliştirilmiş dijital ağı.", ActionText = "Keşfet", ImageUrl = "/images/placeholder-portfolio.svg" }
    };

    public static IReadOnlyList<BlogPost> DefaultBlogPosts { get; } = new[]
    {
        new BlogPost { Slug = "guncel-web-tasarim-trendleri", Title = "Güncel Web Tasarım Trendleri", Summary = "2026’da kullanıcı deneyimini artıran modern tasarım yaklaşımlarını keşfedin.", Excerpt = "Web tasarımında sadeleşme ve performansa odaklanmak, kullanıcı memnuniyetini artırır.", Content = "Dijital ürünler artık daha hızlı, daha yalın ve daha erişilebilir olmak zorunda. Bu nedenle modern web siteleri, sadelik ve performans odaklı bir yapı ile kullanıcıların beklentilerini karşılıyor.", Category = "Tasarım", PublishedAt = DateTime.UtcNow.AddDays(-18), ViewCount = 126, ImageUrl = "/images/placeholder-blog.svg" },
        new BlogPost { Slug = "seo-ile-organik-ziyaret-arttirma", Title = "SEO ile Organik Ziyaret Artırma", Summary = "Arama motorlarında görünürlüğünüzü yükselten temel stratejileri öğrenin.", Excerpt = "Doğru anahtar kelimeler, içerik kalitesi ve hızlı web sitesi performansı organik trafiği artırır.", Content = "SEO, bir web sitesinin sürdürülebilir başarısı için kritik öneme sahiptir. Doğru içerik planı, teknik optimizasyon ve sürekli analiz ile markanız daha fazla ziyaretçi çeker.", Category = "Pazarlama", PublishedAt = DateTime.UtcNow.AddDays(-32), ViewCount = 221, ImageUrl = "/images/placeholder-blog.svg" },
        new BlogPost { Slug = "iletisim-formu-donusturme-kurallari", Title = "İletişim Formu Dönüştürme Kuralları", Summary = "Formların dönüşüm oranını artırmak için uygulanabilecek etkili yöntemler.", Excerpt = "Basit, açıklayıcı ve kısa formlar daha fazla dönüşüm sağlar.", Content = "İyi tasarlanmış iletişim formları, ziyaretçi güvenini kazanmak ve hızlı iletişim kurmak için önemlidir. Hedefe yönelik kısa sorular ve net çağrı metinleri bu süreci olumlu etkiler.", Category = "İletişim", PublishedAt = DateTime.UtcNow.AddDays(-12), ViewCount = 84, ImageUrl = "/images/placeholder-blog.svg" },
        new BlogPost { Slug = "mobil-ilk-dijital-deneyim", Title = "Mobil İlk Dijital Deneyim", Summary = "Mobil kullanıcı davranışına göre şekillenen modern site yapıları.", Excerpt = "Mobil cihazların ağırlığı arttıkça sitelerin taşınabilir tasarım yaklaşımı kritik hale geliyor.", Content = "Mobil ilk yaklaşım, kullanıcıyı önceleyen bir tasarım dilidir. Düzenin, yükleme hızının ve etkileşimlerin mobil ekranlarda kusursuz çalışması gerekir.", Category = "Ürün", PublishedAt = DateTime.UtcNow.AddDays(-6), ViewCount = 67, ImageUrl = "/images/placeholder-blog.svg" }
    };

    public static void EnsureSeedData(AppDbContext context)
    {
        if (!context.Services.Any())
        {
            context.Services.AddRange(DefaultServices);
        }

        if (!context.PortfolioItems.Any())
        {
            context.PortfolioItems.AddRange(DefaultPortfolio);
        }

        if (!context.BlogPosts.Any())
        {
            context.BlogPosts.AddRange(DefaultBlogPosts);
        }

        if (!context.UserAccounts.Any())
        {
            context.UserAccounts.Add(new UserAccount { Email = "muhammedgikli4@gmail.com", DisplayName = "Yönetici", Password = "mgkl0202", Role = "Admin" });
        }

        // seed sample products for Stripe demo
        if (!context.Products.Any())
        {
            context.Products.AddRange(
                new Product { Title = "Örnek Ürün A", Description = "Kısa açıklama A", PriceCents = 5000, Currency = "usd", ImageUrl = "/images/placeholder-portfolio.svg" },
                new Product { Title = "Örnek Ürün B", Description = "Kısa açıklama B", PriceCents = 7500, Currency = "usd", ImageUrl = "/images/placeholder-portfolio.svg" }
            );
        }

        context.SaveChanges();
    }
}

public sealed class Service
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public string ActionText { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
}

public sealed class PortfolioItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ActionText { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
}

public sealed class BlogPost
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public DateTime PublishedAt { get; set; }
    public int ViewCount { get; set; }
    public string? ImageUrl { get; set; }
}

public sealed class BlogComment
{
    public int Id { get; set; }
    public int BlogPostId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public sealed class BlogIndexViewModel
{
    public IReadOnlyList<BlogPost> Posts { get; set; } = Array.Empty<BlogPost>();
    public IReadOnlyList<string> Categories { get; set; } = Array.Empty<string>();
    public string? SelectedCategory { get; set; }
    public string? SearchQuery { get; set; }
    public IReadOnlyList<BlogPost> PopularPosts { get; set; } = Array.Empty<BlogPost>();
}

public sealed class BlogDetailViewModel
{
    public BlogPost Post { get; set; } = new();
    public IReadOnlyList<BlogComment> Comments { get; set; } = Array.Empty<BlogComment>();
    public IReadOnlyList<BlogPost> PopularPosts { get; set; } = Array.Empty<BlogPost>();
    public BlogComment NewComment { get; set; } = new();
}

public sealed class ContactFormModel
{
    [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Adınız gereklidir.")]
    public string Name { get; set; } = string.Empty;

    [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "E-posta gereklidir.")]
    [System.ComponentModel.DataAnnotations.EmailAddress(ErrorMessage = "Geçerli bir e-posta adresi girin.")]
    public string Email { get; set; } = string.Empty;

    public string Subject { get; set; } = string.Empty;

    [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Mesaj alanı boş bırakılmamalıdır.")]
    public string Message { get; set; } = string.Empty;
}

public sealed class ContactMessage
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public DateTime ReceivedAt { get; set; } = DateTime.UtcNow;
}

public sealed class UserAccount
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Role { get; set; } = "User";
}
