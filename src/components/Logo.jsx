const Logo = ({ onClick }) => {
  return (
    <img
      src="/logo.png"
      alt="logo"
      style={{ cursor: "pointer" }}
      onClick={onClick}
    />
  );
};

export default Logo;
