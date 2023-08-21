const Footer = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">{/* Your main content goes here */}</main>
      <footer className="footer footer-center p-10 bg-gray-200 text-base-content rounded">
        <div className="flex flex-col flex-grow text-black">
          <h3 className="mb-4">
            HACK Community - A constructive and inclusive social network for
            software developers. With you every step of your journey.
          </h3>
          <div className="grid grid-flow-col gap-4">
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </div>
        </div>
        <div className="mt-auto text-black">
          <p className="text-center">
            Copyright © 2023 - All right reserved by ACME Industries Ltd
          </p>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
