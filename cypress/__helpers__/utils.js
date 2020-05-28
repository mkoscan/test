export const loginOptions = (prop) => {
    return {
        ...{
            username: '',
            password: '',
            loginUrl: 'https://marija-qa.meridian360.io/portal/landing',
            headless: false,
            logs: true,
            postLoginSelector: '.icon-home',
            getAllBrowserCookies: true,
            login: true
        }, ...prop
    };
};

export const login = (loginOptions) => {
    cy.task('Login', loginOptions).then(({ cookies }) => {
        cy.clearCookies()
        cookies.forEach(c => cy.setCookie(c.name, c.value))
    })
}