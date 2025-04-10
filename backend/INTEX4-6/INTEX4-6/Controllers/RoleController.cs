using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

namespace INTEX4_6.Controllers;

[Route("[controller]")]
[ApiController]
[Authorize(Roles = "Administrator")]

public class RoleController : Controller
{
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly UserManager<IdentityUser> _userManager;

    public RoleController(RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager)
    {
        _roleManager = roleManager;
        _userManager = userManager;
    }

    [HttpPost("AddRole")]
    public async Task<IActionResult> AddRole(string roleName)
    {
        if (string.IsNullOrWhiteSpace(roleName))
        {
            return BadRequest("Role name cannot be empty.");
        }

        var roleExists = await _roleManager.RoleExistsAsync(roleName);
        if (roleExists)
        {
            return Conflict("Role already exists.");
        }

        var result = await _roleManager.CreateAsync(new IdentityRole(roleName));
        if (result.Succeeded)
        {
            return Ok($"Role '{roleName}' created successfully.");
        }

        return StatusCode(500, "An error occurred while creating the role.");
    }

    [HttpPost("AssignRoleToUser")]
    public async Task<IActionResult> AssignRoleToUser([FromBody] AssignRoleRequest model)
    {
        if (string.IsNullOrWhiteSpace(model.UserEmail) || string.IsNullOrWhiteSpace(model.RoleName))
        {
            return BadRequest("User email and role name are required.");
        }

        var user = await _userManager.FindByEmailAsync(model.UserEmail);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        var roleExists = await _roleManager.RoleExistsAsync(model.RoleName);
        if (!roleExists)
        {
            return NotFound("Role does not exist.");
        }

        var alreadyInRole = await _userManager.IsInRoleAsync(user, model.RoleName);
        if (alreadyInRole)
        {
            return Ok($"User '{model.UserEmail}' already has role '{model.RoleName}'.");
        }

        var result = await _userManager.AddToRoleAsync(user, model.RoleName);
        if (result.Succeeded)
        {
            return Ok($"Role '{model.RoleName}' assigned to user '{model.UserEmail}'.");
        }

        return StatusCode(500, "An error occurred while assigning the role.");
    }

    [HttpPost("UpdateUserRoles")]
    public async Task<IActionResult> UpdateUserRoles([FromBody] UpdateRolesRequest model)
    {
        if (string.IsNullOrWhiteSpace(model.UserId) || model.Roles == null)
        {
            return BadRequest("User ID and roles are required.");
        }

        var user = await _userManager.FindByIdAsync(model.UserId);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        var currentRoles = await _userManager.GetRolesAsync(user);

        var removeResult = await _userManager.RemoveFromRolesAsync(user, currentRoles);
        if (!removeResult.Succeeded)
        {
            return StatusCode(500, "Failed to remove existing roles.");
        }

        var addResult = await _userManager.AddToRolesAsync(user, model.Roles);
        if (!addResult.Succeeded)
        {
            return StatusCode(500, "Failed to add new roles.");
        }

        return Ok("User roles updated successfully.");
    }

    public class UpdateRolesRequest
    {
        public string UserId { get; set; }
        public List<string> Roles { get; set; }
    }

    public class AssignRoleRequest
    {
        public string UserEmail { get; set; }
        public string RoleName { get; set; }
    }

}