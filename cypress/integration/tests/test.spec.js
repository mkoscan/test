import { login, loginOptions} from '../../__helpers__/utils'

describe('Test scenario description', () => {

        it('first test', () => {
         login(loginOptions({username: 'm360terry@gmail.com', password: 'Nextgen2017'}))
         cy.visit('/landing')
        });
});