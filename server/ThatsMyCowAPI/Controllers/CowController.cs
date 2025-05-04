using Microsoft.AspNetCore.Mvc;

namespace ThatsMyCowAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CowController : ControllerBase
{
    private readonly ILogger<CowController> _logger;

    public CowController(ILogger<CowController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { message = "That's my cow API is running!" });
    }
}