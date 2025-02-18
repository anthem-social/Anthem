import { Status } from "@/types";
import { getAnthemClient } from "./clients";
import { User } from "@/types";

export async function getUser(userId: string): Promise<User> {
    const result = await getAnthemClient();

    if (result.IsSuccess && result.Data) {
        const client = result.Data;
        const response = await client.get("/users/" + userId);
        // console.log(response.data);
        const user = response.data as User;
        return user;
    }
    else {
        throw new Error(result.ErrorMessage);
    }
}

export async function getUserStatus(userId: string): Promise<Status> {
    const result = await getAnthemClient();

    if (result.IsSuccess && result.Data) {
        const client = result.Data;
        const response = await client.get("/status/" + userId);
        console.log(response.data);
        const status = response.data as Status;

        return status;
    }
    else {
        throw new Error(result.ErrorMessage);
    }
}
