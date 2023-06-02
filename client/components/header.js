import Link from 'next/link'
export default ({ currentUser }) => {
    const links = [
        !currentUser && { label: 'Sign In', href: '/auth/signin' },
        !currentUser && { label: 'Sing Up', href: '/auth/signup' },
        currentUser && { label: 'Sing Out', href: '/auth/signout' }
    ]
        .filter(item => item)
        .map((el) => <li key={el.href}><Link href={el.href} style={{marginRight: '15px', textDecoration: 'none'}}>{el.label}</Link></li>)

    return <nav className='navbar navbar-light bg-light'>
        <Link href='/' style={{textDecoration: 'none'}}>
            <div className='navbar-brand'>GitTix</div>
        </Link>
        <div className="d-flex justify-content-end">
            <ul className='nav d-flex align-item-center'>
                {links}
            </ul>

        </div>
    </nav>
}