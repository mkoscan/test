      describe('Login', () => {
        it('Login through Google', () => {
        
          const username = 'm360terry@gmail.com';
          const password = 'Nextgen2017';
          const loginUrl = 'https://marija-qa.meridian360.io/portal/landing';
          const cookieName = 'idontknow';
          const socialLoginOptions = {
            username,
            password,
            loginUrl,
            headless: false,
            logs: false,
            loginSelector: 'a[id="idp-google"]',
            postLoginSelector: '.icon-home'
          }

          
          return cy.task('GoogleSocialLogin', socialLoginOptions).then(({cookies}) => {
           
            cy.clearCookies()
           
            const cookie = cookies.filter(cookie => cookie.name === cookieName).pop()
            if (cookie) {
              cy.setCookie(cookie.name, cookie.value, {
                domain: cookie.domain,
                expiry: cookie.expires,
                httpOnly: cookie.httpOnly,
                path: cookie.path,
                secure: cookie.secure
              })
              
              Cypress.Cookies.defaults({
                whitelist: cookieName
              })
              
            }   
            
          })  
          
        })       
      })