"use client"

import { HomeIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

export default function NavBar () {
    const pathName = usePathname();

    const links = [
        { href: "/", label: "Home" },
        { href: "/balances", label: "Balances" },
        { href: "/accounts", label: "Accounts" },
        { href: "/banks", label: "Banks" },
        { href: "/settings", label: "Settings" }
    ];


    return <nav className='font-mono h-screen w-48 p-4 bg-yellow-400'>
        <ul className='flex flex-col gap-4' >
            {links.map(({href, label}) => (
                <li 
                    key={href}
                    className={`px-2 py-1 rounded ${
                        pathName === href
                        ? "bg-blue-500 text-white" 
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                >
                    <a href={href}>
                        {label}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
}