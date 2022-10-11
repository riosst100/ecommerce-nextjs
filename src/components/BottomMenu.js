import React, { useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { HomeOutline, ChatbubblesOutline, PersonOutline, NewspaperOutline } from 'react-ionicons';
import { useRouter } from 'next/router';

const BottomMenu = () => {
    return (
        <>
            <div>
                <section id="bottom-navigation" className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
                    <div id="tabs" className="flex justify-between">
                        <Menu title="Home" href="/" icon={<HomeOutline color={'intherit'} height="25px" width="25px" />} />
                        <Menu title="Artikel" href="/artikel" icon={<NewspaperOutline color={'intherit'} height="25px" width="25px" />} />
                        <Menu title="Chat" href="/chat" icon={<ChatbubblesOutline color={'intherit'} height="25px" width="25px" />} />
                        <Menu title="Akun Saya" href="/my-account" icon={<PersonOutline color={'intherit'} height="25px" width="25px" />} />
                    </div>
                </section>
            </div>
        </>
    )
}

const Menu = ({ href, icon, title }) => {
    const router = useRouter()
    const isActive = router.pathname === href ? true : false

    return (
        <>
            <Link href={href}>
                <a className={(isActive ? "active-menu " : "") + "w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"}>
                    {icon}
                    <span className="title tab tab-account block text-xs">{title}</span>
                </a>
            </Link>
        </>
    )
}

export default BottomMenu;