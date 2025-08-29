"use client"

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type TopBarProps = {
    open: boolean,
    setOpen: (v: boolean) => void
}

function TopBar({open, setOpen}: TopBarProps){
    const [atTop, setAtTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setAtTop(window.scrollY === 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div 
            className={`
                sm:hidden ${open? "hidden" : " "}
                fixed top-0 left-0 right-0
                z-50
                p-2 flex flex-row w-full items-center
                transition-all duration-300 
                ${atTop? "bg transparent" : "bg-blue-900"}
            `}
        >
            <button 
                onClick={() => setOpen(true)}
                className='rounded-full bg-blue-900 active:bg-blue-950 justify-center items-center p-2'
            >
                <Bars3Icon className='h-6 w-6 text-white active:text-gray-300'/>
            </button>
            <span 
                className={`
                    ml-4 font-mono transition-colors duration-300
                    ${atTop? "text-blue-900" : "text-white"}
                `}>
                {`<AppName>`}
            </span>

        </div>
    )
}

export default function NavBar () {
    const pathName = usePathname();
    const [open, setOpen] = useState(false);


    const links = [
        { href: "/", label: "Home" },
        { href: "/balances", label: "Balances" },
        { href: "/accounts", label: "Accounts" },
        { href: "/banks", label: "Banks" },
        { href: "/settings", label: "Settings" }
    ];


    return (
        <>
            {/* Top bar with menu button */}
            <TopBar open={open} setOpen={setOpen} />

            {/* Sidebar */}
            <nav 
                className={`
                    fixed left-0 top-0 h-full w-48 p-4 font-mono bg-blue-900
                    ${open? "translate-x-0" : "-translate-x-full"}  
                    sm:translate-x-0 z-2
            `}>
                
                {/* Close button on mobile */}
                <div className="sm:hidden mb-4 flex justify-end">
                    <button onClick={() => setOpen(false)}>
                        <XMarkIcon className="h-6 w-6 text-white active:text-gray-300" />
                    </button>
                </div>


                <ul className='flex flex-col gap-4' >
                    {links.map(({href, label}) => {
                        const isActive = pathName === href;
                        return (
                        <li key={href}>
                            {isActive? (
                                <span className='block py-2 px-4 no-underline rounded-md nav-link-active' aria-current="page">
                                    {label}
                                </span>
                            ) : (
                                <a href={href} className='block py-2 px-4 no-underline rounded-md nav-link'>
                                    {label}
                                </a>
                            )}
                        </li>
                    )})}
                </ul>
            </nav>
        </>
    )
     
    
    
}