// cypress/e2e/sucursal_spec.js

describe('Gestión de Sucursales', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/PROYECTO_zarape/modules/moduloSucursal/view_Sucursal.html'); 
    });

    it('Debería agregar una nueva sucursal', () => {
        // Completar el formulario
        cy.get('#txtNumUnico').clear().type('4');
        cy.get('#txtNombre').clear().type('Nueva Sucursal');
        cy.get('#txtCalleYNum').clear().type('Calle Falsa 123');
        cy.get('#txtColonia').clear().type('Colonia Falsa');
        cy.get('#txtTelefono').clear().type('477000999');
        cy.get('#txtGPS').clear().type('19.4326,-99.1332');
        cy.get('#txtHorario').clear().type('9:00 - 18:00');
        cy.get('#txtPagWeb').clear().type('http://nuevasucursal.com');
        
        // Agregar sucursal
        cy.get('#btnAdd').click();
        
        // Validar que la nueva sucursal aparece en la tabla
        cy.get('#tblSucursal').find('tr').last().within(() => {
            cy.get('td').eq(0).should('have.text', 'Nueva Sucursal');
        });
    });

    it('Debería actualizar una sucursal existente', () => {
        // Seleccionar la sucursal "Centro Max" para editar
        cy.get('#tblSucursal').contains('Centro Max').click();

        // Actualizar los campos
        cy.get('#txtNombre').clear().type('Sucursal Actualizada');
        cy.get('#txtCalleYNum').clear().type('Blvd Actualizado');

        // Guardar cambios
        cy.get('#btnUpdate').click();

        // Validar que los cambios se reflejan en la tabla
        cy.get('#tblSucursal').contains('Sucursal Actualizada').should('exist');
    });

    it('Debería eliminar una sucursal', () => {
        // Seleccionar la sucursal "Altacia"
        cy.get('#tblSucursal').contains('Altacia').click();

        // Eliminar sucursal
        cy.get('#btnDelete').click();

        // Validar que la sucursal no está en la tabla
        cy.get('#tblSucursal').contains('Altacia').should('not.exist');
    });

    it('Debería buscar una sucursal', () => {
        // Ingresar búsqueda
        cy.get('#txtBusquedaSucursal').type('Centro Max');
        
        // Validar que se muestra la sucursal correcta
        cy.get('#tblSucursal').contains('Centro Max').should('exist');
        cy.get('#tblSucursal').contains('Altacia').should('not.exist'); // Asumiendo que Altacia no coincide
    });
});
