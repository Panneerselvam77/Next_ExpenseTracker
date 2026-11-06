import { User } from "./users.types";
import axios from "axios";

export async function fetchUserByUsername(
  username: string,
  signal?: AbortSignal,
): Promise<User> {
  const response = await axios.get<User>(
    `https://dummyjson.com/docs/users/${encodeURIComponent(username)}`,
    { signal },
  );

  return response.data;
}
