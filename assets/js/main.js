// ============================================================
// MAIN.JS - Scripts globales del portal
// ============================================================

/**
 * Datos de dashboards disponibles
 * Estructura: Array de objetos con información de cada análisis
 */
const dashboards = [
    {
        id: 'tipo-cambio-2026',
        title: 'Tipo de Cambio USD/GTQ',
        category: 'Análisis Cambiario',
        description: 'Análisis detallado de la evolución del tipo de cambio del dólar americano frente al quetzal guatemalteco de enero a mayo 2026. Incluye tendencias diarias, indicadores KPI y proyecciones.',
        date: '29 de mayo 2026',
        icon: '📊',
        tags: ['Tipo de Cambio', 'Quetzal', 'Dólar'],
        url: 'dashboards/tipo-cambio-2026/',
        dataPoints: 149,
        updated: '2026-05-29'
    },
    {
        id: 'inflacion-2026',
        title: 'Índice de Inflación',
        category: 'Precios al Consumidor',
        description: 'Seguimiento mensual de la inflación en Guatemala. Análisis de variación de precios por categoría y su impacto en el poder de compra.',
        date: 'Próximamente',
        icon: '📈',
        tags: ['Inflación', 'Precios', 'IPC'],
        url: '#',
        dataPoints: 0,
        updated: null
    },
    {
        id: 'reservas-internacionales',
        title: 'Reservas Internacionales',
        category: 'Finanzas Internacionales',
        description: 'Evolución de las reservas internacionales de Guatemala y su relación con la estabilidad cambiaria y crediticia del país.',
        date: 'Próximamente',
        icon: '💰',
        tags: ['Reservas', 'Divisas', 'Estabilidad'],
        url: '#',
        dataPoints: 0,
        updated: null
    }
];

/**
 * Renderizar tarjetas de dashboards
 */
function renderDashboards() {
    const container = document.getElementById('dashboardsGrid');
    if (!container) return;
    
    container.innerHTML = dashboards.map(dashboard => `
        <div class="dashboard-card">
            <div class="dashboard-thumbnail">
                <span>${dashboard.icon}</span>
            </div>
            <div class="dashboard-info">
                <span class="dashboard-category">${dashboard.category}</span>
                <h3 class="dashboard-title">${dashboard.title}</h3>
                <p class="dashboard-description">${dashboard.description}</p>
                <div class="dashboard-meta">
                    <div class="dashboard-meta-item">
                        <i class="fas fa-calendar"></i>
                        <span>${dashboard.date}</span>
                    </div>
                    ${dashboard.dataPoints > 0 ? `
                        <div class="dashboard-meta-item">
                            <i class="fas fa-database"></i>
                            <span>${dashboard.dataPoints} puntos</span>
                        </div>
                    ` : ''}
                </div>
                ${
                    dashboard.url !== '#' 
                    ? `<a href="${dashboard.url}" class="dashboard-link"><i class="fas fa-arrow-right"></i> Ver Análisis</a>`
                    : `<a href="#" class="dashboard-link" style="opacity: 0.5; cursor: not-allowed;"><i class="fas fa-hourglass-end"></i> Próximamente</a>`
                }
            </div>
        </div>
    `).join('');
    
    // Actualizar contador de dashboards publicados
    const publishedCount = dashboards.filter(d => d.url !== '#').length;
    const dashCount = document.getElementById('dashCount');
    if (dashCount) {
        dashCount.textContent = publishedCount;
    }
}

/**
 * Navegación activa en navbar
 */
function setActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = ['inicio', 'dashboards', 'acerca'];
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section && window.scrollY >= section.offsetTop - 100) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Manejar envío de newsletter
 */
function handleNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        // Validación básica
        if (!email) {
            alert('Por favor ingresa tu correo electrónico');
            return;
        }
        
        // Aquí iría la lógica de suscripción (API call)
        // Por ahora, solo mostramos un mensaje
        alert(`¡Gracias por suscribirse! Confirma tu email: ${email}`);
        form.reset();
    });
}

/**
 * Animar números en estadísticas
 */
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                
                // Solo animar si es un número
                if (text.match(/^\d+$/)) {
                    const target = parseInt(text);
                    let current = 0;
                    const increment = Math.ceil(target / 30);
                    
                    const interval = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            element.textContent = target;
                            clearInterval(interval);
                        } else {
                            element.textContent = current;
                        }
                    }, 20);
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(num => observer.observe(num));
}

/**
 * Scroll suave para enlaces internos
 */
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return; // Evitar scroll en links vacíos
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Detectar prefers-color-scheme (para futuras mejoras dark mode)
 */
function detectColorScheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Dark mode detectado
        document.body.classList.add('dark-mode');
    }
}

/**
 * Inicialización del portal
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portal de Análisis Económico - Iniciando...');
    
    // Ejecutar funciones de inicialización
    renderDashboards();
    setActiveNav();
    handleNewsletterForm();
    animateStats();
    smoothScroll();
    detectColorScheme();
    
    console.log('✅ Portal cargado correctamente');
    console.log(`📊 ${dashboards.length} dashboards disponibles`);
});

/**
 * Función de ayuda para agregar nuevos dashboards
 * Uso: addDashboard({ id: 'new-dash', title: 'Título', ... })
 */
function addDashboard(dashboardData) {
    dashboards.push(dashboardData);
    renderDashboards();
    console.log(`✅ Dashboard "${dashboardData.title}" agregado`);
}