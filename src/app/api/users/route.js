import { getUsers } from "@/lib/mongo/users";

export const fetchCache = 'force-no-store';

const GET = async (req, res) => {
    const users = await getUsers();

    return Response.json({ users });
};

export {
    GET
};