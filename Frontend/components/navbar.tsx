'use client';

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context'
import { ChevronDown, User, LogOut } from 'lucide-react';
import '@/lib/i18n';

export function Navbar() {

  const { i18n } = useTranslation();
  const { isAuthenticated, farmerProfile, logout } = useAuth()

  const [language, setLanguage] = useState('en');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);


  // Fix hydration
  useEffect(() => {

    const savedLang = localStorage.getItem('language') || 'en';

    setLanguage(savedLang);

    i18n.changeLanguage(savedLang);

  }, []);


  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'mr', label: 'मराठी' },
  ];


  const handleChange = (lang: string) => {

    localStorage.setItem('language', lang);

    i18n.changeLanguage(lang);

    setLanguage(lang);

    setIsLanguageOpen(false);

  };


  return (

    <nav className="relative z-50 p-4 bg-white shadow flex justify-between items-center">

      {/* Logo */}
      <div className="text-xl font-bold">
        🌾 Kisan Sahay
      </div>


      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Language Selector */}
        <div className="relative">

          <Button
            variant="outline"
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="flex items-center gap-2"
          >

            {language.toUpperCase()}
            <ChevronDown size={16} />

          </Button>


          {isLanguageOpen && (

            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-50">

              {languages.map((lang) => (

                <button
                  key={lang.code}
                  onClick={() => handleChange(lang.code)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                >

                  {lang.label}

                </button>

              ))}

            </div>

          )}

        </div>



        {/* Profile Section */}
        {isAuthenticated && (

          <div className="relative">

            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 flex items-center justify-center bg-green-600 text-white rounded-full"
            >

              <User size={20} />

            </button>



            {isProfileOpen && (

              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-50">

                {/* Name */}
                <div className="px-4 py-2 border-b">

                  <p className="font-semibold">

                    {farmerProfile?.name || "Farmer"}

                  </p>

                </div>



                {/* Logout */}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-red-600"
                >

                  <LogOut size={16} />

                  Logout

                </button>

              </div>

            )}

          </div>

        )}

      </div>

    </nav>

  );

}