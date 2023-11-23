"use client";
import supabase from "@/app/helpers/InitSupabase.js";

export async function uploadUserProfileImage(
    file,
    bucket,
    profileColumn,
) {
        return new Promise(async (resolve, reject) => {
        const newName = Date.now() + file.name;
        const { data: { user } } = await supabase.auth.getUser();
        const {data,error} = await supabase.storage
        .from(bucket)
        .upload(newName, file);
        if(error) throw error;
        if(data){
            console.log("hey")
            console.log(data.path);
            const url = "https://dwxuqztqiskahoyvwxbn.supabase.co/" + `storage/v1/object/public/${bucket}/` + data.path;
            supabase.from("profiles")
            .update({
                [profileColumn]: url,
            })
            .eq("id", user.id)
            .then(({data, error}) => {
                if(error) throw error;
                if(!error) {
                    resolve();
                }
                else {
                    throw data.error
                }
        });
    }
}
)
}