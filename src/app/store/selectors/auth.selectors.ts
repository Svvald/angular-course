import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from '../reducers/auth.reducer';

export const getAuthData = createFeatureSelector<AuthState>('userdata');

export const getUserRole = createSelector(
  getAuthData,
  (state: AuthState) => state.role,
);
