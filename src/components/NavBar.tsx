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


    return <nav className='fixed left-0 top-0 h-full w-48 p-4 font-mono bg-blue-900'>
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
}