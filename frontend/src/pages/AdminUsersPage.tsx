import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../styles/AdminUserPage.css";

const availableRoles = ["Administrator", "User"];

const AdminUsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [newEmail, setNewEmail] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createConfirmPassword, setCreateConfirmPassword] = useState("");
  const [createRoles, setCreateRoles] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const roleDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("authToken");

      if (!token || token === "undefined") {
        console.warn("No token found, redirecting to login.");
        navigate("/");
        return;
      }

      try {
        const response = await axios.get(
          "https://localhost:7026/api/Account/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error: any) {
        console.error("Error fetching users:", error);
        if (error.response && error.response.status === 401) {
          console.warn("Unauthorized, redirecting to login.");
          navigate("/");
        }
      }
    };

    setTimeout(fetchUsers, 100);
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    console.log("Sign out clicked");
    navigate("/");
  };

  const handleDelete = async (userId: string) => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`https://localhost:7026/api/Account/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.filter((user) => user.id !== userId));
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setNewEmail(user.email);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("authToken");
    if (!token || !editingUser) return;

    try {
      await axios.put(
        `https://localhost:7026/api/Account/users/${editingUser.id}`,
        { email: newEmail },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsers(
        users.map((u) =>
          u.id === editingUser.id ? { ...u, email: newEmail } : u
        )
      );
      console.log("User updated successfully");
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const validatePassword = (password: string, confirmPassword: string) => {
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return false;
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      toast.error(
        "Password must contain at least one special character (!@#$%^&*)."
      );
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return false;
    }
    return true;
  };

  const handleCreateUser = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    if (!validatePassword(createPassword, createConfirmPassword)) return;

    setIsCreating(true);

    try {
      await axios.post(
        "https://localhost:7026/api/Account/register",
        {
          email: createEmail,
          password: createPassword,
          confirmPassword: createConfirmPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("User registered successfully!");

      for (const role of createRoles) {
        try {
          await axios.post(
            "https://localhost:7026/Role/AssignRoleToUser",
            {
              email: createEmail,
              role: role,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } catch (roleError) {
          console.error("Failed to assign role:", role, roleError);
          toast.error(`Failed to assign role: ${role}`);
        }
      }

      setShowCreateModal(false);
      setCreateEmail("");
      setCreatePassword("");
      setCreateConfirmPassword("");
      setCreateRoles([]);
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to register user.");
    } finally {
      setIsCreating(false);
    }
  };

  const toggleRole = (role: string) => {
    if (createRoles.includes(role)) {
      setCreateRoles(createRoles.filter((r) => r !== role));
    } else {
      setCreateRoles([...createRoles, role]);
    }
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <button className="sign-out-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </header>

      <main className="admin-content">
        <h1 className="page-title">Users</h1>

        <button
          className="create-button"
          onClick={() => setShowCreateModal(true)}
        >
          Create New User
        </button>

        <div className="movie-table-container">
          <div className="movie-table">
            <div className="table-header">
              <div className="header-id">ID</div>
              <div className="header-email">Email</div>
              <div className="header-role">Role</div>
              <div className="header-action">Action</div>
            </div>
            {users.map((user: any, index: number) => (
              <div key={user.id} className="table-row">
                <div className="cell-id">{index + 1}</div>
                <div className="cell-email">{user.email}</div>
                <div className="cell-role">
                  {Array.isArray(user.role) ? (
                    user.role.map((r: string, idx: number) => (
                      <div key={idx}>{r}</div>
                    ))
                  ) : (
                    <div>{user.role}</div>
                  )}
                </div>
                <div className="cell-action">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {editingUser && (
          <div className="edit-modal">
            <h3>Edit User: {editingUser.email}</h3>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <button onClick={handleUpdate}>Save Changes</button>
            <button onClick={() => setEditingUser(null)}>Cancel</button>
          </div>
        )}

        {showCreateModal && (
          <div className="edit-modal">
            <h3>Create New User</h3>
            <input
              type="email"
              placeholder="Email"
              value={createEmail}
              onChange={(e) => setCreateEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={createPassword}
              onChange={(e) => setCreatePassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={createConfirmPassword}
              onChange={(e) => setCreateConfirmPassword(e.target.value)}
            />

            <div className="role-dropdown" ref={roleDropdownRef}>
              <button
                type="button"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              >
                {createRoles.length > 0
                  ? createRoles.join(", ")
                  : "Select Roles"}
              </button>
              {isRoleDropdownOpen && (
                <div className="role-dropdown-menu">
                  {availableRoles.map((role) => (
                    <label key={role}>
                      <input
                        type="checkbox"
                        checked={createRoles.includes(role)}
                        onChange={() => toggleRole(role)}
                      />
                      {role}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <button onClick={handleCreateUser} disabled={isCreating}>
              {isCreating ? "Creating..." : "Create User"}
            </button>
            <button onClick={() => setShowCreateModal(false)}>Cancel</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminUsersPage;
