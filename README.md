# Market Insights Dashboard

## 🌟 **Descripción**
**Market Insights Dashboard** es una aplicación desarrollada en Angular 19 que combina la potencia de **GraphQL**, algoritmos **metaheurísticos** y visualizaciones avanzadas para ofrecer análisis en tiempo real de datos financieros. Este proyecto busca mostrar el potencial de Angular en la gestión de altos volúmenes de datos, su capacidad de reactividad y modularidad, y cómo utilizar cálculos avanzados en segundo plano mediante **web workers**.

## 🚀 **Características**
- **Dashboard interactivo:**
  - Visualización de datos históricos y en tiempo real (acciones, criptomonedas, etc.).
  - Widgets personalizables para gráficos y análisis avanzados.
- **Optimización de portafolios:**
  - Algoritmos metaheurísticos, como simulación de recocido y Monte Carlo, para encontrar combinaciones óptimas de activos.
- **Gráficos avanzados:**
  - Heatmaps, líneas de tendencia, y gráficos de velas japonesas utilizando librerías como `ngx-charts` o `D3.js`.
- **Actualizaciones en tiempo real:**
  - GraphQL Subscriptions para datos en vivo.
- **Web Workers:**
  - Ejecución de cálculos complejos en segundo plano para un rendimiento óptimo.

## 🛠️ **Tecnologías Utilizadas**
- **Angular 19**: Framework principal.
- **GraphQL**: Consumo de datos desde APIs de terceros (CoinGecko, Alpha Vantage, etc.).
- **Web Workers**: Para cálculos pesados como optimización de portafolios y predicción de tendencias.
- **Signals**: Para la reactividad eficiente de los componentes.
- **Visualización**: `ngx-charts` o `D3.js` para gráficos interactivos.

## 📦 **Estructura del Proyecto**
```bash
├── README.md                    # Documentación principal del proyecto
├── angular.json                 # Configuración de Angular CLI
├── package-lock.json            # Archivo de bloqueo para dependencias
├── package.json                 # Dependencias y scripts del proyecto
├── public/                      # Archivos públicos (favicon, imágenes estáticas)
│   └── favicon.ico              # Ícono de la aplicación
├── src/                         # Carpeta principal de la aplicación
│   ├── app/                     # Lógica principal de la app
│   │   ├── app.component.html   # Componente raíz: HTML
│   │   ├── app.component.scss   # Estilos globales del componente raíz
│   │   ├── app.component.spec.ts # Pruebas unitarias del componente raíz
│   │   ├── app.component.ts     # Lógica del componente raíz
│   │   ├── app.config.ts        # Configuración inicial de la app
│   │   ├── app.routes.ts        # Configuración de rutas principales
│   │   ├── core/                # Módulo Core (GraphQL y servicios globales)
│   │   │   ├── graphql/         # Configuración de GraphQL
│   │   │   │   └── queries.ts   # Consultas
│   │   │   │   └── mutations.ts # Mutaciones
│   │   │   ├── interceptors/    # Interceptores HTTP
│   │   │   └── services/        # Servicios globales
│   │   ├── shared/              # Componentes y utilidades reutilizables
│   │   │   ├── components/      # Componentes comunes (ej. Navbar)
│   │   │   ├── pipes/           # Pipes compartidos
│   │   │   ├── directives/      # Directivas reutilizables
│   │   ├── features/            # Funcionalidades principales (módulos específicos)
│   │   │   ├── dashboard/       # Dashboard principal
│   │   │   │   ├── components/  # Widgets del dashboard
│   │   │   │   ├── pages/       # Páginas del módulo dashboard
│   │   │   ├── optimizer/       # Optimización de portafolios (algoritmos)
│   │   │   │   ├── workers/     # Algoritmos metaheurísticos (Web Workers)
│   │   │   │   ├── components/  # Visualización de resultados
│   │   │   └── settings/        # Configuración del usuario
│   │   │       ├── components/
│   ├── index.html               # Archivo HTML principal
│   ├── main.ts                  # Punto de entrada de Angular
│   ├── styles.scss              # Estilos globales
│   └── environments/            # Configuración por entornos
│       ├── environment.ts       # Desarrollo
│       └── environment.prod.ts  # Producción
├── tsconfig.app.json            # Configuración TypeScript para la app
├── tsconfig.json                # Configuración TypeScript principal
└── tsconfig.spec.json           # Configuración TypeScript para pruebas
```

## 🌐 **Setup Inicial**
Sigue los pasos para poner en marcha el proyecto localmente.

### **1. Clonar el repositorio**
```bash
git clone git@github.com:dmorfav/market-insights.git
cd market-insights
```

### **2. Instalar dependencias**
```bash
npm install
```

### **3. Configurar entornos**
```typescript
export const environment = {
  production: false,
  graphqlApiUrl: 'https://api.example.com/graphql',
  apiKey: 'TU_API_KEY'
};
```

### **3. Configurar entornos**
```bash
ng serve
```

## 🧑‍💻 Contribuciones
Este proyecto es open source. Si deseas contribuir:

 - Realiza un fork del repositorio.
 - Crea una nueva rama para tu funcionalidad o mejora (git checkout -b feature/nueva-funcionalidad).
 - Haz un pull request con tus cambios.

## 📈 Roadmap
1. Setup inicial y conexión con una API GraphQL.
2. Visualización básica de datos históricos.
3. Implementación de Web Workers para algoritmos metaheurísticos.
4. Configuración de widgets y visualizaciones personalizables.
5. Optimización de rendimiento y pruebas unitarias.
6. Despliegue en producción.

## 📜 Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
