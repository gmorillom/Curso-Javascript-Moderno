# Despliegue en producción de backend de proyecto

Desplegar un backend hoy en día es mucho más sencillo gracias a las plataformas PaaS (Platform as a Service), que gestionan la infraestructura por ti para que te concentres en el código.

## 1. Análisis de Plataformas de Despliegue

### Render

Es actualmente la alternativa favorita a Heroku por su generoso plan gratuito y facilidad de uso.

* Lenguajes: Node.js, Python, Ruby, Go, Rust, Elixir y Docker.
* Proceso de subida:
  1. Conecta tu cuenta de GitHub o GitLab.
  2. Selecciona "New > Web Service".
  3. Elige el repositorio de tu backend.
  4. Configura el Build Command (ej: npm install o pip install -r requirements.txt) y el Start Command (ej: node index.js o gunicorn app:app).
  5. Render detectará los cambios y desplegará automáticamente.
* Proceso de actualización: Basta con hacer un git push a la rama conectada (usualmente main). Render detecta el commit, reconstruye y despliega la nueva versión sin tiempo de inactividad (Zero downtime).

### Railway
Destaca por su velocidad y una interfaz de usuario extremadamente intuitiva. Funciona con un modelo de "pago por uso" muy económico.

* Lenguajes: Node.js, Python, Java, Go, PHP, Rust y soporte nativo para Docker.
* Proceso de subida:
  1. Crea un nuevo proyecto y conecta tu repositorio.
  2. Railway detecta automáticamente el lenguaje y configura el entorno.
  3. Si necesitas bases de datos (PostgreSQL, Redis, MySQL), las puedes añadir con un clic dentro del mismo proyecto.
  4. Proceso de actualización: Despliegue automático al hacer git push. También permite crear entornos temporales para cada Pull Request.

### Fly.io
Ideal si buscas rendimiento, ya que despliega tus aplicaciones en servidores cercanos al usuario final (Edge Computing).

* Lenguajes: Cualquier lenguaje mediante Docker. Tiene configuraciones rápidas para Node, Python, Elixir, etc.
* Proceso de subida:
  1. Instalas su CLI (flyctl).
  2. Ejecutas fly launch en la carpeta de tu proyecto.
  3. La herramienta detecta el código, crea un archivo fly.toml de configuración y prepara la base de datos si la necesitas.
  4. Ejecutas fly deploy.

* Proceso de actualización: Debes ejecutar el comando fly deploy desde tu terminal cada vez que quieras subir cambios, o configurar un GitHub Action para automatizarlo.

### DigitalOcean App Platform

Una opción robusta para proyectos que planean escalar seriamente.

* Lenguajes: Node.js, Python, Go, PHP, Ruby y Docker.
* Proceso de subida:
  1. Seleccionas "Apps" en el panel de DigitalOcean.
  2. Vinculas tu cuenta de GitHub.
  3. Configuras las variables de entorno y el plan (tienen un plan básico económico).

* Proceso de actualización: Actualización automática mediante Git. Ofrece herramientas de monitoreo más avanzadas que las opciones anteriores.

## 2. Tips Generales de Deployment y Seguridad

#### Tips de Seguridad (Indispensables)
* Variables de Entorno (.env): Jamás subas tu archivo .env al repositorio. Usa el panel de configuración de la plataforma para agregar tus API_KEYS, credenciales de BD y secretos de sesión.

* CORS (Cross-Origin Resource Sharing): Configura tu backend para que solo acepte peticiones desde el dominio donde está tu frontend. No dejes origin: '*' en producción.

* Hiding Headers: Usa librerías como helmet (en Node.js) para ocultar cabeceras que revelen qué tecnología usas (ej: X-Powered-By: Express), lo cual dificulta ataques dirigidos.

* Rate Limiting: Implementa límites de peticiones para evitar ataques de fuerza bruta o de denegación de servicio (DoS).

#### Tips de Despliegue
* Dockerización: Aunque las plataformas detecten tu lenguaje, crear un Dockerfile te da control total sobre la versión exacta de las herramientas y asegura que "si funciona en tu PC, funcione en la nube".

* Logs en tiempo real: Aprende a usar el comando de logs de cada plataforma (ej: heroku logs --tail o el panel de Render). Es tu primera línea de defensa cuando algo falla.

* Health Checks: Configura un endpoint simple (ej: /api/health) que devuelva un 200 OK. Las plataformas lo usan para saber si tu app se colgó y reiniciarla automáticamente.

## 3. Errores Comunes en el Backend (y cómo evitarlos)

#### El Error del Puerto (Routing Error)
Es el error #1. En local sueles usar el puerto 3000 o 5000, pero en la nube, la plataforma te asigna uno dinámicamente.

  * Solución: Asegúrate de que tu servidor escuche en el puerto que dicta la variable de entorno PORT.

    * Ejemplo en Node: const PORT = process.env.PORT || 3000; app.listen(PORT);

#### Dependencias Faltantes
El proyecto corre en tu máquina porque tienes librerías instaladas globalmente, pero falla en la nube.

  * Solución: Verifica que todas las librerías estén en tu package.json o requirements.txt. Las plataformas ejecutan estos archivos para construir el entorno.

#### Conexión a Base de Datos
Muchos proveedores de bases de datos gratuitos (como MongoDB Atlas o Supabase) requieren que autorices la IP que intenta conectarse.

  * Solución: Como las IPs de plataformas como Render o Heroku cambian constantemente, debes configurar el acceso a la base de datos para "Permitir acceso desde cualquier lugar" (0.0.0.0/0) o usar un Add-on de base de datos de la misma plataforma.

