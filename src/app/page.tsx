import Image from 'next/image';
import Navbar from '@/components/Navbar';
import ProjectShowcase from '@/components/ProjectShowcase';
import QuoteForm from '@/components/QuoteForm';
import { constructionStory, processSteps, services, visualProof, contactDetails } from '@/lib/pool-content';

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section id="inicio" className="hero">
          <Image
            src="/proyectos/cdp/hero.jpg"
            alt="Piscina terminada del Club de Playa CDP frente al mar"
            fill
            priority
            sizes="100vw"
            className="hero__image"
          />
          <div className="hero__veil" />
          <div className="hero__grain" />
          <div className="hero__content page-shell">
            <div className="hero__copy">
              <p className="eyebrow eyebrow--light"><span className="eyebrow__line" /> OCPOOL / Diseño y construcción</p>
              <h1>Albercas diseñadas para <em>durar y funcionar.</em></h1>
              <p className="hero__lede">Diseñamos y construimos albercas para residencias, hoteles y clubes de playa.</p>
              <div className="hero__actions">
                <a className="button button--light" href="#proyectos">Ver proyectos <Arrow /></a>
                <a className="button button--text-light" href="#contacto">Solicitar cotización <Arrow /></a>
              </div>
            </div>
            <div className="hero__rail">
              <div className="hero__rail-item"><strong>10+</strong><span>años de experiencia<br />del equipo</span></div>
              <div className="hero__rail-item"><strong>05</strong><span>especialidades integradas<br />en cada proyecto</span></div>
              <p className="hero__location">CDP · Islas Marías<br />Nayarit / 2024</p>
            </div>
          </div>
          <a className="hero__scroll" href="#manifiesto"><span className="hero__scroll-dot" /> Ver alcance</a>
        </section>

        <section id="manifiesto" className="manifesto page-section">
          <div className="page-shell manifesto__grid">
            <div className="manifesto__mark" aria-hidden="true">↘</div>
            <div>
              <p className="eyebrow">Alcance completo</p>
              <h2>Una sola coordinación para resolver la <em>alberca.</em></h2>
            </div>
            <div className="manifesto__body">
              <p>Definimos el diseño, la obra, el sistema hidráulico y la iluminación desde el principio. Así se reducen decisiones improvisadas y cada especialidad responde al mismo proyecto.</p>
              <p className="manifesto__aside">Cada decisión considera el uso y el mantenimiento.</p>
            </div>
          </div>
          <div className="page-shell manifesto__profile" aria-label="Tipos de proyecto">
            <article>
              <p>Residencial</p>
              <div><strong>Casas habitación</strong><span>Diseño y ejecución integrados a la arquitectura.</span></div>
            </article>
            <article>
              <p>Hospitalidad</p>
              <div><strong>Clubes de playa y hoteles</strong><span>Albercas pensadas para flujo, operación y mantenimiento.</span></div>
            </article>
            <article>
              <p>Existente</p>
              <div><strong>Rehabilitación de albercas existentes</strong><span>Corrección de acabados, equipos y funcionamiento.</span></div>
            </article>
          </div>
        </section>

        <section className="proof-section page-section page-section--mist" aria-labelledby="proof-title">
          <div className="page-shell section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow__line" /> Evidencia de ejecución</p>
              <h2 id="proof-title">La ejecución, en <em>imágenes.</em></h2>
            </div>
            <p>Fotografías de obra terminada, avances, acabados y sistemas. Una referencia concreta del nivel de ejecución de OCPOOL.</p>
          </div>
          <div className="page-shell proof-grid">
            {visualProof.map((item, index) => (
              <figure className={`proof-card proof-card--${index + 1}`} key={item.label}>
                <div className="proof-card__media"><Image src={item.src} alt={item.alt} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 25vw" className="media-cover" /></div>
                <figcaption><span>{item.label}</span><strong>{item.caption}</strong></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="proyectos" className="projects-section page-section page-section--dark">
          <div className="page-shell section-heading section-heading--dark">
            <div>
              <p className="eyebrow eyebrow--light"><span className="eyebrow__line" /> Portafolio</p>
              <h2>Proyectos residenciales y de <em>hospitalidad.</em></h2>
            </div>
            <p>Consulta obras entregadas y propuestas en desarrollo. Cada ficha indica el alcance, la ubicación y el material disponible.</p>
          </div>
          <div className="page-shell"><ProjectShowcase /></div>
        </section>

        <section className="construction-section page-section" aria-labelledby="construction-title">
          <div className="page-shell section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow__line" /> Caso CDP / Alcance</p>
              <h2 id="construction-title">Del diseño a la puesta en <em>operación.</em></h2>
            </div>
            <p>CDP permite ver tres momentos del trabajo: propuesta, construcción y entrega final. La secuencia muestra qué se resuelve en cada etapa.</p>
          </div>
          <div className="page-shell construction-grid">
            {constructionStory.map((item) => (
              <figure className="construction-card" key={item.label}>
                <div className="construction-card__media"><Image src={item.src} alt={item.alt} fill sizes="(max-width: 720px) 100vw, 33vw" className="media-cover" /></div>
                <figcaption><span>{item.label}</span><strong>{item.caption}</strong></figcaption>
              </figure>
            ))}
          </div>
          <div className="page-shell construction-hint" aria-hidden="true">Desliza para revisar propuesta, obra y entrega <span aria-hidden="true">→</span></div>
        </section>

        <section id="servicios" className="services-section page-section">
          <div className="page-shell section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow__line" /> Servicios</p>
              <h2>Resolvemos la alberca <em>completa.</em></h2>
            </div>
            <p>Integramos las especialidades que intervienen en el resultado final, desde la definición del proyecto hasta su puesta en marcha.</p>
          </div>
          <div className="page-shell services-list">
            {services.map((service) => (
              <article className="service-row" key={service.title}>
                <p className="service-row__eyebrow">{service.eyebrow}</p>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-row__media"><Image src={service.image} alt={service.imageAlt} fill sizes="90px" className="media-cover" /></div>
                <a href="#contacto" aria-label={`Cotizar ${service.title}`}><Arrow /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="process-section page-section page-section--mist">
          <div className="page-shell process-layout">
            <div className="process-intro">
              <p className="eyebrow"><span className="eyebrow__line" /> Cómo se desarrolla</p>
              <h2>Un proceso con decisiones <em>claras.</em></h2>
              <p>Antes de construir definimos alcance, sistema y prioridades. Durante la obra damos seguimiento a la ejecución y a la integración de cada especialidad.</p>
            <figure className="process-proof"><div className="process-proof__media"><Image src="/proyectos/cdp/gallery/obra-18.jpg" alt="Avance de estructura en el Club de Playa CDP" fill sizes="(max-width: 720px) 100vw, 36vw" className="media-cover" /></div><figcaption>Avance de estructura · Club de Playa CDP</figcaption></figure>
            </div>
            <div className="process-list">
              {processSteps.map((step) => (
                <article className="process-step" key={step.number}>
                  <span className="process-step__number">{step.number}</span>
                  <div><h3>{step.title}</h3><p>{step.description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="nosotros" className="about-section page-section">
          <div className="page-shell about-grid">
            <div className="about-image">
              <Image src="/proyectos/asipona/hero.png" alt="Piscina residencial ASIPONA iluminada durante la noche" fill sizes="(max-width: 800px) 100vw, 50vw" className="media-cover" />
              <span>Casa habitación ASIPONA · entrega nocturna.</span>
            </div>
            <div className="about-copy">
              <p className="eyebrow"><span className="eyebrow__line" /> OCPOOL</p>
              <h2>Un equipo técnico para proyectos <em>exigentes.</em></h2>
              <p>OCPOOL desarrolla y construye albercas para espacios residenciales y de hospitalidad. Combinamos diseño, ingeniería y ejecución para que las decisiones estéticas no queden separadas de la operación.</p>
              <div className="about-note"><strong>1</strong><span>interlocutor para<br />diseño · obra · sistemas</span></div>
              <a className="text-link" href="#contacto">Solicitar una valoración <Arrow /></a>
            </div>
          </div>
        </section>

        <section id="contacto" className="contact-section page-section page-section--sand">
          <div className="page-shell section-heading section-heading--contact">
            <div>
              <p className="eyebrow"><span className="eyebrow__line" /> Cotización</p>
              <h2>Cuéntanos qué necesitas <em>construir.</em></h2>
            </div>
            <p>Indica ubicación, tipo de obra y estado actual. Con esos datos podemos revisar el alcance y orientarte sobre la cotización.</p>
          </div>
          <div className="page-shell"><QuoteForm /></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell footer-main">
          <div className="footer-brand">
            <div className="footer-wordmark"><Image src="/brand/ocpool-logo-white.png" alt="OCPOOL" width={222} height={166} className="footer-wordmark__logo" /><span><strong>OCPOOL</strong><small>Albercas / Ingeniería</small></span></div>
            <p>Diseño, obra y sistemas coordinados.</p>
          </div>
          <div className="footer-nav">
            <p className="footer-label">Explorar</p>
            <a href="#proyectos">Proyectos</a><a href="#servicios">Servicios</a><a href="#nosotros">Nosotros</a><a href="#contacto">Cotizar</a>
          </div>
          <div className="footer-contact">
            <p className="footer-label">Contacto</p>
            <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
            <a href={contactDetails.phoneHref}>{contactDetails.phone}</a>
            <a href={contactDetails.website} target="_blank" rel="noreferrer">ocpool.com <Arrow /></a>
            <a href={contactDetails.whatsappHref} target="_blank" rel="noreferrer">WhatsApp <Arrow /></a>
          </div>
        </div>
        <div className="page-shell footer-bottom"><span>© 2026 OCPOOL</span><span>Diseño, obra y sistemas.</span></div>
      </footer>
    </>
  );
}
