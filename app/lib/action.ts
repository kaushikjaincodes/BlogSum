    "use server"

    import { revalidatePath } from "next/cache"
    import { supabase } from "./supabaseClient"

    export const addPost = async (formData: FormData) => {
        const { title, desc, slug, userId, img} = Object.fromEntries(formData)
        
        try{
            // removing data because of 
            // const { data, error } = await supabase
            const { error } = await supabase
                .from('posts')
                .insert([
                    {
                        title,
                        desc,
                        slug,
                        userId,
                        img
                    }
                ])
                .select();

            if (error) throw error

            console.log("saved to db")
            revalidatePath("/blog")
            // return { success: true };

        } catch(err){
            console.log(err)
            throw new Error("Something went wrong!")
        }
    }

    export const deletePost = async (formData: FormData) => {
        const { id } = Object.fromEntries(formData)

        try{
            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', id);

            if (error) throw error;

            console.log("deleted from db")
            revalidatePath("/blog")
            // return { success: true };

        } catch(err) {
            console.log(err)
            throw new Error("Something went wrong!")
        }
    }