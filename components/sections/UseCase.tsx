// URL del video: pegar embed de YouTube ("https://www.youtube.com/embed/ID")
// o Vimeo ("https://player.vimeo.com/video/ID"), o dejar vacío para mostrar placeholder.
const VIDEO_URL = "";

const TEXT = {
  title:    "Caso de uso",
  subtitle: "Así vive una familia con HUMANS",
  body:     "María cuida a su padre de 78 años desde 40 km de distancia. Con HUMANS, recibe una alerta en el móvil en el momento en que sus constantes vitales cambian — sin llamadas de alarma, sin visitas innecesarias. Actúa cuando importa, no cuando ya es tarde.",
};

export function UseCase() {
  return (
    <section id="caso-de-uso" className="bg-gradient-to-br from-[#3a0068] to-[#7209b7] py-20 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Cabecera */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {TEXT.title}
          </h2>
          <p className="mt-3 text-white/80 text-xl font-medium">
            {TEXT.subtitle}
          </p>
          <p className="mt-4 text-white/65 text-base leading-relaxed max-w-2xl mx-auto">
            {TEXT.body}
          </p>
        </div>

        {/* Bloque de video */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black/40">
          {VIDEO_URL ? (
            <iframe
              src={VIDEO_URL}
              title="Caso de uso HUMANS"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/40">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l-6.75-3.897v10.794l6.75-3.897z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">Video próximamente</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
