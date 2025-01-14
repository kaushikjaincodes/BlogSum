"use server"

import {signIn, signOut} from "next-auth/react"
import { revalidatePath } from "next/cache";

export const logout = async (provider: string) => {
    await signOut({redirectTo: "/"} );
    revalidatePath("/");
};

export const login = async (provider: string) => {
    await signIn(provider,{redirectTo:"/"});
    revalidatePath("/");
};