# D&D 5.5 (Revisión 2024) - Plataforma Web con Bot DM y Memoria Inmortal

Una plataforma web interactiva desarrollada en **Next.js (App Router, TypeScript, Tailwind CSS)** para jugar a **Dungeons & Dragons 5.5 (2024)** tanto en modo **Solitario** como en **Multijugador con amigos** mediante códigos de sala compartidos.

El sistema cuenta con un **Bot Dungeon Master impulsado por IA** que soluciona el problema de la amnesia y la pérdida de contexto mediante una arquitectura de **Ledger Canónico de Decisiones (Event Sourcing)** y separación determinista de estado.

---

## Características Principales

### 1. Compendio Completo D&D 5.5 (2024)
- **12 Archivos de Clases Modulares**: Bárbaro, Bardo, Clérigo, Druida, Explorador, Guerrero, Hechicero, Mago, Monje, Paladín, Pícaro y Brujo.
- **48 Subclases Oficiales**: Las 4 subclases de cada clase desbloqueadas a nivel 3 (incluyendo las nuevas como *Árbol del Mundo*, *Colegio del Baile*, *Círculo del Mar* y *Guerreros de los Elementos*).
- **8 Maestrías de Armas (Weapon Masteries)**: *Hendidura (Cleave), Roce (Graze), Corte Rápido (Nick), Empujón (Push), Minar (Sap), Ralentizar (Slow), Derribo (Topple) y Hostigamiento (Vex)* con resolución de reglas automática.
- **15 Condiciones**: Incluye el nuevo sistema de **Agotamiento 5.5** escalonado de 1 a 6 con penalizador acumulativo de $-2 \times \text{nivel}$ a pruebas d20 y CD de conjuros.
- **12 Acciones de Combate 2024**: *Atacar, Correr, Destrabarse, Esquivar, Ayudar, Esconderse (CD 15), Influenciar, Magia, Preparar, Buscar, Estudiar y Utilizar*.
- **Catálogo de Dotes**: Dotes de Origen (Nivel 1), Dotes Generales (Nivel 4+ con ASI), Estilos de Combate y Bendiciones Épicas (Nivel 19+).

### 2. Memoria Inmortal del Bot DM (Event Sourcing)
- **Separación de Estado Determinista**: Vida, ranuras, dados e inventario no dependen del texto libre del modelo.
- **Ledger Inmutable de Eventos**: Cada decisión clave tomada por los jugadores se registra permanentemente con consecuencias activas.
- **Inyección Contextual Dinámica (Micro-Cápsula)**: Solo se inyectan los hechos relevantes a la escena o PNJs presentes, logrando respuestas en streaming inmediatas con menos de 800 tokens de entrada y aprovechando **Prompt Caching** para un 90% de ahorro.
- **Multi-Proveedor de IA**: Compatible con **Anthropic Claude 3.5 Sonnet**, **OpenAI GPT-4o** y un **Simulador Local Inteligente (Mock DM)** para jugar sin coste de API.

### 3. Mesa Virtual de Juego (VTT)
- Chat narrativo inmersivo con streaming y botones de acción rápida.
- Tirador de dados interactivo D20 con soporte de Ventaja / Desventaja, Inspiración Heroica y activación de maestrías.
- Panel en vivo del grupo de aventureros con barras de vida, CA y estados.
- Bitácora de campaña en tiempo real con visor del Ledger.
- Creador y visor paso a paso de fichas de personaje 2024.

---

## Estructura del Código

```
├── src/
│   ├── app/                    # Rutas y páginas Next.js
│   ├── componentes/
│   │   ├── vtt/                # Mesa virtual, chat DM y dados
│   │   ├── ficha/              # Creador de personajes paso a paso
│   │   └── compendio/          # Visor oficial de reglas 2024
│   ├── datos/
│   │   ├── clases/             # Los 12 archivos de clase modulares
│   │   ├── dotes/              # Dotes de origen, generales y épicas
│   │   ├── maestrias.ts        # Las 8 maestrías de armas
│   │   ├── condiciones.ts      # Las 15 condiciones y agotamiento
│   │   └── acciones.ts         # Las 12 acciones de combate
│   ├── esquemas/               # Validación de tipos en tiempo real con Zod
│   └── motor/
│       ├── memoria/            # LedgerEventos y Ensamblador de Prompts
│       ├── reglas/             # Fórmulas de tiradas d20, CA y modificadores
│       └── ia/                 # Cliente LLM (Claude, OpenAI, Simulador)
└── tests/                      # Suite de pruebas con Vitest
```

---

## Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Ejecutar pruebas unitarias
npm test

# 4. Verificar tipos de TypeScript
npm run typecheck

# 5. Compilar para producción
npm run build
```
