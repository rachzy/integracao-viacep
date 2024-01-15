import { AccountAPI } from "@/api/AccountAPI";
import NavItem from "@/components/atoms/NavItem";
import NavTitle from "@/components/atoms/NavTitle";
import { useAuthStore } from "@/store/auth";

export default function Navbar() {
  const account = useAuthStore((state) => state.account);
  const logout = useAuthStore((state) => state.logout);

  async function handleLogoutButtonClick() {
    await AccountAPI.logout();
    logout();
  }

  return (
    <div className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user (optional) */}
        <NavTitle username={account.username || ""} />
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <NavItem href={"/"} icon={"fa-user"}>
              Usuários
            </NavItem>
            <NavItem onClick={handleLogoutButtonClick} icon={"fa-sign-out-alt"}>
              Deslogar
            </NavItem>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </div>
  );
}
