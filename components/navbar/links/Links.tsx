"use client"
import { useState } from "react";
import NavLink from "./navLink/navLink";
import styles from "./links.module.css"
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
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
        title: "Blog",
        path: "/blog"
    },
    {
        title: "Create",
        path: "/create"
    }
]

const  Links =  () => {
    const [open, setOpen] = useState(false)
    const { data: session } = useSession();
    console.log(session);
    return (
        <div className={styles.links}>
            {links.map(link => <NavLink item={link} key={link.title} />)}
            {session?.user? (
                <>
                    {session?.user?.image && (
                        <Image 
                        className={styles['rounded-full']}
                        width={30}
                        height={30}
                        alt="User Image"
                        src={session?.user?.image || ""}
                    />
                    )}
                    <NavLink item={{ title: session.user?.name as string, path:"/"}} />
                    <button className={styles.logout} onClick={async ()=>{
                        await signOut({redirectTo: "/"} );
                        revalidatePath("/");
                    }}>logout</button>
                </>
            ) : (
                <NavLink item={{ title: "Login", path: "/signin" }} />
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