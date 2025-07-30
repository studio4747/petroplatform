import { useEffect, useState } from "react";
import pb from "@/lib/pocketbase";
import { UserModel } from "@/types";

export function useCurrentUser() {
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    const currentUser = pb.authStore.model as UserModel | null;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  return user;
}