#### Case Sensitivity (Mayúsculas/Minúsculas)
Windows y macOS a veces ignoran las mayúsculas en los nombres de archivos, pero Linux (donde corren los servidores) no.

  * Error: Importar const User = require('./models/user') cuando el archivo se llama User.js. En local funcionará, en producción dará un "Module not found".


## 4. Variables de Entorno: Buenas Prácticas Reales
Las variables de entorno no son solo para "ocultar contraseñas", son para separar la configuración del código.

* El archivo .env.example: Siempre incluye un archivo de ejemplo en tu repositorio con los nombres de las variables pero sin los valores reales. Esto ayuda a otros desarrolladores (o a ti mismo en el futuro) a saber qué configuración se necesita.

* Jerarquía de carga: Asegúrate de que las variables del sistema (las configuraciones en el panel de la nube) siempre tengan prioridad sobre el archivo .env local.

* Validación de variables: Al iniciar la app, valida que las variables críticas existan. Si falta la DATABASE_URL, la app debería fallar inmediatamente con un error claro en lugar de comportarse de forma errática.

## 5. Hiding Headers (Ocultar Cabeceras)
El objetivo es evitar el Fingerprinting. Si un atacante sabe que usas Express 4.17.1, buscará vulnerabilidades específicas para esa versión.

#### Node.js (con Express)
La librería estándar es Helmet. Configura cabeceras de seguridad automáticamente.

~~~javascript
const express = require('express');
const helmet = require('helmet');

const app = express();

// Helmet oculta X-Powered-By y configura otras 14 cabeceras de seguridad
app.use(helmet()); 

app.get('/', (req, res) => {
  res.send('Conexión segura');
});
~~~

#### Python (con FastAPI)
FastAPI no tiene un "Helmet" oficial, pero puedes usar secure o configurar middlewares manualmente.

~~~javascript
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware

app = FastAPI()

# Middleware manual para remover cabeceras reveladoras
class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers["Server"] = "CommonServer" # Enmascarar el servidor
        response.headers.pop("X-Powered-By", None)  # Eliminar si existe
        return response

app.add_middleware(SecurityHeadersMiddleware)
~~~

## 6. Implementación de Políticas Anti-DOS (Rate Limiting)

El Denial of Service (DoS) se combate limitando cuántas peticiones puede hacer una IP en un tiempo determinado.

#### Node.js: express-rate-limit

~~~javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 peticiones por ventana
  message: "Demasiadas peticiones, intenta más tarde."
});

app.use('/api/', limiter);
~~~

#### Python: slowapi (para FastAPI)

~~~javascript
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.get("/items")
@limiter.limit("5/minute") # Máximo 5 por minuto
async def read_items():
    return {"message": "Contenido protegido"}
~~~

## 7. Manejo de Concurrencia en PaaS (Render, Railway, Heroku)

Estas plataformas manejan la concurrencia de dos formas:

1. Escalado Horizontal: Creas más "instancias" o "nodos" de tu app. La plataforma pone un Load Balancer (Balanceador de Carga) al frente que reparte el tráfico.

2. Workers y Threads (Nivel de código):

   * Node.js: Es single-threaded por naturaleza, pero usa un Event Loop. Para aprovechar CPUs multinúcleo, se usa el módulo cluster o gestores de procesos como PM2.

   * Python: Debido al GIL (Global Interpreter Lock), para manejar múltiples peticiones simultáneas se usan servidores ASGI (como uvicorn con múltiples workers) o WSGI (como gunicorn con gevent o eventlet).

## 8. Análisis Detallado: Amazon Web Services (AWS)

AWS no es una plataforma única, sino un ecosistema. Para un backend, la opción moderna y más parecida a Render es AWS App Runner.

#### Plataforma: AWS App Runner
* Lenguajes: Python, Node.js, Go, Java, PHP, Ruby y Docker.

* Proceso de subida a producción:

  * Fuente: Conectas AWS a tu repositorio de GitHub.

  * Configuración: Defines si el despliegue es basado en código o en una imagen de Docker (ECR).

  * Build: Indicas el comando de instalación y el de inicio (igual que en Render).

  * Networking: AWS genera automáticamente una URL con HTTPS.

* Proceso de actualización:

  * Puedes activar el "Automatic Deployment". Cada vez que hagas git push, App Runner descarga el código, crea un nuevo contenedor, verifica que pase el Health Check y luego redirige el tráfico de la versión vieja a la nueva.

* Tips de Seguridad en AWS:

  * IAM Roles: Nunca uses tus credenciales de administrador. Crea un "Rol" con permisos mínimos (ej: solo acceso a la base de datos RDS) y asígnalo a tu servicio App Runner.

  * AWS WAF: Puedes poner un Web Application Firewall para filtrar ataques de inyección SQL o bots antes de que lleguen a tu backend.

#### Comparativa AWS Lambda (Serverless)
Si tu backend no recibe tráfico constante, AWS Lambda es más barato (pagas por milisegundo de ejecución).

* Proceso: Subes el código (o un .zip) y AWS lo ejecuta solo cuando llega una petición HTTP a través de API Gateway.

* Limitación: Si tu proceso tarda mucho (ej: generación de reportes pesados), Lambda puede dar timeout (máximo 15 min).

#### Tips para AWS:
* Cuidado con los costos: A diferencia de Render, AWS cobra por muchos conceptos pequeños (transferencia de datos, almacenamiento de logs, backups). Monitorea siempre el Billing Dashboard.

* Infrastructure as Code (IaC): Cuando tu proyecto crezca, no configures AWS a mano. Usa herramientas como Terraform o AWS CDK para definir tu infraestructura en código.