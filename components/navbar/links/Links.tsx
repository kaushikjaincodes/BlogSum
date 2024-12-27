// import Link from "next/link";
"use client"
import { useState } from "react";
import NavLink from "./navLink/navLink";
import styles from "./links.module.css"
import Image from "next/image";

const links = [
    {
        title: "Homepage",
        path: "/"
    },
    {
        title: "About",
        path: "/about"
    },
    {
        title: "Contact",
        path: "/contact"
    },
    {
        title: "Blog",
        path: "/blog"
    },
    {
        title: "Create",
        path: "/create"
    }
]

const Links = () => {
    const [open, setOpen] = useState(false)
    //TEMPORARY
    const session = true; // Simulates logged-in user
    const isAdmin = true; // Simulates admin privileges

    return (
        <div className={styles.links}>
            {links.map(link => <NavLink item={link} key={link.title} />)}
            {session ? (
                <>
                    {isAdmin && <NavLink item={{ title: "Admin", path: "/admin"}} />}
                    <button className={styles.logout}>Logout</button>
                </>
            ) : (
                <NavLink item={{ title: "Login", path: "/login" }} />
            )}

            <Image className={styles.menuButton} src="/handshake.jpeg" alt="menu" width={30} height={30} onClick={() => setOpen((prev) => !prev)} />
            {open && (
                <div className={styles.mobileLinks}>
                    {links.map((link) => (
                        <NavLink item={link} key={link.title} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Links