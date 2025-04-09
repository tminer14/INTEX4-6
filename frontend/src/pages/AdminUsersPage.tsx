import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AdminUserPage.css"; 

const AdminUsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [newEmail, setNewEmail] = useState("");

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
                <div className="cell-role">{user.role}</div>
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
      </main>
    </div>
  );
};

export default AdminUsersPage;
