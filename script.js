// ============================================
// 1. NAVBAR CON EFECTO AL SCROLL
// ============================================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// 2. EFECTO DE ESCRITURA (TYPING)
// ============================================
const palabras = ['sin estrés', 'más rápido', 'como un pro', 'fácil'];
let indicePalabra = 0;
let indiceLetra = 0;
let borrando = false;
const typingElement = document.getElementById('typing');

function escribirEfecto() {
    const palabraActual = palabras[indicePalabra];
    
    if (!borrando && indiceLetra <= palabraActual.length) {
        typingElement.textContent = palabraActual.substring(0, indiceLetra);
        indiceLetra++;
    } else if (borrando && indiceLetra >= 0) {
        typingElement.textContent = palabraActual.substring(0, indiceLetra);
        indiceLetra--;
    }
    
    if (indiceLetra === palabraActual.length + 1) {
        borrando = true;
        setTimeout(() => {}, 1500);
    } else if (indiceLetra === -1) {
        borrando = false;
        indicePalabra = (indicePalabra + 1) % palabras.length;
    }
    
    setTimeout(escribirEfecto, borrando ? 100 : 200);
}

escribirEfecto();

// ============================================
// 3. CONTADORES (ANIMACIÓN AL HACER SCROLL)
// ============================================
const contadores = document.querySelectorAll('.stat-number');
let contadoresActivados = false;

function activarContadores() {
    if (contadoresActivados) return;
    
    contadores.forEach(contador => {
        const objetivo = parseInt(contador.getAttribute('data-target'));
        let actual = 0;
        const incremento = objetivo / 50;
        
        const actualizarContador = () => {
            actual += incremento;
            if (actual < objetivo) {
                contador.textContent = Math.floor(actual);
                requestAnimationFrame(actualizarContador);
            } else {
                contador.textContent = objetivo;
            }
        };
        actualizarContador();
    });
    contadoresActivados = true;
}

window.addEventListener('scroll', () => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const posicion = heroStats.getBoundingClientRect();
        if (posicion.top < window.innerHeight - 100) {
            activarContadores();
        }
    }
});

// ============================================
// 4. SIMULADOR DE AHORRO (INTERACTIVO)
// ============================================
const ingresoSlider = document.getElementById('ingreso');
const ingresoValue = document.getElementById('ingresoValue');
const ahorroSlider = document.getElementById('ahorroPorcentaje');
const ahorroValue = document.getElementById('ahorroValue');
const ahorroMensual = document.getElementById('ahorroMensual');
const ahorroAnual = document.getElementById('ahorroAnual');
const barraGastos = document.querySelector('.barra-gastos');
const barraAhorro = document.querySelector('.barra-ahorro');

function actualizarSimulador() {
    const ingreso = parseInt(ingresoSlider.value);
    const porcentaje = parseInt(ahorroSlider.value);
    
    ingresoValue.textContent = `$${ingreso.toLocaleString()}`;
    ahorroValue.textContent = `${porcentaje}%`;
    
    const ahorro = ingreso * (porcentaje / 100);
    const gastos = ingreso - ahorro;
    
    ahorroMensual.textContent = `$${ahorro.toLocaleString()}`;
    ahorroAnual.textContent = `$${(ahorro * 12).toLocaleString()}`;
    
    const total = ingreso;
    const porcentajeGastos = (gastos / total) * 100;
    const porcentajeAhorro = (ahorro / total) * 100;
    
    barraGastos.style.width = `${porcentajeGastos}%`;
    barraAhorro.style.width = `${porcentajeAhorro}%`;
}

ingresoSlider.addEventListener('input', actualizarSimulador);
ahorroSlider.addEventListener('input', actualizarSimulador);
actualizarSimulador();

// ============================================
// 5. VALIDACIÓN DE FORMULARIO EN VIVO
// ============================================
const form = document.getElementById('contactForm');
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const errorNombre = document.getElementById('errorNombre');
const errorEmail = document.getElementById('errorEmail');
const formContainer = document.querySelector('.form-container');
const successDiv = document.getElementById('formSuccess');

function validarNombre() {
    const nombre = nombreInput.value.trim();
    if (nombre.length < 2) {
        errorNombre.textContent = 'Nombre debe tener al menos 2 caracteres';
        nombreInput.classList.add('error');
        return false;
    }
    errorNombre.textContent = '';
    nombreInput.classList.remove('error');
    return true;
}

function validarEmail() {
    const email = emailInput.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        errorEmail.textContent = 'Email inválido (ejemplo@email.com)';
        emailInput.classList.add('error');
        return false;
    }
    errorEmail.textContent = '';
    emailInput.classList.remove('error');
    return true;
}

nombreInput.addEventListener('input', validarNombre);
emailInput.addEventListener('input', validarEmail);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombreValido = validarNombre();
    const emailValido = validarEmail();
    
    if (nombreValido && emailValido) {
        form.style.display = 'none';
        successDiv.classList.remove('hidden');
        
        // Resetear después de 3 segundos (opcional)
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successDiv.classList.add('hidden');
        }, 3000);
    }
});

// ============================================
// 6. MENÚ HAMBURGUESA PARA MÓVIL
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// ============================================
// 7. SMOOTH SCROLL PARA ANCLAS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});