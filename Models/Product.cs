namespace web_sitem.Models;

public sealed class Product
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    // Price stored as cents (e.g., 5000 = $50.00)
    public int PriceCents { get; set; }
    public string Currency { get; set; } = "usd";
    public string? ImageUrl { get; set; }
}