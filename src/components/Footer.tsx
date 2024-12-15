import { Mail, Phone } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center text-gray-600 space-y-2">
          <div className="flex items-center">
            Made by{" "}
            <a
              href="https://www.linkedin.com/in/shehzadasalman/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 font-medium ml-1 transition-colors"
            >
              shehzada salman
            </a>
          </div>
          <div className="flex flex-col items-center text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>shehzada.salman072@gmail.com</span>
            </div>
            {/* <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+92 (321) 883-5830</span>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
