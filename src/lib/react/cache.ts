// To avoid calling many time same function, you can cache them with react `cache` method

import { cache } from "react";
import { getCurrentUser, getRequiredCurrentUser } from "../user/get-user";

export const getCurrentUserCache = cache(getCurrentUser);
export const getRequiredCurrentUserCache = cache(getRequiredCurrentUser);
