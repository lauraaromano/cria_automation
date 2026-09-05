import { test as popupHandlerTest } from './popupHandler.fixture';
import users from './data/users.json';

export const test = popupHandlerTest;

export { expect } from '@playwright/test';
export { users };
export { ErrorHandler } from './errorHandler.fixture';
export { AlertHandler } from './alertHandler.fixture';