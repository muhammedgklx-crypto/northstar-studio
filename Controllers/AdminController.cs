using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using web_sitem.Data;
using web_sitem.Models;

namespace web_sitem.Controllers;

[Authorize(Roles = "Admin")]
public class AdminController : Controller
{
    private readonly AppDbContext _context;

    public AdminController(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Dashboard()
    {
        ViewData["Title"] = "Yönetim Paneli";
        ViewData["Description"] = "Web sitesi içeriklerine yönetici olarak erişin ve yeni öğeler ekleyin veya kaldırın.";

        var model = new AdminDashboardViewModel
        {
            ServiceCount = await _context.Services.CountAsync(),
            PortfolioCount = await _context.PortfolioItems.CountAsync(),
            BlogCount = await _context.BlogPosts.CountAsync(),
            MessageCount = await _context.ContactMessages.CountAsync()
        };

        return View(model);
    }

    public async Task<IActionResult> Services()
    {
        ViewData["Title"] = "Hizmet Yönetimi";
        var services = await _context.Services.OrderBy(s => s.Title).ToListAsync();
        return View(services);
    }

    [HttpGet]
    public IActionResult CreateService()
    {
        ViewData["Title"] = "Yeni Hizmet Ekle";
        return View(new Service());
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> CreateService(Service service)
    {
        if (!ModelState.IsValid)
        {
            return View(service);
        }

        _context.Services.Add(service);
        await _context.SaveChangesAsync();
        return RedirectToAction("Services");
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteService(int id)
    {
        var service = await _context.Services.FindAsync(id);
        if (service != null)
        {
            _context.Services.Remove(service);
            await _context.SaveChangesAsync();
        }

        return RedirectToAction("Services");
    }

    public async Task<IActionResult> Portfolio()
    {
        ViewData["Title"] = "Portföy Yönetimi";
        var items = await _context.PortfolioItems.OrderBy(pi => pi.Title).ToListAsync();
        return View(items);
    }

    [HttpGet]
    public IActionResult CreatePortfolioItem()
    {
        ViewData["Title"] = "Yeni Portföy Öğesi Ekle";
        return View(new PortfolioItem());
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> CreatePortfolioItem(PortfolioItem item)
    {
        if (!ModelState.IsValid)
        {
            return View(item);
        }

        _context.PortfolioItems.Add(item);
        await _context.SaveChangesAsync();
        return RedirectToAction("Portfolio");
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeletePortfolioItem(int id)
    {
        var item = await _context.PortfolioItems.FindAsync(id);
        if (item != null)
        {
            _context.PortfolioItems.Remove(item);
            await _context.SaveChangesAsync();
        }

        return RedirectToAction("Portfolio");
    }

    public async Task<IActionResult> Blog()
    {
        ViewData["Title"] = "Blog Yönetimi";
        var posts = await _context.BlogPosts.OrderByDescending(post => post.PublishedAt).ToListAsync();
        return View(posts);
    }

    [HttpGet]
    public IActionResult CreateBlogPost()
    {
        ViewData["Title"] = "Yeni Blog Yazısı Ekle";
        return View(new BlogPost { PublishedAt = DateTime.UtcNow });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> CreateBlogPost(BlogPost blogPost)
    {
        if (!ModelState.IsValid)
        {
            return View(blogPost);
        }

        if (string.IsNullOrWhiteSpace(blogPost.Slug))
        {
            ModelState.AddModelError(nameof(blogPost.Slug), "Slug alanı gereklidir.");
            return View(blogPost);
        }

        _context.BlogPosts.Add(blogPost);
        await _context.SaveChangesAsync();
        return RedirectToAction("Blog");
    }

    [HttpGet]
    public async Task<IActionResult> EditBlogPost(int id)
    {
        var post = await _context.BlogPosts.FindAsync(id);
        if (post is null)
        {
            return NotFound();
        }

        ViewData["Title"] = "Blog Yazısını Düzenle";
        return View(post);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> EditBlogPost(BlogPost blogPost)
    {
        if (!ModelState.IsValid)
        {
            return View(blogPost);
        }

        if (string.IsNullOrWhiteSpace(blogPost.Slug))
        {
            ModelState.AddModelError(nameof(blogPost.Slug), "Slug alanı gereklidir.");
            return View(blogPost);
        }

        var existingPost = await _context.BlogPosts.FindAsync(blogPost.Id);
        if (existingPost is null)
        {
            return NotFound();
        }

        existingPost.Title = blogPost.Title;
        existingPost.Slug = blogPost.Slug;
        existingPost.Summary = blogPost.Summary;
        existingPost.Excerpt = blogPost.Excerpt;
        existingPost.Content = blogPost.Content;
        existingPost.Category = blogPost.Category;
        existingPost.PublishedAt = blogPost.PublishedAt;

        await _context.SaveChangesAsync();
        return RedirectToAction("Blog");
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteBlogPost(int id)
    {
        var post = await _context.BlogPosts.FindAsync(id);
        if (post != null)
        {
            _context.BlogPosts.Remove(post);
            await _context.SaveChangesAsync();
        }

        return RedirectToAction("Blog");
    }

    // Products management for admin
    public async Task<IActionResult> Products()
    {
        ViewData["Title"] = "Ürün Yönetimi";
        var products = await _context.Products.OrderBy(p => p.Title).ToListAsync();
        return View(products);
    }

    [HttpGet]
    public IActionResult CreateProduct()
    {
        ViewData["Title"] = "Yeni Ürün Ekle";
        return View(new web_sitem.Models.Product());
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> CreateProduct(web_sitem.Models.Product product)
    {
        if (!ModelState.IsValid)
        {
            return View(product);
        }

        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return RedirectToAction("Products");
    }

    [HttpGet]
    public async Task<IActionResult> EditProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product is null) return NotFound();
        ViewData["Title"] = "Ürün Düzenle";
        return View(product);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> EditProduct(web_sitem.Models.Product product)
    {
        if (!ModelState.IsValid) return View(product);
        var existing = await _context.Products.FindAsync(product.Id);
        if (existing is null) return NotFound();
        existing.Title = product.Title;
        existing.Description = product.Description;
        existing.PriceCents = product.PriceCents;
        existing.Currency = product.Currency;
        existing.ImageUrl = product.ImageUrl;
        await _context.SaveChangesAsync();
        return RedirectToAction("Products");
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product != null)
        {
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }
        return RedirectToAction("Products");
    }
}

public sealed class AdminDashboardViewModel
{
    public int ServiceCount { get; set; }
    public int PortfolioCount { get; set; }
    public int BlogCount { get; set; }
    public int MessageCount { get; set; }
}
