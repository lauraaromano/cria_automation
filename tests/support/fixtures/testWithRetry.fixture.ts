import {test as popupHandlerTest,expect,} from './popupHandler.fixture';

/**
 * Exporta o `test` personalizado com os fixtures da aplicação,
 * incluindo o tratamento automático de popups, cookies e dialogs.
 */

export const test = popupHandlerTest;

export { expect };
