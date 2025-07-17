# Tradewise – Dashboard de Alto Rendimiento con Angular 20+

## Índice
1. [Visión general](#visión-general)
2. [Instalación](#instalación)
3. [Scripts npm](#scripts-npm)
4. [Estructura del proyecto](#estructura-del-proyecto)
5. [Pruebas y cobertura](#pruebas-y-cobertura)
6. [Convenciones de desarrollo](#convenciones-de-desarrollo)
7. [Contribuir](#contribuir)

## Visión general
Tradewise es una aplicación **Angular 20+ standalone** que muestra una serie de **gráficos financieros de alto volumen** basados en _Apache ECharts_.  
Se sigue Clean Code, SOLID, la guía de estilo oficial de Angular y las reglas internas del proyecto (OnPush, Signals, etc.).

✔️ Tooling:
- **TypeScript strict mode**
- **ESLint + Prettier** (husky + lint-staged en pre-commit)
- **Karma** para tests unitarios (≥ 90 % cobertura)

✔️ Funcionalidad implementada hasta la fecha:
- Gráficos *time-series*: Candlestick, Line, Stacked Area, Bump
- Gráficos *distribution*: Boxplot, Violin
- Gráficos *composition*: Donut, Treemap, Sunburst
- Widgets: PriceCard, CandleWidget
- Facade de mercado (MarketFacade) y mocks de datos

## Instalación
```bash
# Clonar repo
$ git clone https://github.com/tu-org/tradewise.git
$ cd tradewise

# Instalar dependencias
$ npm ci

# Configurar husky
$ npm run prepare
```

## Scripts npm
| Comando                | Descripción                                    |
|------------------------|-------------------------------------------------|
| `npm start`            | Arranca `ng serve` en modo desarrollo           |
| `npm run build`        | Compila para producción                         |
| `npm run test`         | Ejecuta pruebas con Karma                      |
| `npm run test:ci`      | Pruebas headless + cobertura                   |
| `npm run lint`         | ESLint (solo informe)                          |
| `npm run lint:fix`     | ESLint + auto-fix                              |
| `npm run format`       | Prettier sobre todo el workspace               |

## Estructura del proyecto (resumen)
```
src/
  app/
    core/          # servicios, facades, providers
    shared/
      components/  # gráficos + ui genérica
      widgets/     # composiciones de alto nivel
    features/      # páginas de la app
```
Los componentes usan `standalone: true` y se importan directamente en los contenedores.

## Pruebas y cobertura
```bash
npm run test:ci
```
Genera un reporte HTML en `coverage/`.  Todas las specs siguen el patrón **Arrange-Act-Assert**.  
Se realizan:
- Snapshot DOM + serie ECharts en cada componente de gráfico.
- Tests de builders en `ChartFacadeService`.

## Convenciones de desarrollo
* **ChangeDetectionStrategy.OnPush** – Siempre.  
* **Signals Inputs** – `input.required<T>()` para sustituir `@Input()`.  
* **sin ngOnChanges**, se usan `computed` + `effect`.  
* Import order definido en ESLint.  
* Commits ➜ **Conventional Commits**.

## Contribuir
1. Crear rama `feature/<nombre>` o `fix/<nombre>`.
2. Asegurarse de que `npm run lint` y `npm run test:ci` pasan.
3. Enviar *pull request* con descripción y checklist.
4. Se requiere cobertura ≥ 90 % y aprobación de al menos un revisor.

Gracias por contribuir 🚀
