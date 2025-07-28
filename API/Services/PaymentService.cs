using API.Entities;
using Stripe;

namespace API.Services;

public class PaymentService(IConfiguration config)
{
    public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket) // to track how much customer is going to pay
    {
        StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];

        var service = new PaymentIntentService();

        var intent = new PaymentIntent();

        var subtotal = basket.Items.Sum(x => x.Quantity * x.Product.Price);

        var deliveryFee = subtotal > 10000 ? 0 : 500;

        if (string.IsNullOrEmpty(basket.PaymentIntentId))
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = subtotal + deliveryFee,
                Currency = "myr",
                PaymentMethodTypes = ["card"]
            };
            intent = await service.CreateAsync(options);
        }
        else
        {
            var options = new PaymentIntentUpdateOptions
            {
                Amount = subtotal + deliveryFee
            };
            await service.UpdateAsync(basket.PaymentIntentId, options);
        }

        return intent;
    }
}
