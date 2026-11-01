using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using web_sitem.Data;
using web_sitem.Models;

namespace web_sitem.Controllers;

public class HomeController : Controller
{
    private readonly AppDbContext _context;

    public HomeController(AppDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        ViewData["Title"] = "Ana Sayfa";
        ViewData["Description"] = "Kurumsal web çözümleri, portföy ve iletişim desteği sunan modern bir ASP.NET Core sitesi.";
        return View();
    }

    public IActionResult About()
    {
        ViewData["Title"] = "Hakkımızda";
        ViewData["Description"] = "Şirketimiz, web tasarım, e-ticaret ve dijital pazarlama hizmetleri ile markanızın çevrimiçi başarısını destekler.";
        return View();
    }

    public async Task<IActionResult> Services()
    {
        ViewData["Title"] = "Hizmetler";
        ViewData["Description"] = "Web tasarım, e-ticaret ve dijital pazarlama hizmetlerimiz ile işletmeniz için etkili çözümler sunuyoruz.";
        var services = await _context.Services.ToListAsync();
        return View(services);
    }

    public async Task<IActionResult> Portfolio()
    {
        ViewData["Title"] = "Portföy";
        ViewData["Description"] = "Tamamladığımız projelerden oluşan portföyümüze göz atın ve sunduğumuz iş sonuçlarını keşfedin.";
        var portfolio = await _context.PortfolioItems.ToListAsync();
        return View(portfolio);
    }

    public async Task<IActionResult> Blog(string? category, string? q)
    {
        ViewData["Title"] = "Belgeler";
        ViewData["Description"] = "Web tasarım, SEO ve dijital pazarlama üzerine hazırladığımız güncel blog içeriklerini okuyun.";

        var postsQuery = _context.BlogPosts.AsQueryable();

        if (!string.IsNullOrWhiteSpace(category))
        {
            postsQuery = postsQuery.Where(post => post.Category == category);
        }

        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            postsQuery = postsQuery.Where(post =>
                post.Title.Contains(term) ||
                post.Summary.Contains(term) ||
                post.Excerpt.Contains(term) ||
                post.Content.Contains(term));
        }

        var posts = await postsQuery.OrderByDescending(post => post.PublishedAt).ToListAsync();
        var categories = await _context.BlogPosts
            .Where(post => !string.IsNullOrWhiteSpace(post.Category))
            .Select(post => post.Category)
            .Distinct()
            .OrderBy(categoryName => categoryName)
            .ToListAsync();
        var popularPosts = await _context.BlogPosts
            .OrderByDescending(post => post.ViewCount)
            .ThenByDescending(post => post.PublishedAt)
            .Take(4)
            .ToListAsync();

        return View(new BlogIndexViewModel
        {
            Posts = posts,
            Categories = categories,
            SelectedCategory = category,
            SearchQuery = q,
            PopularPosts = popularPosts
        });
    }

    public async Task<IActionResult> BlogPost(string slug)
    {
        var post = await _context.BlogPosts.FirstOrDefaultAsync(post => post.Slug == slug);
        if (post is null)
        {
            return NotFound();
        }

        post.ViewCount += 1;
        await _context.SaveChangesAsync();

        var comments = await _context.BlogComments
            .Where(comment => comment.BlogPostId == post.Id)
            .OrderByDescending(comment => comment.CreatedAt)
            .ToListAsync();

        var popularPosts = await _context.BlogPosts
            .Where(blogPost => blogPost.Id != post.Id)
            .OrderByDescending(blogPost => blogPost.ViewCount)
            .ThenByDescending(blogPost => blogPost.PublishedAt)
            .Take(4)
            .ToListAsync();

        ViewData["Title"] = post.Title;
        ViewData["Description"] = post.Summary;

        return View(new BlogDetailViewModel
        {
            Post = post,
            Comments = comments,
            PopularPosts = popularPosts,
            NewComment = new BlogComment()
        });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> SubmitComment(string slug, BlogComment newComment)
    {
        var post = await _context.BlogPosts.FirstOrDefaultAsync(blogPost => blogPost.Slug == slug);
        if (post is null)
        {
            return NotFound();
        }

        if (string.IsNullOrWhiteSpace(newComment.Name) || string.IsNullOrWhiteSpace(newComment.Email) || string.IsNullOrWhiteSpace(newComment.Message))
        {
            ModelState.AddModelError(string.Empty, "Lütfen ad, e-posta ve mesaj alanlarını doldurun.");
            var comments = await _context.BlogComments.Where(comment => comment.BlogPostId == post.Id).OrderByDescending(comment => comment.CreatedAt).ToListAsync();
            var popularPosts = await _context.BlogPosts.Where(blogPost => blogPost.Id != post.Id).OrderByDescending(blogPost => blogPost.ViewCount).ThenByDescending(blogPost => blogPost.PublishedAt).Take(4).ToListAsync();
            ViewData["Title"] = post.Title;
            ViewData["Description"] = post.Summary;
            return View("BlogPost", new BlogDetailViewModel
            {
                Post = post,
                Comments = comments,
                PopularPosts = popularPosts,
                NewComment = newComment
            });
        }

        newComment.BlogPostId = post.Id;
        _context.BlogComments.Add(newComment);
        await _context.SaveChangesAsync();

        return RedirectToAction(nameof(BlogPost), new { slug });
    }

    [HttpGet]
    public IActionResult Contact()
    {
        ViewData["Title"] = "İletişim";
        ViewData["Description"] = "Bize ulaşmak için iletişim formunu doldurun veya ofis bilgilerini kullanarak hızlıca bağlantı kurun.";
        return View(new ContactFormModel());
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Contact(ContactFormModel model)
    {
        ViewData["Title"] = "İletişim";
        ViewData["Description"] = "Bize ulaşmak için iletişim formunu doldurun veya ofis bilgilerini kullanarak hızlıca bağlantı kurun.";

        if (!ModelState.IsValid)
        {
            return View(model);
        }

        _context.ContactMessages.Add(new ContactMessage
        {
            Name = model.Name,
            Email = model.Email,
            Subject = model.Subject,
            Message = model.Message,
            ReceivedAt = DateTime.UtcNow
        });

        await _context.SaveChangesAsync();
        return RedirectToAction("ThankYou");
    }

    public IActionResult ThankYou()
    {
        ViewData["Title"] = "Teşekkürler";
        ViewData["Description"] = "İletişim talebiniz alındı, en kısa sürede sizinle iletişime geçeceğiz.";
        return View();
    }

    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Inbox()
    {
        ViewData["Title"] = "Gelen Mesajlar";
        ViewData["Description"] = "Admin paneli: Gelen iletişim mesajlarını görüntüleyin ve talepleri takip edin.";
        var messages = await _context.ContactMessages.OrderByDescending(m => m.ReceivedAt).ToListAsync();
        return View(messages);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
