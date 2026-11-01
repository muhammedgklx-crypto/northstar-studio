namespace web_sitem.Models;

public sealed class Order
{
    public int Id { get; set; }
    public string SessionId { get; set; } = string.Empty;
    public long Amount { get; set; }
    public string Currency { get; set; } = string.Empty;
    public string? CustomerEmail { get; set; }
    public string Status { get; set; } = "pending";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}