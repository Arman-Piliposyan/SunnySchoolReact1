import { createSelector } from '@reduxjs/toolkit';

import { RootStateType } from '..';

const selector = (state: RootStateType) => state.posts;

export const postsSelector = createSelector(selector, (signUp) => signUp.posts);
