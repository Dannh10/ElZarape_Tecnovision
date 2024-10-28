describe('Pruebas de inicio de sesión en El Zarape', () => {

    it('Debe mostrar un error con credenciales incorrectas', () => {
        cy.visit('http://localhost:8080/PROYECTO_zarape/');

        // Introduce datos incorrectos
        cy.get('#username').should('be.visible').type('usuarioIncorrecto');
        cy.get('#password').should('be.visible').type('contraseñaIncorrecta');
        cy.get('button[type="submit"]').click();

        // Verifica que aparezca el mensaje de error
        cy.get('#error').should('contain.text', 'Nombre de usuario o contraseña incorrectos');
    });

    it('Debe iniciar sesión correctamente con credenciales válidas y redirigir a restaurante.html', () => {
        cy.visit('http://localhost:8080/PROYECTO_zarape/');

        // Introduce credenciales correctas
        cy.get('#username').should('be.visible').type('Daniel');
        cy.get('#password').should('be.visible').type('15689');
        cy.get('button[type="submit"]').click();

        cy.url().should('include', 'restaurante.html');
    });

    it('Debe mostrar un error si falta ingresar el nombre de usuario o contraseña', () => {
        cy.visit('http://localhost:8080/PROYECTO_zarape/');

        // Deja el campo de contraseña vacío
        cy.get('#username').should('be.visible').type('Daniel');
        cy.get('button[type="submit"]').click();

        // Verifica que aparezca el mensaje de error
        cy.get('#error').should('contain.text', 'Nombre de usuario o contraseña incorrectos');
    });

});
