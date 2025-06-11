import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="flex justify-between items-center p-4 border-b bg-stone-100">
      <h1 className="text-xl font-bold">Routine Manager</h1>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-stone-700">👋 {user.username}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
