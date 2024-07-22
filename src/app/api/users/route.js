import { getUsers } from "@/lib/mongo/users";

const GET = async (req, res) => {
    const users = await getUsers();

    return Response.json({ users });
};

export {
    GET
};