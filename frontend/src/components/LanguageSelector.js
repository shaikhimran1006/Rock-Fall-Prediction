/**
 * Language Selector Component
 * Beautiful multilingual dropdown with Indian language support
 */

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { languages } from '../i18n/i18n';

const LanguageSelector = () => {
    const { i18n, t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    const buttonRef = useRef(null);

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target)) {
                // Check if click is on dropdown content
                const dropdown = document.getElementById('language-dropdown-portal');
                if (dropdown && !dropdown.contains(event.target)) {
                    setIsOpen(false);
                }
            }
        };

        const handleScroll = () => {
            if (isOpen) {
                updateDropdownPosition();
            }
        };

        const handleResize = () => {
            if (isOpen) {
                updateDropdownPosition();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            window.addEventListener('scroll', handleScroll, true);
            window.addEventListener('resize', handleResize);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', handleResize);
        };
    }, [isOpen]);

    const updateDropdownPosition = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + window.scrollY + 8,
                left: rect.left + window.scrollX,
                width: rect.width
            });
        }
    };

    const handleToggle = () => {
        if (!isOpen) {
            updateDropdownPosition();
        }
        setIsOpen(!isOpen);
    };

    const handleLanguageChange = (languageCode) => {
        console.log('Changing language to:', languageCode); // Debug log

        // Change the language
        i18n.changeLanguage(languageCode).then(() => {
            console.log('Language changed successfully to:', languageCode);
            // Save to localStorage for persistence
            localStorage.setItem('i18nextLng', languageCode);
            // Force a re-render by dispatching a custom event
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: languageCode }));
        });

        setIsOpen(false);
    };

    return (
        <>
            <div className="relative" ref={buttonRef}>
                <button
                    className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 text-white font-medium hover:bg-white/20 hover:scale-105 hover:border-blue-400/50 transition-all duration-300 min-w-[140px] shadow-lg"
                    onClick={handleToggle}
                    aria-label={t('header.language')}
                >
                    <span className="text-xl">{currentLanguage.flag}</span>
                    <span className="font-medium text-white">{currentLanguage.nativeName}</span>
                    <svg
                        className={`w-4 h-4 text-gray-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {isOpen && createPortal(
                <div
                    id="language-dropdown-portal"
                    className="fixed bg-gray-900/98 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden animate-fade-in-up"
                    style={{
                        top: `${dropdownPosition.top}px`,
                        left: `${dropdownPosition.left}px`,
                        width: '224px', // w-56 = 14rem = 224px
                        zIndex: 999999,
                        pointerEvents: 'auto'
                    }}
                >
                    <div className="p-2">
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 border-b border-gray-700 mb-2">
                            {t('header.language')}
                        </div>
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 hover:bg-white/10 cursor-pointer ${currentLanguage.code === language.code
                                        ? 'bg-blue-500/20 border border-blue-500/30 text-white'
                                        : 'text-gray-100 hover:text-white hover:transform hover:scale-105'
                                    }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleLanguageChange(language.code);
                                }}
                                type="button"
                            >
                                <span className="text-2xl">{language.flag}</span>
                                <div className="flex-1">
                                    <div className="font-medium">{language.nativeName}</div>
                                    <div className="text-xs text-gray-400">{language.name}</div>
                                </div>
                                {currentLanguage.code === language.code && (
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Language Stats */}
                    <div className="border-t border-gray-700 p-3 bg-gray-800/50">
                        <div className="text-xs text-gray-400 text-center">
                            <span className="inline-flex items-center">
                                <span className="text-blue-400 mr-1">🌍</span>
                                {languages.length} languages supported
                            </span>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default LanguageSelector;