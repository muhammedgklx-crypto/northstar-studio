using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using web_sitem.Data;
using web_sitem.Models;

namespace web_sitem.Controllers;

public class AccountController : Controller
{
    private readonly AppDbContext _context;

    public AccountController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Login(string? returnUrl = null)
    {
        ViewData["Title"] = "Giriş Yap";
        ViewData["ReturnUrl"] = returnUrl;
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(string email, string password, string? returnUrl = null)
    {
        ViewData["Title"] = "Giriş Yap";
        ViewData["ReturnUrl"] = returnUrl;

        var user = await _context.UserAccounts.FirstOrDefaultAsync(u => u.Email == email);
        if (user is null || user.Password != password)
        {
            ModelState.AddModelError(string.Empty, "E-posta veya parola hatalı.");
            return View();
        }

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.DisplayName),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var principal = new ClaimsPrincipal(identity);

        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

        if (!string.IsNullOrWhiteSpace(returnUrl) && Url.IsLocalUrl(returnUrl))
        {
            return Redirect(returnUrl);
        }

        return RedirectToAction("Index", "Home");
    }

    [HttpGet]
    public IActionResult Register()
    {
        ViewData["Title"] = "Kayıt Ol";
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Register(string name, string email, string password)
    {
        ViewData["Title"] = "Kayıt Ol";

        if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
        {
            ModelState.AddModelError(string.Empty, "Lütfen tüm alanları doldurun.");
            return View();
        }

        if (await _context.UserAccounts.AnyAsync(u => u.Email == email))
        {
            ModelState.AddModelError(string.Empty, "Bu e-posta adresi zaten kayıtlı.");
            return View();
        }

        _context.UserAccounts.Add(new UserAccount
        {
            Email = email,
            DisplayName = name,
            Password = password,
            Role = "User"
        });

        await _context.SaveChangesAsync();

        TempData["SuccessMessage"] = "Kayıt başarılı. Şimdi giriş yapabilirsiniz.";
        return RedirectToAction("Login");
    }

    [Authorize]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return RedirectToAction("Index", "Home");
    }
}
