import { ContentType, PostCreate } from '@/types';
import { getAnthemClient } from "./clients";
import { ServiceResult } from './ServiceResult';
import { PathProps } from 'react-native-svg';

export async function create(caption: string, content: string, contentType: ContentType): Promise<ServiceResult<null>> {
    try {
        const getClient = await getAnthemClient();

        if (getClient.IsFailure) {
            return ServiceResult.Failure(getClient.ErrorMessage!, getClient.ErrorOrigin!);
        }

        const client = getClient.Data!;

        const dto: PostCreate = {
            caption,
            content,
            contentType: Object.values(ContentType).indexOf(contentType)
        };

        console.log(dto)

        const response = await client.post("/posts", dto)
        
        return ServiceResult.Success(null);
    }
    catch (error) {
        console.error(error);
        return ServiceResult.Failure("Failed to create post.", "post.create()");
    }
}
