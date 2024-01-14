export default function NavTitle({username}: {username: string}) {
  return (
    <div>
    {/* Brand Logo */}
    <a href="#" className="brand-link">
      <span className="brand-text font-weight-light">Integração ViaCEP</span>
    </a>
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar user (optional) */}
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="info">
          <a href="#" className="d-block">
            Logado como: <span className="text-white">{username}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
  );
}
