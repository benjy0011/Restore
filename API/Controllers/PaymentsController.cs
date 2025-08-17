using API.Data;
using API.DTOs;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;


namespace API.Controllers;

public class PaymentsController(PaymentService paymentService, StoreContext context, IConfiguration config, ILogger<PaymentsController> logger) : BaseApiController
{
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
    {
        var basket = await context.Baskets.GetBasketWithItems(Request.Cookies["basketId"]);

        if (basket == null) return BadRequest("Problem with getting the basket.");

        var intent = await paymentService.CreateOrUpdatePaymentIntent(basket);

        if (intent == null) return BadRequest("Problem creating payment intent.");

        basket.PaymentIntentId ??= intent.Id;
        basket.ClientSecret ??= intent.ClientSecret;

        if (context.ChangeTracker.HasChanges())
        {
            var result = await context.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Problem updating basket with payment intent.");
        }

        return basket.ToDto();
    }

    [HttpPost("webhook")]
    public async Task<IActionResult> StripeWebhook()
    {
        var json = await new StreamReader(Request.Body).ReadToEndAsync();

        try
        {
            var stripeEvent = ConstructStripeEvent(json);

            if (stripeEvent.Data.Object is not PaymentIntent intent)
            {
                return BadRequest("Invalid event data");
            }

            if (intent.Status == "succeeded") await HandlePaymentIntentSucceeded(intent);
            else await HandlePaymentIntentFailed(intent);

            return Ok();
        }
        catch (StripeException ex)
        {
            logger.LogError(ex, "Stripe Webhook Error");
            return StatusCode(StatusCodes.Status500InternalServerError, "Stripe Webhook Error");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An unexpected error has occured");
            return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error has occured");
        }
    }

    private Event ConstructStripeEvent(string json)
    {
        try
        {
            return EventUtility.ConstructEvent(
                json,
                Request.Headers["Stripe-Signature"],
                config["StripeSettings:WhSecret"]
            );
        }
        catch (System.Exception ex)
        {
            logger.LogError(ex, "Failed to construct stripe event");
            throw new StripeException("Invalid signature");
        }
    }

    private async Task HandlePaymentIntentSucceeded(PaymentIntent intent)
    {
        throw new NotImplementedException();
    }

    private async Task HandlePaymentIntentFailed(PaymentIntent intent)
    {
        throw new NotImplementedException();
    }

}
