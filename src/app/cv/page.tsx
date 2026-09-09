import Link from "next/link";
import s from "./CV.module.scss";

function PixelArrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 11v2H4v-2zM8 13v2H6v-2zm2 2v2H8v-2zm2 2v2h-2v-2zm-4-6V9H6v2z" />
      <path d="M10 15V7H8v8zm2 2V5h-2v12z" />
    </svg>
  );
}

export default function CVPage() {
  return (
    <main className={s.page}>
      <header className={s.topbar}>
        <Link href="/#top" className={s.backLink}>
          <PixelArrow className={s.backArrow} />
          <span>Back home</span>
        </Link>
        <div className={s.status}>
          <span>CV viewer</span>
          <span>2026 model</span>
        </div>
      </header>

      <section className={s.viewerShell} aria-labelledby="cv-title">
        <div className={s.copy}>
          <span className={s.label}>Niko Dima</span>
          <h1 id="cv-title">Curriculum vitae</h1>
          <p>Experience, skills, education, and contact details in one clean document.</p>
          <div className={s.actions}>
            <a href="/Niko-Dima-CV.pdf" download="Niko-Dima-CV.pdf" className={s.primaryAction}>
              Download CV
            </a>
            <a href="/Niko-Dima-CV.pdf" target="_blank" rel="noreferrer" className={s.secondaryAction}>
              Open raw PDF
            </a>
          </div>
        </div>

        <div className={s.viewer} role="group" aria-label="Embedded CV PDF">
          <div className={s.windowBar}>
            <span>niko-dima-cv.pdf</span>
            <span aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </div>
          <object className={s.pdf} data="/Niko-Dima-CV.pdf#toolbar=0&navpanes=0" type="application/pdf">
            <p>
              The CV preview cannot load here.
              <a href="/Niko-Dima-CV.pdf" download="Niko-Dima-CV.pdf"> Download CV</a>.
            </p>
          </object>
        </div>
      </section>
    </main>
  );
}
