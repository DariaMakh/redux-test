import { createContext } from 'react';

export interface UserContextType {
	user: User;
}

export const UserContext = createContext<UserContextType | null>(null);

UserContext.displayName = 'UserContext';
