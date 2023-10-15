import Avatar from "@mui/material/Avatar";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li tabIndex={0}>
          <div className="box">
            <Avatar alt="El Ninho" src="/squealerimage.png" />
            <h3>El Ninho</h3>
          </div>
        </li>
        <li tabIndex={0}>
          <div className="box">
            <Avatar alt="Maurizio Benazzi" src="/squealerimage.png" />
            <h3>Maurizio Benazzi</h3>
          </div>
        </li>
        <li tabIndex={0}>
          <div className="box">
            <Avatar alt="El Pibe De Oro" src="/squealerimage.png" />
            <h3>El Pibe de Oro</h3>
          </div>
        </li>
        <li tabIndex={0}>
          <div className="box">
            <Avatar alt="Nello Taver" src="/squealerimage.png" />
            <h3>Nello Taver</h3>
          </div>
        </li>
        <li tabIndex={0}>
          <div className="box">
            <Avatar alt="Bello Figo" src="/squealerimage.png" />
            <h3>Bello Figo</h3>
          </div>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
