const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const navMenu = document.querySelector('.mobile-nav-overlay');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                if(icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }

        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) progressBar.style.width = scrolled + '%';
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(el => observer.observe(el));

const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        
        document.querySelectorAll('.faq-question').forEach(q => {
            if(q !== question) {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = 0;
            }
        });

        question.classList.toggle('active');

        if (question.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = 0;
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.therapeutic-section .card');
    
    if(cards.length > 0) {
        const observerCards = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease, transform 0.6s ease ${index * 0.1}s`;
            
            observerCards.observe(card);
            
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                card.style.transform = 'translateY(-12px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                 card.style.transform = 'translateY(0)';
            });
        });
    }

    const contactForm = document.getElementById('contactForm');
    const statusMessage = document.getElementById('form-status');
    
    if (contactForm && statusMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerText;
            
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;
            
            statusMessage.className = 'form-status';
            statusMessage.textContent = '';

            const formData = new FormData(contactForm);
            
            fetch("https://formsubmit.co/ajax/40b29333f21e63757c548dcaec33618a", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if(data.success === "false") {
                    throw new Error(data.message);
                }
                
                statusMessage.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contato.';
                statusMessage.classList.add('visible', 'success');
                
                contactForm.reset();
                
                setTimeout(() => {
                    statusMessage.classList.remove('visible', 'success');
                }, 8000);
            })
            .catch(error => {
                console.error('Erro:', error);
                statusMessage.textContent = 'Erro ao enviar. Por favor, tente novamente ou entre em contato pelo WhatsApp.';
                statusMessage.classList.add('visible', 'error');
            })
            .finally(() => {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.mobile-nav-overlay');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); 
            navMenu.classList.toggle('active');
            
            const icon = menuToggle.querySelector('i');
            
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if(icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            document.body.style.overflow = '';
        }
    });
});

const clinicalGrid = document.getElementById('clinical-grid');
const clinicalPrevBtn = document.getElementById('clinical-prev');
const clinicalNextBtn = document.getElementById('clinical-next');

if (clinicalGrid && clinicalPrevBtn && clinicalNextBtn) {
    clinicalNextBtn.addEventListener('click', () => {
        const cardWidth = clinicalGrid.offsetWidth;
        clinicalGrid.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    clinicalPrevBtn.addEventListener('click', () => {
        const cardWidth = clinicalGrid.offsetWidth;
        clinicalGrid.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
}

const depoimentosData = [
    { name: "João Carlos", text: "A terapia me ajudou a entender minha relação com a comida e não sabia como sair do ciclo de culpa. Hoje me sinto leve e no controle." },
    { name: "Ana Souza", text: "Profissional extremamente acolhedora e ética. Me ajudou a entender que meu valor não está no meu peso. Recomendo de olhos fechados para quem busca autoconhecimento." },
    { name: "Marcos Oliveira", text: "O atendimento online funciona perfeitamente. A Izabela consegue criar um ambiente seguro mesmo à distância. As ferramentas da TCC são muito práticas para o dia a dia." }
];

let depoimentoIndex = 0;
const depoimentoAuthorEl = document.querySelector('.depoimento-author');
const depoimentoTextEl = document.querySelector('.depoimento-text');
const depoimentoPrevBtn = document.getElementById('depoimento-prevBtn');
const depoimentoNextBtn = document.getElementById('depoimento-nextBtn');

function updateDepoimentoCarousel() {
    if (!depoimentoAuthorEl || !depoimentoTextEl) return;

    depoimentoAuthorEl.classList.add('depoimento-hidden');
    depoimentoTextEl.classList.add('depoimento-hidden');

    setTimeout(() => {
        const item = depoimentosData[depoimentoIndex];
        depoimentoAuthorEl.textContent = item.name;
        depoimentoTextEl.textContent = item.text;
        
        depoimentoAuthorEl.classList.remove('depoimento-hidden');
        depoimentoTextEl.classList.remove('depoimento-hidden');
    }, 400);
}

if (depoimentoAuthorEl && depoimentoTextEl) {
    updateDepoimentoCarousel();
}

if(depoimentoPrevBtn) {
    depoimentoPrevBtn.addEventListener('click', () => {
        depoimentoIndex = (depoimentoIndex === 0) ? depoimentosData.length - 1 : depoimentoIndex - 1;
        updateDepoimentoCarousel();
    });
}

if(depoimentoNextBtn) {
    depoimentoNextBtn.addEventListener('click', () => {
        depoimentoIndex = (depoimentoIndex === depoimentosData.length - 1) ? 0 : depoimentoIndex + 1;
        updateDepoimentoCarousel();
    });
}