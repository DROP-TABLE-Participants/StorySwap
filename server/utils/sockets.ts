import AppDataSource from "../data-source";
import Room from "../entities/Room";
import RoomsUsersRoles from "../entities/RoomsUsersRoles";


export const getUserRole = async (roomId: string, userId: string, type?: string) => {
    const room = await AppDataSource
        .getRepository(Room).find({
            where: {
                roomId: roomId
            }
        });

    console.log(room);

    if (!room) return null;

    return await AppDataSource
        .getRepository(RoomsUsersRoles)
        .findOne({
            where: {
                room: room,
                userId: userId,
                ...(type && { type: type })
            }
        });
}
