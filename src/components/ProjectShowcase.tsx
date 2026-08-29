'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { projects, type Project } from '@/lib/pool-content';

type ProjectFilter = 'Todos' | 'Entregados' | 'Con etapas' | 'En desarrollo';

const filters: ProjectFilter[] = ['Todos', 'Entregados', 'Con etapas', 'En desarrollo'];

function matchesFilter(project: Project, filter: ProjectFilter) {
  if (filter === 'Todos') return true;
  if (filter === 'Entregados') return project.status === 'Entregado';
  if (filter === 'En desarrollo') return project.status === 'En desarrollo';
  return project.phases.length > 1;
}

function getCardLayout(index: number) {
  const position = index % 3;
  if (position === 0) return 'project-card--wide';
  if (position === 1) return 'project-card--compact';
  return '';
}

function ProjectCard({ project, index, featured, onOpen }: { project: Project; index: number; featured: boolean; onOpen: (project: Project, button: HTMLButtonElement) => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -50px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const revealStyle = { '--reveal-delay': `${Math.min(index * 70, 360)}ms` } as CSSProperties;

  if (featured) {
    return (
      <article ref={cardRef} style={revealStyle} className={`project-card project-card--featured reveal-item ${isVisible ? 'reveal-item--visible' : ''}`}>
        <div className="project-card__feature-media">
          <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 800px) 100vw, 66vw" className="media-cover" />
          <div className="project-card__feature-stamp"><span>01</span><span>Caso documentado</span></div>
          <div className="project-card__feature-caption">CDP: de la propuesta a la entrega.</div>
        </div>
        <div className="project-card__feature-panel">
          <div className="project-card__feature-meta"><span>{project.category}</span><span>{project.status}</span></div>
          <p className="project-card__location">{project.location} · {project.year}</p>
          <h3>{project.title}</h3>
          <p className="project-card__summary">{project.summary}</p>
          <div className="project-card__phase-line">
            <span>Registro incluido</span>
            <ol>
              {project.phases.map((phase, phaseIndex) => (
                <li key={phase.label}><b>{String(phaseIndex + 1).padStart(2, '0')}</b>{phase.label}</li>
              ))}
            </ol>
          </div>
          <button className="text-link" type="button" onClick={(event) => onOpen(project, event.currentTarget)}>
            Ver ficha del proyecto <span className="arrow" aria-hidden="true">↗</span>
          </button>
        </div>
      </article>
    );
  }

  return (
    <article ref={cardRef} style={revealStyle} className={`project-card ${getCardLayout(index)} reveal-item ${isVisible ? 'reveal-item--visible' : ''}`}>
      <div className="project-card__media">
        <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 800px) 100vw, 33vw" className="media-cover" />
        <div className="project-card__shade" />
        <div className="project-card__topline"><span>{project.category}</span><span>{project.status}</span></div>
        <div className="project-card__copy">
          <p className="project-card__location">{project.location} {project.year !== '—' ? `· ${project.year}` : ''}</p>
          <h3>{project.title}</h3>
          <p className="project-card__summary">{project.summary}</p>
          <button className="text-link text-link--light" type="button" onClick={(event) => onOpen(project, event.currentTarget)}>
            Ver ficha del proyecto <span className="arrow" aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ProjectShowcase() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('Todos');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const visibleProjects = projects.filter((project) => matchesFilter(project, activeFilter));

  const closeProject = () => {
    setActiveProject(null);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  };

  useEffect(() => {
    if (!activeProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeProject();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProject]);

  const openProject = (project: Project, button: HTMLButtonElement) => {
    triggerRef.current = button;
    setActiveProject(project);
  };

  return (
    <div className="project-showcase">
      <div className="project-index-bar"><span>Selecciona una ficha para revisar imágenes, alcance y referencias</span><span aria-live="polite">{String(visibleProjects.length).padStart(2, '0')} fichas</span></div>
      <div className="project-filters" role="group" aria-label="Filtrar proyectos">
        {filters.map((filter) => (
          <button key={filter} type="button" className={`filter-button ${activeFilter === filter ? 'filter-button--active' : ''}`} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
            {filter}
          </button>
        ))}
      </div>

      <div className="project-grid" key={activeFilter}>
        {visibleProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} featured={activeFilter === 'Todos' && index === 0} onOpen={openProject} />
        ))}
      </div>

      {visibleProjects.length === 0 && <p className="project-empty">No hay casos publicados en esta categoría.</p>}

      {activeProject && (
        <div className="project-dialog-layer" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeProject();
        }}>
          <section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby={`project-dialog-title-${activeProject.id}`} onMouseDown={(event) => event.stopPropagation()}>
            <div className="project-dialog__header">
              <div>
                <p className="section-kicker section-kicker--dark">{activeProject.category} / {activeProject.status}</p>
                <h2 id={`project-dialog-title-${activeProject.id}`}>{activeProject.title}</h2>
                <p>{activeProject.location} {activeProject.year !== '—' ? `· ${activeProject.year}` : ''}</p>
              </div>
              <button ref={closeButtonRef} className="dialog-close" type="button" onClick={closeProject} aria-label="Cerrar proyecto"><span aria-hidden="true">×</span></button>
            </div>
            <div className="project-dialog__body">
              <div className="project-dialog__intro"><p>{activeProject.summary}</p><div className="capability-list" aria-label="Capacidades del proyecto">{activeProject.capabilities.map((capability) => <span key={capability}>{capability}</span>)}</div></div>
              <div className="phase-list">{activeProject.phases.map((phase) => <figure className="project-dialog__phase" key={phase.label}><div className="project-dialog__phase-media"><Image src={phase.image} alt={phase.alt} fill sizes="(max-width: 800px) 100vw, 45vw" className="media-cover" /></div><figcaption><span>{phase.label}</span><span aria-hidden="true">↗</span></figcaption></figure>)}</div>
              <div className="gallery-heading"><p className="section-kicker section-kicker--dark">Registro del proyecto</p><span>{activeProject.gallery.length} vistas disponibles</span></div>
              <div className="project-gallery" aria-label={`Registro visual de ${activeProject.title}`}>
                {activeProject.gallery.map((media) => (
                  <figure className={`project-gallery__item project-gallery__item--${media.kind}`} key={media.src}>
                    <div className="project-gallery__media"><Image src={media.src} alt={media.alt} fill sizes="(max-width: 800px) 100vw, 33vw" className="media-cover" /></div>
                    <figcaption><span>{media.label}</span><span aria-hidden="true">↗</span></figcaption>
                  </figure>
                ))}
              </div>
              <a className="button button--dark" href="#contacto" onClick={closeProject}>Solicitar un proyecto similar <span aria-hidden="true">↗</span></a>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
