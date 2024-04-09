const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full bg-primary p-6 py-3 flex">
      <div className="w-full flex items-center justify-center text-white">
        <span>&copy; {currentYear} Blogify</span>
      </div>
    </div>
  );
};

export default Footer;
