using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Net.Mail;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        var allowedOrigins = builder.Configuration["Cors:AllowedOrigins"]?.Split(',') ?? new[] { "*" };
        policy.WithOrigins(allowedOrigins)
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add Swagger/OpenAPI services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Portfolio API",
        Version = "v1",
        Description = "API for portfolio website with contact form and data endpoints",
        Contact = new Microsoft.OpenApi.Models.OpenApiContact
        {
            Name = "Portfolio Contact",
            Email = "contact@example.com"
        }
    });
});

// Configure Email Settings
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("Email"));
builder.Services.AddSingleton<IEmailService, EmailService>();

// Add Data Service
builder.Services.AddSingleton<IDataService, DataService>();

// Add Application Insights if configured
if (!string.IsNullOrEmpty(builder.Configuration["ApplicationInsights:ConnectionString"]))
{
    builder.Services.AddApplicationInsightsTelemetry();
}

var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Portfolio API v1");
        options.RoutePrefix = string.Empty; // Set Swagger UI at the app's root
    });
}

app.UseCors();

// Health endpoint
app.MapGet("/health", (IConfiguration config) =>
{
    return Results.Ok(new
    {
        status = "healthy",
        environment = app.Environment.EnvironmentName,
        version = "1.0.0",
        timestamp = DateTime.UtcNow
    });
})
.WithName("Health")

.WithTags("Health");

// Data endpoints
app.MapGet("/api/personal", (IDataService dataService) =>
{
    var data = dataService.GetPersonalData();
    return Results.Ok(data);
})
.WithName("GetPersonalData")

.WithTags("Data")
.Produces<JsonDocument>(200);

app.MapGet("/api/skills", (IDataService dataService) =>
{
    var data = dataService.GetSkillsData();
    return Results.Ok(data);
})
.WithName("GetSkills")

.WithTags("Data")
.Produces<JsonDocument>(200);

app.MapGet("/api/experience", (IDataService dataService) =>
{
    var data = dataService.GetExperienceData();
    return Results.Ok(data);
})
.WithName("GetExperience")

.WithTags("Data")
.Produces<JsonDocument>(200);

app.MapGet("/api/projects", (IDataService dataService) =>
{
    var data = dataService.GetProjectsData();
    return Results.Ok(data);
})
.WithName("GetProjects")

.WithTags("Data")
.Produces<JsonDocument>(200);

app.MapGet("/api/education", (IDataService dataService) =>
{
    var data = dataService.GetEducationData();
    return Results.Ok(data);
})
.WithName("GetEducation")

.WithTags("Data")
.Produces<JsonDocument>(200);

// Contact endpoint
app.MapPost("/contact", async (
    ContactRequest request,
    IEmailService emailService,
    ILogger<Program> logger) =>
{
    try
    {
        // Validate request
        var validationResults = new List<ValidationResult>();
        var validationContext = new ValidationContext(request);
        if (!Validator.TryValidateObject(request, validationContext, validationResults, true))
        {
            return Results.BadRequest(new
            {
                error = "Validation failed",
                errors = validationResults.Select(v => v.ErrorMessage)
            });
        }

        // Send email
        await emailService.SendContactEmailAsync(request);

        logger.LogInformation("Contact form submitted successfully from {Email}", request.Email);

        return Results.Ok(new
        {
            success = true,
            message = "Your message has been sent successfully!"
        });
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Error processing contact form submission");
        return Results.Problem(
            title: "An error occurred while sending your message",
            detail: app.Environment.IsDevelopment() ? ex.Message : "Please try again later",
            statusCode: 500
        );
    }
})
.WithName("Contact")

.WithTags("Contact")
.Produces(200)
.Produces(400)
.Produces(500);

app.Run();

