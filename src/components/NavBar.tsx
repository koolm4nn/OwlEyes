import { HomeIcon } from '@heroicons/react/24/outline';

export default function NavBar () {
    return <nav className='font-mono h-[30px] flex items-center mt-5 ml-[72px]'>
        <ul className='flex gap-[32px] ' >
            <li>
                <a href='/dashboard'>
                    Dashboard
                </a>
            </li>
            <li>
                <a href='/balances'>
                    Balances
                </a>
            </li>
            <li>
                <a href='/accounts'>
                    Accounts
                </a>
            </li>
            <li>
                <a href='/banks'>
                    Banks
                </a>
            </li>
            <li>
                <a href='/settings'>
                    Settings
                </a>
            </li>
        </ul>
    </nav>
}