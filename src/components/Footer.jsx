import React from 'react';

function Footer() {
  return (
    <section className="relative bottom-0  overflow-hidden py-10 bg-gradient-to-r from-indigo-600 to-purple-500 border-t-2 border-t-indigo-700">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          {/* Logo and Copyright Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-sm text-indigo-200">
                  &copy; Copyright 2023. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-widest mb-6 text-xs font-semibold uppercase text-white">
                Company
              </h3>
              <ul>
                {["Features", "Pricing", "Affiliate Program", "Press Kit"].map((link) => (
                  <li className="mb-4" key={link}>
                    <p className="text-base font-medium text-indigo-200 hover:text-white cursor-pointer">
                      {link}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Support Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-widest mb-6 text-xs font-semibold uppercase text-white">
                Support
              </h3>
              <ul>
                {["Account", "Help", "Contact Us", "Customer Support"].map((link) => (
                  <li className="mb-4" key={link}>
                    <p className="text-base font-medium text-indigo-200 hover:text-white cursor-pointer">
                      {link}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Legal Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-widest mb-6 text-xs font-semibold uppercase text-white">
                Legals
              </h3>
              <ul>
                {["Terms & Conditions", "Privacy Policy", "Licensing"].map((link) => (
                  <li className="mb-4" key={link}>
                    <p className="text-base font-medium text-indigo-200 hover:text-white cursor-pointer">
                      {link}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
