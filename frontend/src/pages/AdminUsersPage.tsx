import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../styles/AdminUserTableScoped.css";
import { FaArrowLeft } from "react-icons/fa";
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
  const [editRoles, setEditRoles] = useState<string[]>([]);

  const roleDropdownRef = useRef<HTMLDivElement>(null);

  const API_URL =
    "https://cineniche4-6-apa5hjhbcbe8axg8.westcentralus-01.azurewebsites.net";

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("authToken");

      if (!token || token === "undefined") {
        console.warn("No token found, redirecting to login.");
        navigate("/");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/Account/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
      await axios.delete(`${API_URL}/api/Account/users/${userId}`, {
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
    setEditRoles(Array.isArray(user.role) ? user.role : [user.role]);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("authToken");
    if (!token || !editingUser) return;

    try {
      await axios.put(
        `${API_URL}/api/Account/users/${editingUser.id}`,
        { email: newEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await axios.post(
        `${API_URL}/Role/UpdateUserRoles`,
        {
          userId: editingUser.id,
          roles: editRoles,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("User updated successfully!");

      setEditingUser(null);
      setNewEmail("");
      setEditRoles([]);
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user.");
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
        `${API_URL}/api/Account/register`,
        {
          email: createEmail,
          password: createPassword,
          confirmPassword: createConfirmPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("User registered successfully!");

      for (const role of createRoles) {
        try {
          await axios.post(
            `${API_URL}/Role/AssignRoleToUser`,
            {
              userEmail: createEmail,
              roleName: role,
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
    <div className="admin-panel admin-users-page">
      <header className="admin-header">
        <div className="logo-container">
          <div className="logo-text">
            <svg
              id="86:341"
              layer-name="Logo"
              width="229"
              height="69"
              viewBox="0 0 229 69"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="logo-text"
              style={{ width: "229px", height: "69px" }}
            >
              <path
                d="M34.6058 29.1319H27.793C27.5378 27.3758 26.7935 25.9958 25.5603 24.9919C24.3246 23.9904 22.786 23.4873 20.9421 23.4873C18.4732 23.4873 16.4957 24.3953 15.0072 26.209C13.5235 28.025 12.784 30.5982 12.784 33.9332C12.784 37.3448 13.5306 39.9395 15.0263 41.7148C16.5195 43.4925 18.4756 44.379 20.8944 44.379C22.6882 44.379 24.2054 43.9094 25.4458 42.9702C26.691 42.0263 27.4734 40.699 27.793 38.9932L34.6058 39.0219C34.3696 40.9769 33.6755 42.8217 32.5257 44.5515C31.3735 46.2765 29.8087 47.6757 27.8312 48.749C25.8585 49.8223 23.5112 50.359 20.7894 50.359C17.946 50.359 15.4079 49.7145 13.1752 48.4232C10.9424 47.1342 9.17962 45.2655 7.88911 42.8169C6.59621 40.3708 5.95215 37.4095 5.95215 33.9332C5.95215 30.4448 6.60337 27.4788 7.90819 25.0302C9.21778 22.5841 10.9925 20.7177 13.2324 19.4336C15.47 18.1494 17.989 17.5073 20.7894 17.5073C23.244 17.5073 25.4577 17.9649 27.4304 18.8777C29.408 19.7858 31.0229 21.1059 32.2776 22.8357C33.5371 24.5678 34.3124 26.6666 34.6058 29.1319Z"
                fill="#F7F7FF"
              ></path>
              <path
                d="M39.3145 49.9182V25.9311H45.9364V49.9182H39.3145ZM42.6445 22.8452C41.6713 22.8452 40.8316 22.517 40.1255 21.8582C39.4194 21.1945 39.0664 20.3991 39.0664 19.4719C39.0664 18.5471 39.4194 17.7565 40.1255 17.1048C40.8316 16.4484 41.6713 16.1177 42.6445 16.1177C43.6297 16.1177 44.4718 16.4484 45.1731 17.1048C45.8792 17.7565 46.2322 18.5471 46.2322 19.4719C46.2322 20.3991 45.8792 21.1945 45.1731 21.8582C44.4718 22.517 43.6297 22.8452 42.6445 22.8452Z"
                fill="#F7F7FF"
              ></path>
              <path
                d="M57.8436 36.0511V49.9181H51.2217V25.9311H57.5287V30.1669H57.815C58.3541 28.7749 59.2415 27.6704 60.4771 26.8511C61.7175 26.0341 63.2203 25.6244 64.9903 25.6244C67.4831 25.6244 69.4797 26.4294 70.9825 28.0394C72.4829 29.6446 73.2343 31.8488 73.2343 34.6519V49.9181H66.6124V35.8306C66.6243 34.3692 66.2522 33.224 65.496 32.3998C64.7374 31.5708 63.695 31.154 62.3663 31.154C61.0305 31.154 59.9451 31.5828 59.1126 32.4381C58.2777 33.2958 57.8555 34.4986 57.8436 36.0511Z"
                fill="#F7F7FF"
              ></path>
              <path
                d="M89.3178 50.3877C86.8751 50.3877 84.7664 49.887 82.9916 48.8831C81.2217 47.8745 79.862 46.4466 78.9078 44.5994C77.9536 42.7546 77.4766 40.5648 77.4766 38.0348C77.4766 35.5695 77.9536 33.4061 78.9078 31.5469C79.862 29.6829 81.2074 28.2287 82.9439 27.1865C84.6805 26.1467 86.7177 25.6244 89.0601 25.6244C91.1593 25.6244 93.0533 26.0724 94.747 26.9661C96.4454 27.8621 97.7908 29.2133 98.7831 31.0198C99.7802 32.8215 100.281 35.0831 100.281 37.8048V39.6256H84.0221V39.6448C84.0221 41.4345 84.5088 42.8456 85.482 43.8806C86.4553 44.9108 87.772 45.4236 89.4323 45.4236C90.5391 45.4236 91.4957 45.1912 92.3043 44.724C93.1106 44.252 93.6807 43.5596 94.0123 42.6444L100.138 43.0469C99.6729 45.2774 98.4921 47.0599 96.5981 48.3944C94.7017 49.7241 92.2757 50.3877 89.3178 50.3877ZM84.0221 35.5048H94.0504C94.0361 34.0817 93.5781 32.9053 92.6764 31.9781C91.7795 31.0533 90.6083 30.5886 89.1651 30.5886C87.6957 30.5886 86.4863 31.0677 85.5393 32.0261C84.597 32.9844 84.0913 34.144 84.0221 35.5048Z"
                fill="#F7F7FF"
              ></path>
              <path
                d="M131.357 17.9385V49.9181H125.546L111.692 29.7931H111.453V49.9181H104.727V17.9385H110.633L124.373 38.054H124.659V17.9385H131.357Z"
                fill="#F7F7FF"
              ></path>
              <path
                d="M136.779 49.9182V25.9311H143.401V49.9182H136.779ZM140.109 22.8452C139.136 22.8452 138.296 22.517 137.59 21.8582C136.884 21.1945 136.531 20.3991 136.531 19.4719C136.531 18.5471 136.884 17.7565 137.59 17.1048C138.296 16.4484 139.136 16.1177 140.109 16.1177C141.095 16.1177 141.937 16.4484 142.638 17.1048C143.344 17.7565 143.697 18.5471 143.697 19.4719C143.697 20.3991 143.344 21.1945 142.638 21.8582C141.937 22.517 141.095 22.8452 140.109 22.8452Z"
                fill="#F7F7FF"
              ></path>
              <path
                d="M159.478 50.3877C157.028 50.3877 154.927 49.8654 153.171 48.8161C151.415 47.7691 150.065 46.3148 149.125 44.4556C148.19 42.5917 147.723 40.4474 147.723 38.0252C147.723 35.5671 148.195 33.4061 149.144 31.5469C150.091 29.6877 151.439 28.2382 153.19 27.1961C154.946 26.1491 157.028 25.6244 159.44 25.6244C161.525 25.6244 163.354 26.0053 164.926 26.7648C166.496 27.5267 167.734 28.5928 168.638 29.9656C169.547 31.3408 170.045 32.9532 170.136 34.8052H163.886C163.714 33.6121 163.249 32.6466 162.493 31.9111C161.742 31.1779 160.761 30.809 159.554 30.809C158.021 30.809 156.787 31.4295 155.852 32.6681C154.917 33.9092 154.45 35.6629 154.45 37.9294C154.45 40.2174 154.912 41.9903 155.843 43.2481C156.771 44.5012 158.009 45.1265 159.554 45.1265C160.692 45.1265 161.649 44.7815 162.426 44.0915C163.202 43.3967 163.688 42.4096 163.886 41.1302H170.136C170.033 42.9582 169.537 44.5706 168.648 45.9698C167.763 47.3642 166.544 48.4495 164.993 49.2281C163.44 49.9996 161.601 50.3877 159.478 50.3877Z"
                fill="#F7F7FF"
              ></path>
              <path
                d="M181.019 36.051V49.9181H174.397V17.9385H180.829V30.1669H181.115C181.661 28.7485 182.532 27.6369 183.729 26.8319C184.931 26.0269 186.439 25.6244 188.252 25.6244C190.738 25.6244 192.737 26.427 194.244 28.0298C195.756 29.635 196.51 31.8416 196.506 34.6519V49.9181H189.884V35.8306C189.888 34.3548 189.516 33.2096 188.767 32.3902C188.016 31.566 186.966 31.154 185.618 31.154C184.268 31.154 183.169 31.5828 182.317 32.4381C181.463 33.2958 181.031 34.4985 181.019 36.051Z"
                fill="#F7F7FF"
              ></path>
              <path
                d="M212.602 50.3877C210.159 50.3877 208.051 49.887 206.276 48.8831C204.506 47.8745 203.146 46.4466 202.192 44.5994C201.238 42.7546 200.761 40.5648 200.761 38.0348C200.761 35.5695 201.238 33.4061 202.192 31.5469C203.146 29.6829 204.492 28.2287 206.228 27.1865C207.965 26.1467 210.002 25.6244 212.344 25.6244C214.443 25.6244 216.338 26.0724 218.031 26.9661C219.73 27.8621 221.075 29.2133 222.067 31.0198C223.064 32.8215 223.565 35.0831 223.565 37.8048V39.6256H207.306V39.6448C207.306 41.4345 207.793 42.8456 208.766 43.8806C209.739 44.9108 211.056 45.4236 212.716 45.4236C213.823 45.4236 214.78 45.1912 215.588 44.724C216.395 44.252 216.965 43.5596 217.296 42.6444L223.422 43.0469C222.957 45.2774 221.776 47.0599 219.882 48.3944C217.986 49.7241 215.56 50.3877 212.602 50.3877ZM207.306 35.5048H217.335C217.32 34.0817 216.862 32.9053 215.961 31.9781C215.064 31.0533 213.892 30.5886 212.449 30.5886C210.98 30.5886 209.77 31.0677 208.823 32.0261C207.881 32.9844 207.376 34.144 207.306 35.5048Z"
                fill="#F7F7FF"
              ></path>
            </svg>
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/48acbec41f51b3a0cb299ff7a8c91f8fc3735c4e?placeholderIfAbsent=true"
            alt=""
            className="logo-icon"
          />
          <button className="back-arrow" onClick={() => navigate("/admin")}>
            <FaArrowLeft className="arrow-icon" />
            <span>Back to Dashboard</span>
          </button>
        </div>
        <div className="header-actions">
          <div className="language-selector">Language</div>
          <button className="sign-out-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
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

            <div className="role-dropdown" style={{ marginTop: "10px" }}>
              <button
                type="button"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              >
                {editRoles.length > 0 ? editRoles.join(", ") : "Select Roles"}
              </button>
              {isRoleDropdownOpen && (
                <div className="role-dropdown-menu">
                  {availableRoles.map((role) => (
                    <label key={role}>
                      <input
                        type="checkbox"
                        checked={editRoles.includes(role)}
                        onChange={() => {
                          if (editRoles.includes(role)) {
                            setEditRoles(editRoles.filter((r) => r !== role));
                          } else {
                            setEditRoles([...editRoles, role]);
                          }
                        }}
                      />
                      {role}
                    </label>
                  ))}
                </div>
              )}
            </div>

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
