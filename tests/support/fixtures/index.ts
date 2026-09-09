import { test as popupHandlerTest } from './popupHandler.fixture';
import users from './data/users.json';
import essays from './data/essays.json';


export const test = popupHandlerTest;

export { expect } from '@playwright/test';
export { users };
export { essays };
export { ErrorHandler } from './errorHandler.fixture';
export { AlertHandler } from './alertHandler.fixture';