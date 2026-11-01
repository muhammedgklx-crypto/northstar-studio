using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Stripe;
using Stripe.Checkout;
using web_sitem.Data;
using web_sitem.Models;

namespace web_sitem.Controllers;

public class PaymentsController : Controller
{
    private readonly IConfiguration _config;
    private readonly AppDbContext _db;

    public PaymentsController(IConfiguration config, AppDbContext db)
    {
        _config = config;
        _db = db;

        var secret = _config["Stripe:SecretKey"] ?? string.Empty;
        if (!string.IsNullOrWhiteSpace(secret) && !secret.Contains("PLACEHOLDER"))
        {
            StripeConfiguration.ApiKey = secret;
        }
    }

    [HttpGet]
    public IActionResult Product()
    {
        ViewData["Title"] = "Ürün - Ödeme Örneği";
        ViewData["Description"] = "Örnek bir ürün sayfası: Stripe Checkout ile ödeme deneyimi.";
        var products = _db.Products.OrderBy(p => p.Title).ToList();
        return View(products);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult CreateCheckout(int productId)
    {
        var product = _db.Products.Find(productId);
        if (product is null)
        {
            TempData["Error"] = "Seçilen ürün bulunamadı.";
            return RedirectToAction("Product");
        }

        var secret = _config["Stripe:SecretKey"] ?? string.Empty;
        if (string.IsNullOrWhiteSpace(secret) || secret.Contains("PLACEHOLDER"))
        {
            TempData["Error"] = "Stripe gizli anahtarı yapılandırılmamış. Lütfen appsettings.json veya ortam değişkenleri ile ayarlayın.";
            return RedirectToAction("Product");
        }

        var domain = $"{Request.Scheme}://{Request.Host}";

        var options = new SessionCreateOptions
        {
            PaymentMethodTypes = new List<string> { "card" },
            Mode = "payment",
            SuccessUrl = domain + Url.Action("CheckoutSuccess", "Payments") + "?session_id={CHECKOUT_SESSION_ID}",
            CancelUrl = domain + Url.Action("Product", "Payments"),
            LineItems = new List<SessionLineItemOptions>
            {
                new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        UnitAmount = product.PriceCents,
                        Currency = product.Currency,
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = product.Title,
                            Description = product.Description
                        }
                    },
                    Quantity = 1
                }
            }
        };

        var service = new SessionService();
        var session = service.Create(options);

        // create a pending order record
        var order = new Order
        {
            SessionId = session.Id,
            Amount = product.PriceCents,
            Currency = product.Currency,
            Status = "created",
            CreatedAt = DateTime.UtcNow
        };
        _db.Orders.Add(order);
        _db.SaveChanges();

        return Redirect(session.Url!);
    }

    [HttpGet]
    public IActionResult CheckoutSuccess(string session_id)
    {
        ViewData["Title"] = "Ödeme Başarılı";
        ViewData["Description"] = "Ödemeniz başarılı oldu. Teşekkür ederiz.";
        ViewData["SessionId"] = session_id;
        return View();
    }

    [HttpPost]
    [Route("/payments/webhook")]
    public IActionResult Webhook()
    {
        var json = new StreamReader(HttpContext.Request.Body).ReadToEnd();
        var webhookSecret = _config["Stripe:WebhookSecret"] ?? string.Empty;

        try
        {
            Event stripeEvent;
            if (!string.IsNullOrWhiteSpace(webhookSecret) && !webhookSecret.Contains("PLACEHOLDER"))
            {
                var signature = Request.Headers["Stripe-Signature"];
                stripeEvent = EventUtility.ConstructEvent(json, signature, webhookSecret);
            }
            else
            {
                // If no webhook secret configured, parse without verification (development only)
                stripeEvent = EventUtility.ParseEvent(json);
            }

            if (stripeEvent.Type == Events.CheckoutSessionCompleted)
            {
                var session = stripeEvent.Data.Object as Stripe.Checkout.Session;
                if (session != null)
                {
                    var existing = _db.Orders.FirstOrDefault(o => o.SessionId == session.Id);
                    if (existing != null)
                    {
                        existing.Status = "paid";
                        existing.CustomerEmail = session.CustomerDetails?.Email;
                        _db.SaveChanges();
                    }
                }
            }

            return Ok();
        }
        catch (StripeException ex)
        {
            // signature verification failed or other Stripe error
            return BadRequest(new { error = ex.Message });
        }
    }
}
