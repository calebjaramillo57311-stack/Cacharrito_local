# Refactorización de Gestión de Viajes y Reservas

Este documento detalla los cambios realizados en el sistema de gestión de viajes y reservas para mejorar la consistencia de los datos y la navegación administrativa.

## Cambios Realizados

### 1. Refactorización de Lógica al Backend
Se movió la responsabilidad de calcular los puestos disponibles del frontend al backend (`ViajeControlador.java`).
- **Nuevos Viajes:** Se inicializan los puestos disponibles con la capacidad total del automóvil asignado.
- **Edición de Viajes:** Si se cambia el automóvil, el sistema calcula cuántos pasajeros ya están reservados (capacidad anterior - puestos disponibles anteriores) y resta esa cantidad de la capacidad del nuevo automóvil.
- **Validación:** El backend ahora impide asignar un automóvil cuya capacidad sea menor al número de pasajeros ya reservados, lanzando una excepción.

### 2. Mejoras en la Interfaz de Gestión de Viajes
- Se simplificó el modal de edición para ocultar los puestos disponibles (manejados automáticamente) y permitir el cambio de automóvil mediante su número.
- Se refactorizó el componente TypeScript (`gestion-viajes.ts`) para usar `inject` y eliminar búsquedas de API innecesarias antes de guardar.

### 3. Navegación Administrativa en Viajes Disponibles
Se agregó un botón de retroceso condicional en la vista de `Viajes Disponibles`.
- **Visibilidad:** Solo aparece si el usuario ha iniciado sesión como administrador (token 'admin' en localStorage).
- **Funcionalidad:** Permite a los administradores regresar rápidamente a la `Gestión de Reservas` tras navegar para crear una nueva reserva.

## Instrucciones de Uso (Navegación Admin)
1. Inicie sesión como administrador.
2. Diríjase a **Gestión de Reservas**.
3. Haga clic en **+ Nueva Reserva**.
4. En la vista de **Viajes Disponibles**, verá un icono de flecha blanca en la parte superior izquierda que le permitirá regresar.
