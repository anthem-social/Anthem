import { PostCardPage, Status } from "@/types";
import { getAnthemClient } from "./clients";
import { User } from "@/types";
import { ServiceResult } from "./ServiceResult";

export async function get(userId: string): Promise<User> {
    const result = await getAnthemClient();

    if (result.IsSuccess && result.Data) {
        const client = result.Data;
        const response = await client.get("/users/" + userId);
        const user = response.data as User;
        return user;
    }
    else {
        throw new Error(result.ErrorMessage);
    }
}

export async function getFeed(exclusiveStartKey: string | null): Promise<ServiceResult<PostCardPage>> {
  try {
    const getClient = await getAnthemClient();

    if (getClient.IsFailure)
      return ServiceResult.Failure(getClient.ErrorMessage!, getClient.ErrorOrigin!);

    const client = getClient.Data!;
    const response = await client.get("/users/schreineravery-us/feed", {
        params: {
          exclusiveStartKey: exclusiveStartKey
        }
      }
    );
    const results = response.data as PostCardPage;
    
    return ServiceResult.Success(results);
  }
  catch (error) {
    return ServiceResult.Failure("Failed to get feed.", "feed.getPage()");
  }
}

export async function getStatus(userId: string): Promise<Status> {
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