// Models
record ContactRequest
{
    [Required(ErrorMessage = "Name is required")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Name must be between 2 and 100 characters")]
    public required string Name { get; init; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public required string Email { get; init; }

    [Required(ErrorMessage = "Message is required")]
    [StringLength(1000, MinimumLength = 10, ErrorMessage = "Message must be between 10 and 1000 characters")]
    public required string Message { get; init; }
}

// Email Settings
class EmailSettings
{
    public string SmtpHost { get; set; } = string.Empty;
    public int SmtpPort { get; set; } = 587;
    public string SmtpUsername { get; set; } = string.Empty;
    public string SmtpPassword { get; set; } = string.Empty;
    public string FromEmail { get; set; } = string.Empty;
    public string FromName { get; set; } = string.Empty;
    public string ToEmail { get; set; } = string.Empty;
    public bool EnableSsl { get; set; } = true;
}

// Email Service
interface IEmailService
{
    Task SendContactEmailAsync(ContactRequest request);
}

class EmailService : IEmailService
{
    private readonly EmailSettings _settings;
    private readonly ILogger<EmailService> _logger;

    public EmailService(Microsoft.Extensions.Options.IOptions<EmailSettings> settings, ILogger<EmailService> logger)
    {
        _settings = settings.Value;
        _logger = logger;
    }

    public async Task SendContactEmailAsync(ContactRequest request)
    {
        // If SMTP is not configured, just log the message
        if (string.IsNullOrEmpty(_settings.SmtpHost))
        {
            _logger.LogWarning("SMTP not configured. Contact form message logged only.");
            _logger.LogInformation("Contact Form - Name: {Name}, Email: {Email}, Message: {Message}",
                request.Name, request.Email, request.Message);
            return;
        }

        var mailMessage = new MailMessage
        {
            From = new MailAddress(_settings.FromEmail, _settings.FromName),
            Subject = $"Portfolio Contact Form: Message from {request.Name}",
            Body = $@"
Name: {request.Name}
Email: {request.Email}

Message:
{request.Message}

---
Sent from Portfolio Contact Form
Timestamp: {DateTime.UtcNow:yyyy-MM-dd HH:mm:ss} UTC
",
            IsBodyHtml = false
        };

        mailMessage.To.Add(_settings.ToEmail);
        mailMessage.ReplyToList.Add(new MailAddress(request.Email, request.Name));

        using var smtpClient = new SmtpClient(_settings.SmtpHost, _settings.SmtpPort)
        {
            Credentials = new NetworkCredential(_settings.SmtpUsername, _settings.SmtpPassword),
            EnableSsl = _settings.EnableSsl
        };

        await smtpClient.SendMailAsync(mailMessage);
        _logger.LogInformation("Contact email sent successfully to {ToEmail}", _settings.ToEmail);
    }
}

// Data Service
interface IDataService
{
    JsonDocument GetPersonalData();
    JsonDocument GetSkillsData();
    JsonDocument GetExperienceData();
    JsonDocument GetProjectsData();
    JsonDocument GetEducationData();
}

class DataService : IDataService
{
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<DataService> _logger;
    private readonly JsonDocument _personalData;
    private readonly JsonDocument _skillsData;
    private readonly JsonDocument _experienceData;
    private readonly JsonDocument _projectsData;
    private readonly JsonDocument _educationData;

    public DataService(IWebHostEnvironment env, ILogger<DataService> logger)
    {
        _env = env;
        _logger = logger;

        // Load all JSON files at startup
        _personalData = LoadJsonFile("personal.json");
        _skillsData = LoadJsonFile("skills.json");
        _experienceData = LoadJsonFile("experience.json");
        _projectsData = LoadJsonFile("projects.json");
        _educationData = LoadJsonFile("education.json");
    }

    private JsonDocument LoadJsonFile(string filename)
    {
        try
        {
            var filePath = Path.Combine(_env.ContentRootPath, "Data", filename);
            var jsonString = File.ReadAllText(filePath);
            return JsonDocument.Parse(jsonString);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error loading {Filename}", filename);
            throw;
        }
    }

    public JsonDocument GetPersonalData() => _personalData;
    public JsonDocument GetSkillsData() => _skillsData;
    public JsonDocument GetExperienceData() => _experienceData;
    public JsonDocument GetProjectsData() => _projectsData;
    public JsonDocument GetEducationData() => _educationData;
}
