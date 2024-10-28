describe('Prueba General del Sistema', () => {

    before(() => {
      // Visita la página de inicio de sesión
      cy.visit('http://localhost:8080/PROYECTO_zarape/'); 
    });

    it('Debe mostrar un error con credenciales incorrectas', () => {
        cy.visit('http://localhost:8080/PROYECTO_zarape/');

        // Introduce datos incorrectos
        cy.get('#username').should('be.visible').type('usuarioIncorrecto');
        cy.get('#password').should('be.visible').type('contraseñaIncorrecta');
        cy.get('button[type="submit"]').click();

        // Verifica que aparezca el mensaje de error
        cy.get('#error').should('contain.text', 'Nombre de usuario o contraseña incorrectos');
    });
  
    it('Debería iniciar sesión correctamente', () => {
        cy.visit('http://localhost:8080/PROYECTO_zarape/')
      // Ingresar el nombre de usuario y contraseña
      cy.get('#username').should('be.visible').type('Daniel');
      cy.get('#password').should('be.visible').type('15689');
      cy.get('button[type="submit"]').click();
  
      // Verificar que la redirección fue correcta a la página principal del sistema
      cy.url().should('eq', 'http://localhost:8080/PROYECTO_zarape/login/restaurante.html'); 
    });
  
    it('Debería acceder al módulo de sucursales', () => {
      cy.visit('http://localhost:8080/PROYECTO_zarape/modules/moduloSucursal/view_Sucursal.html')
  
      //Actualizar una sucursal
      cy.get('#tblSucursal').contains('Centro Max').click();

      // Actualizar los campos
      cy.get('#txtNombre').clear().type('Sucursal Actualizada');
      cy.get('#txtCalleYNum').clear().type('Blvd Actualizado');

      // Guardar cambios
      cy.get('#btnUpdate').click();

      // Validar que los cambios se reflejan en la tabla
      cy.get('#tblSucursal').contains('Sucursal Actualizada').should('exist');
    });
  
    it('Debería acceder al módulo de bebidas', () => {
      // Acceder al módulo de bebidas
      cy.visit('http://localhost:8080/PROYECTO_zarape/modules/moduloCatalogoBebida/view_Bebida.html')
  
      //Eliminar bebida
      cy.get('#tblBebida tr').contains('Sprite').click();

        // Hacer clic en el botón de eliminar
        cy.get('#btnDelete').click();

        // Verificar que la bebida ahora está marcada como "Inactivo"
        cy.get('#tblBebida').should('contain', 'Sprite');
        cy.get('#tblBebida').should('contain', 'Inactivo');
  
      // Verificar que la nueva bebida se agregó correctamente
      cy.get('#tblBebidas').should('contain', 'Jugo de Naranja');
    });
  
    it('Debería acceder al módulo de alimentos', () => {
      // Acceder al módulo de alimentos
      cy.visit('http://localhost:8080/PROYECTO_zarape/modules/moduloCatalogoAlimento/view_Alimento.html')
  
      // Limpiar formulario
      cy.get('#txtNumUnico').type('5678');
      cy.get('#txtNombre').type('Alimento Temporal');
      cy.get('#txtPrecio').type('40');
      cy.get('#txtDescripcion').type('Descripción temporal');
      cy.get('#txtCategoria').type('Categoría temporal');
  
      cy.get('#btnClean').click();
  
      cy.get('#txtNumUnico').should('have.value', '');
      cy.get('#txtNombre').should('have.value', '');
      cy.get('#txtPrecio').should('have.value', '');
      cy.get('#txtDescripcion').should('have.value', '');
      cy.get('#txtCategoria').should('have.value', '');
      
    });
  
  });
  