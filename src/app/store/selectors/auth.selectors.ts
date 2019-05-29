import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAuthState } from '../reducers/auth.reducer';

export const getAuthData = createFeatureSelector<IAuthState>('auth');

export const getUserRole = createSelector(
  getAuthData,
  (state: IAuthState) => state.role,
);
