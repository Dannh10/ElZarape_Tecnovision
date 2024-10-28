describe('Gestión de Usuarios', () => {

    beforeEach(() => {
      cy.visit('http://localhost:8080/PROYECTO_zarape/modules/moduloUsuario/view_Usuario.html'); 
    });
  
    it('Debería agregar un usuario nuevo', () => {
      cy.get('#txtNombre').type('Nuevo Usuario');
      cy.get('#txtContraseña').type('password123');
      cy.get('#btnAdd').click();
  
      // Verificar que el nuevo usuario aparece en la tabla
      cy.get('#tblUsuario').contains('Nuevo Usuario');
      cy.get('#tblUsuario').contains('password123');
    });
  
    it('Debería seleccionar y actualizar un usuario', () => {
      // Selecciona el primer usuario de la lista
      cy.get('#tblUsuario tr').first().click();
  
      // Cambia el nombre y contraseña del usuario seleccionado
      cy.get('#txtNombre').clear().type('Usuario Actualizado');
      cy.get('#txtContraseña').clear().type('newpassword456');
      cy.get('#btnUpdate').click();
  
      // Verifica que los cambios fueron aplicados
      cy.get('#tblUsuario').contains('Usuario Actualizado');
      cy.get('#tblUsuario').contains('newpassword456');
    });
  
    it('Debería eliminar (desactivar) un usuario', () => {
      // Selecciona el primer usuario de la lista
      cy.get('#tblUsuario tr').first().click();
  
      // Elimina (desactiva) el usuario
      cy.get('#btnDelete').click();
  
      // Verifica que el estatus cambió a "Inactivo"
      cy.get('#tblUsuario').contains('Inactivo');
    });
  
    it('Debería buscar un usuario por nombre', () => {
      // Introduce un nombre en el campo de búsqueda
      cy.get('#txtBusquedaUsuario').type('Gilberto');
      cy.get('button').contains('Buscar').click();
  
      // Verifica que solo el usuario buscado aparece en la tabla
      cy.get('#tblUsuario').should('contain', 'Gilberto');
      cy.get('#tblUsuario tr').should('have.length', 1);
    });
  
  });
  