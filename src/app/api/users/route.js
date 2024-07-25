import { revalidatePath } from 'next/cache';
import { getUsers } from "@/lib/mongo/users";

const GET = async (req, res) => {
    const users = await getUsers();
    const path = req?.nextUrl?.pathname;

    if (path) {
        revalidatePath(path);
    }

    return Response.json({ users });
};

export {
    GET
};