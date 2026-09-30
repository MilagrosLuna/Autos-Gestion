# Gestión de Flota de Vehículos

Sistema web para administrar una flota de autos: altas de vehículos, servicios de taller, alquileres y un resumen económico por patente.

## Funcionalidades

- **Autos:** alta y listado con patente, titular, aseguradora, kilometraje y multas.
- **Servicios:** registro de cada servicio (taller, detalle, precio y fecha).
- **Alquileres:** chofer, precio diario, total y fechas de inicio y fin.
- **Detalle por patente:** total de alquileres, total de servicios y balance.
- **Gráficos:** balance económico general y cantidad de servicios por patente.
- **Borrado con archivo:** lo que se elimina se copia a `<colección>Archivo` antes de borrarse.
- **Cuentas:** registro con verificación de mail y aprobación manual de un administrador.

## Stack

- Angular 16 (módulos, SCSS)
- Firebase: Authentication, Firestore y Hosting
- MDB Angular UI Kit, Chart.js, SweetAlert2, EmailJS

## Correr el proyecto en local

Requisitos: Node 18+ y npm.

```bash
git clone https://github.com/MilagrosLuna/Autos-Gestion.git
cd Autos-Gestion
npm install      # crea src/environments/environment.ts desde la plantilla si no existe
npm run dev      # http://localhost:4200
```

`npm run dev` usa `src/environments/environment.development.ts`, que apunta al proyecto de Firebase de desarrollo (`autos-luna`).

### Configuración de entornos

| Archivo | Uso | En git |
| --- | --- | --- |
| `environment.development.ts` | `npm run dev` y builds de desarrollo | Sí |
| `environment.ts` | Build de producción (`npm run build` / `deploy`) | No |
| `environment.example.ts` | Plantilla de `environment.ts` | Sí |

Para producción, completá `firebaseConfig` en `src/environments/environment.ts` con la configuración del proyecto `gestion-autos` (Consola de Firebase > Configuración del proyecto > Tus apps).

## Acceso

1. Registrarse desde `/register`.
2. Verificar el mail.
3. Un administrador aprueba la cuenta desde **Cuentas**.

Los administradores se cargan a mano en la colección `admins` de Firestore (documento con el campo `id` igual al `uid` del usuario).

## Seguridad (Firestore)

Las reglas están en [`firestore.rules`](firestore.rules):

- Los datos de la flota (`autos`, `servicios`, `alquileres` y sus archivos) solo se leen y escriben con sesión iniciada y mail verificado.
- Un usuario solo puede crear su propio registro en `usuarios`, y siempre con `aprobado: false`.
- `admins` es de solo lectura desde la app.

Para publicarlas:

```bash
firebase deploy --only firestore:rules --project default
```

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con el entorno de desarrollo |
| `npm run build` | Build de producción en `dist/gestion_autos` |
| `npm run deploy` | Build de producción + deploy a Firebase Hosting |
| `npm test` | Tests unitarios con Karma |

## Estructura

```
src/app/
├── classes/           # Modelos: Auto, Servicio, Alquiler, Cuenta, Detalle
├── components/        # Vistas: altas, listados, detalle, cuentas, login, etc.
│   └── modals/        # Modales de edición y borrado
└── servicesAndUtils/  # Auth, Firestore, guard, alertas, pipe de moneda
```

## Autora

[@MilagrosLuna](https://github.com/MilagrosLuna)
