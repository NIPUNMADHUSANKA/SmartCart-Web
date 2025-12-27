export interface RegisterPayload {
    userId?: string | '';
    fullName?: string;
    userName?: string;
    email?: string;
    password?: string;
    createdAt?: string | '';   // ISO string (bound to datetime-local)
    updatedAt?: string | '';  // ISO string (bound to datetime-local)
}

export interface LoginPayload {
    userName?: string;
    password?: string;
}

export interface AuthTokenResponse extends AuthUser{
    accessToken?: string | null;
}

export interface AuthUser {
  userName?: string;
  userId?: string;
}


export interface userPayload {
    userId?: string | '';
    fullName?: string;
    userName?: string;
    email?: string;
    createdAt?: string | '';   // ISO string (bound to datetime-local)
    updatedAt?: string | '';  // ISO string (bound to datetime-local)
}