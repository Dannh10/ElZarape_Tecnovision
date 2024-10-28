describe('Gestión de Bebidas - Restaurant El Zarape', () => {
    // Se ejecuta antes de cada prueba
    beforeEach(() => {
        cy.visit('http://localhost:8080/PROYECTO_zarape/modules/moduloCatalogoBebida/view_Bebida.html'); // Reemplaza con la ruta a la página del módulo de bebidas
    });

    it('Debe agregar una bebida correctamente', () => {
        // Llenar los campos del formulario
        cy.get('#txtNumUnico').type('8b08');
        cy.get('#txtNombre').type('Pepsi');
        cy.get('#txtPrecio').type('18');
        cy.get('#txtDescripcion').type('Refresco de cola, similar a Coca-Cola');
        cy.get('#txtCategoria').select('Refresco');
        
        // Hacer clic en el botón para agregar la bebida
        cy.get('#btnAdd').click();
        
        // Verificar que la bebida ha sido agregada en la tabla
        cy.get('#tblBebida').should('contain', 'Pepsi');
        cy.get('#tblBebida').should('contain', '18');
        cy.get('#tblBebida').should('contain', 'Refresco');
    });

    it('Debe seleccionar y modificar una bebida', () => {
        // Seleccionar la bebida por su fila en la tabla (basado en el índice de la tabla)
        cy.get('#tblBebida tr').contains('Coca-Cola').click();

        // Modificar los campos
        cy.get('#txtPrecio').clear().type('22');
        cy.get('#txtDescripcion').clear().type('Refresco de cola clásico, con más gas.');

        // Hacer clic en el botón de actualizar
        cy.get('#btnUpdate').click();

        // Verificar que los cambios se han actualizado en la tabla
        cy.get('#tblBebida').should('contain', '22');
        cy.get('#tblBebida').should('contain', 'Refresco de cola clásico, con más gas.');
    });

    it('Debe desactivar (eliminar) una bebida', () => {
        // Seleccionar la bebida
        cy.get('#tblBebida tr').contains('Sprite').click();

        // Hacer clic en el botón de eliminar
        cy.get('#btnDelete').click();

        // Verificar que la bebida ahora está marcada como "Inactivo"
        cy.get('#tblBebida').should('contain', 'Sprite');
        cy.get('#tblBebida').should('contain', 'Inactivo');
    });

    it('Debe buscar una bebida correctamente', () => {
        // Buscar la bebida por nombre
        cy.get('#txtBusquedaBebida').type('Fanta');
        
        // Verificar que la tabla solo muestra la bebida buscada
        cy.get('#tblBebida tr').should('have.length', 1);
        cy.get('#tblBebida').should('contain', 'Fanta');
    });
});
