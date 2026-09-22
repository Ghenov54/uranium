import { getTranslations } from "next-intl/server";

/** The three real steps of working with Uranium. Order matters, so the numbers stay. */
export async function Process({ title }: { title: string }) {
  const t = await getTranslations("serviceDetail");
  const steps = [1, 2, 3].map((n) => ({ n, title: t(`step${n}Title`), desc: t(`step${n}Desc`) }));
  return (
    <section className="u-section">
      <div className="u-wrap">
        <div className="u-head">
          <h2 className="u-h2">{title}</h2>
        </div>
        <ol className="u-process">
          {steps.map((s) => (
            <li key={s.n}>
              <span className="u-process__n u-tnum">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
