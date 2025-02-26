import { CommentCardPage, ContentType, Like } from '@/types';
import { getAnthemClient } from "./clients";
import { ServiceResult } from './ServiceResult';

export async function create(caption: string, content: string, contentType: ContentType): Promise<ServiceResult<null>> {
  try {
    const getClient = await getAnthemClient();

    if (getClient.IsFailure)
      return ServiceResult.Failure(getClient.ErrorMessage!, getClient.ErrorOrigin!);

    const client = getClient.Data!;

    const response = await client.post("/posts", {
      caption,
      content,
      contentType: contentType as number
    })
    
    return ServiceResult.Success(null);
  }
  catch (error) {
    return ServiceResult.Failure("Failed to create post.", "post.create()", error);
  }
}

export async function createComment(postId: string, text: string): Promise<ServiceResult<Comment>> {
  try {
    const getClient = await getAnthemClient();

    if (getClient.IsFailure)
      return ServiceResult.Failure(getClient.ErrorMessage!, getClient.ErrorOrigin!);

    const client = getClient.Data!;

    var response = await client.post(`/posts/${encodeURIComponent(postId)}/comments`, { text });

    console.log(response.data);

    return ServiceResult.Success(response.data.value);
  }
  catch (error) {
    return ServiceResult.Failure("Failed to comment on post.", "post.createComment()", error);
  }
}

export async function createLike(postId: string): Promise<ServiceResult<Like>> {
  try {
    const getClient = await getAnthemClient();

    if (getClient.IsFailure)
      return ServiceResult.Failure(getClient.ErrorMessage!, getClient.ErrorOrigin!);

    const client = getClient.Data!;

    var response = await client.post(`/posts/${encodeURIComponent(postId)}/likes`);

    console.log(response.data);

    return ServiceResult.Success(response.data);
  }
  catch (error) {
    return ServiceResult.Failure("Failed to like post.", "post.createLike()", error);
  }
}

export async function getComments(exclusiveStartKey: string | null, postId: string): Promise<ServiceResult<CommentCardPage>> {
  try {
    const getClient = await getAnthemClient();

    if (getClient.IsFailure)
      return ServiceResult.Failure(getClient.ErrorMessage!, getClient.ErrorOrigin!);

    const client = getClient.Data!;

    const response = await client.get(`/posts/${encodeURIComponent}/comments`, { params: { exclusiveStartKey } });

    return ServiceResult.Success(response.data);
  }
  catch (error) {
    return ServiceResult.Failure("Failed to get comments.", "post.getComments()", error);
  }
}

export async function remove(postId: string): Promise<ServiceResult<null>> {
  try {
    const getClient = await getAnthemClient();

    if (getClient.IsFailure)
      return ServiceResult.Failure(getClient.ErrorMessage!, getClient.ErrorOrigin!);

    const client = getClient.Data!;

    await client.delete(`/posts/${encodeURIComponent(postId)}`);

    return ServiceResult.Success(null);
  }
  catch (error) {
    return ServiceResult.Failure("Failed to remove post.", "post.remove()", error);
  }
}

export async function removeComment(postId: string, commentId: string): Promise<ServiceResult<null>> {
  try {
    const getClient = await getAnthemClient();

    if (getClient.IsFailure)
      return ServiceResult.Failure(getClient.ErrorMessage!, getClient.ErrorOrigin!);

    const client = getClient.Data!;

    await client.delete(`/posts/${encodeURIComponent(postId)}/comments/${encodeURIComponent(commentId)}`);

    return ServiceResult.Success(null);
  }
  catch (error) {
    return ServiceResult.Failure("Failed to remove comment.", "post.removeComment()", error);
  }
}

export async function removeLike(postId: string, likeId: string): Promise<ServiceResult<null>> {
  try {
    const getClient = await getAnthemClient();

    if (getClient.IsFailure)
      return ServiceResult.Failure(getClient.ErrorMessage!, getClient.ErrorOrigin!);

    const client = getClient.Data!;

    await client.delete(`/posts/${encodeURIComponent(postId)}/likes/${encodeURIComponent(likeId)}`);

    return ServiceResult.Success(null);
  }
  catch (error) {
    return ServiceResult.Failure("Failed to remove like.", "post.removeLike()", error);
  }
}
