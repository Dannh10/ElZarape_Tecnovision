describe('Gestión de Combos', () => {

    beforeEach(() => {
      // Accede a la página de Gestión de Combos antes de cada prueba
      cy.visit('localhost:8080/PROYECTO_zarape/modules/moduloCombo/view_Combo.html');
    });
  
    it('Debe agregar un nuevo combo', () => {
      // Rellena el formulario con datos de un nuevo combo
      cy.get('#txtNumUnico').type('001');
      cy.get('#txtNombre').type('Combo Tacos y Coca');
      cy.get('#txtDescripcion').type('Dos Ordenes de tacos al pastor y dos Coca-Colas.');
      cy.get('#txtCategoria').type('Tacos');
      cy.get('#txtPrecio').type('75');
  
      // Haz clic en el botón Registrar
      cy.get('#btnAdd').click();
  
      // Verifica que el combo fue añadido a la tabla
      cy.get('#tblCombos').contains('Combo Tacos y Coca').should('exist');
    });
  
    it('Debe limpiar el formulario', () => {
      // Rellena los campos del formulario
      cy.get('#txtNumUnico').type('002');
      cy.get('#txtNombre').type('Combo Enchiladas y Sprite');
      cy.get('#txtDescripcion').type('Dos ordenes de enchiladas y dos Sprites.');
      cy.get('#txtCategoria').type('Enchiladas');
      cy.get('#txtPrecio').type('60');
  
      // Haz clic en el botón Limpiar
      cy.get('#btnClean').click();
  
      // Verifica que los campos del formulario estén vacíos
      cy.get('#txtNumUnico').should('have.value', '');
      cy.get('#txtNombre').should('have.value', '');
      cy.get('#txtDescripcion').should('have.value', '');
      cy.get('#txtCategoria').should('have.value', '');
      cy.get('#txtPrecio').should('have.value', '');
    });
  
    it('Debe buscar un combo existente', () => {
      // Busca un combo en la barra de búsqueda
      cy.get('#txtBusquedaCombo').type('Combo Tacos y Coca');
      cy.get('button').contains('Buscar').click();
  
      // Verifica que el combo se muestre en la tabla
      cy.get('#tblCombos').contains('Combo Tacos y Coca').should('exist');
    });
  
    it('Debe actualizar un combo existente', () => {
      // Busca el combo a actualizar
      cy.get('#txtBusquedaCombo').type('Combo Tacos y Coca');
      cy.get('button').contains('Buscar').click();
  
      // Selecciona el combo en la tabla
      cy.get('#tblCombos').contains('Combo Tacos y Coca').click();
  
      // Actualiza el nombre del combo
      cy.get('#txtNombre').clear().type('Combo Tacos y Sprite');
      cy.get('#btnUpdate').click();
  
      // Verifica que el nombre haya sido actualizado
      cy.get('#tblCombos').contains('Combo Tacos y Sprite').should('exist');
    });
  
    it('Debe eliminar un combo existente', () => {
      // Busca el combo a eliminar
      cy.get('#txtBusquedaCombo').type('Combo Tacos y Sprite');
      cy.get('button').contains('Buscar').click();
  
      // Selecciona el combo en la tabla
      cy.get('#tblCombos').contains('Combo Tacos y Sprite').click();
  
      // Elimina el combo
      cy.get('#btnDelete').click();
  
      // Verifica que el combo ya no esté en la tabla
      cy.get('#tblCombos').contains('Combo Tacos y Sprite').should('not.exist');
    });
  });
  