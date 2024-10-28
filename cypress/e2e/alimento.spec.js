describe('Pruebas del módulo de gestión de alimentos', () => {
  
    //agregar un nuevo alimento
    it('Debe agregar un nuevo alimento a la tabla', () => {
      cy.visit('http://localhost:8080/PROYECTO_zarape/modules/moduloCatalogoAlimento/view_Alimento.html');
  
      cy.get('#txtNumUnico').type('1234');
      cy.get('#txtNombre').type('Nuevo Alimento');
      cy.get('#txtPrecio').type('50');
      cy.get('#txtDescripcion').type('Descripción del nuevo alimento');
      cy.get('#txtCategoria').type('Categoría de ejemplo');
  
      cy.get('#btnAdd').click();
  
      cy.get('#tblAlimento tr').last().should('contain', 'Nuevo Alimento')
        .and('contain', '50')
        .and('contain', 'Descripción del nuevo alimento')
        .and('contain', 'Categoría de ejemplo');
    });
  
    //Prueba de selección y actualización de un alimento
    it('Debe actualizar los detalles de un alimento seleccionado', () => {
      cy.visit('http://localhost:8080/PROYECTO_zarape/modules/moduloCatalogoAlimento/view_Alimento.html');
  
      cy.get('#tblAlimento tr').first().click(); 
  
      cy.get('#txtNombre').clear().type('Alimento Actualizado');
      cy.get('#txtPrecio').clear().type('60');
      cy.get('#txtDescripcion').clear().type('Descripción actualizada');
      cy.get('#txtCategoria').clear().type('Categoría actualizada');
  
      cy.get('#btnUpdate').click();
  
      cy.get('#tblAlimento tr').first().should('contain', 'Alimento Actualizado')
        .and('contain', '60')
        .and('contain', 'Descripción actualizada')
        .and('contain', 'Categoría actualizada');
    });
  
    // 4. Prueba de eliminación de un alimento
    it('Debe marcar un alimento como Inactivo', () => {
      cy.visit('http://localhost:8080/PROYECTO_zarape/modules/moduloCatalogoAlimento/view_Alimento.html');
  
      cy.get('#tblAlimento tr').eq(1).click(); // Seleccionar el segundo alimento
  
      cy.get('#btnDelete').click();
  
      cy.get('#tblAlimento tr').eq(1).should('contain', 'Inactivo'); // Verificar el cambio de estatus
    });
  
    // 5. Prueba de búsqueda de alimentos
    it('Debe filtrar alimentos según el nombre ingresado', () => {
      cy.visit('http://localhost:8080/PROYECTO_zarape/modules/moduloCatalogoAlimento/view_Alimento.html');
  
      cy.get('#txtBusquedaAlimento').type('Pozole'); // Buscar el alimento 'Pozole'
      cy.get('#btnSearch').click();
  
      cy.get('#tblAlimento tr').should('have.length', 1); // Solo debe haber un resultado
      cy.get('#tblAlimento tr').first().should('contain', 'Pozole Verde');
    });
  
    // 6. Prueba de limpiar el formulario
    it('Debe limpiar todos los campos del formulario', () => {
      cy.visit('http://localhost:8080/PROYECTO_zarape/modules/moduloCatalogoAlimento/view_Alimento.html');
  
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
  