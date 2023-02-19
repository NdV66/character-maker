import { createContext, useContext } from 'react';
import { TAppContext } from '../types';

export const AppContext = createContext<TAppContext>({} as TAppContext);

export const useAppContext = () => useContext(AppContext);
