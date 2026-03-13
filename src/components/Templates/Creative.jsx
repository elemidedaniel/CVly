import { useCV } from "../../context/CVContext";

export default function Creative() {
  const { cvData, accentColor } = useCV();
  const { personal, summary, experience, education, skills, projects, certifications, languages, references } = cvData;

  return (
    <div
      id="cv-preview"
      style={{
        fontFamily: "'Georgia', serif",
        background: "#fff",
        color: "#1a1a1a",
        width: "210mm",
        minHeight: "297mm",
        boxSizing: "border-box",
        fontSize: "9.5pt",
        lineHeight: 1.5,
        display: "grid",
        gridTemplateColumns: "0.38fr 1fr",
      }}
    >

      {/* ── LEFT SIDEBAR ── */}
      <div style={{ background: "#1a1a1a", padding: "14mm 10mm", color: "#fff", minHeight: "297mm" }}>

        {/* Name */}
        <div style={{ marginBottom: "20px", paddingBottom: "16px", borderBottom: `2px solid ${accentColor}` }}>
          <h1 style={{
            fontFamily: "'Georgia', serif",
            fontSize: "16pt", fontWeight: 700,
            color: "#fff", margin: "0 0 6px",
            lineHeight: 1.1, letterSpacing: "-0.3px",
          }}>
            {personal.fullName}
          </h1>
          <p style={{ fontSize: "9pt", color: accentColor, margin: 0, fontStyle: "italic", letterSpacing: "0.05em" }}>
            {personal.title}
          </p>
        </div>

        {/* Contact */}
        <CreativeSideSection title="Contact" accentColor={accentColor}>
          {[
            { label: "Email", val: personal.email },
            { label: "Phone", val: personal.phone },
            { label: "Location", val: personal.location },
            { label: "Web", val: personal.website },
            { label: "LinkedIn", val: personal.linkedin },
            { label: "GitHub", val: personal.github },
          ].filter(i => i.val).map((item) => (
            <div key={item.label} style={{ marginBottom: "7px" }}>
              <p style={{ margin: 0, fontSize: "7pt", color: accentColor, textTransform: "uppercase", letterSpacing: "0.14em", fontFamily: "'Arial', sans-serif" }}>
                {item.label}
              </p>
              <p style={{ margin: "1px 0 0", fontSize: "8pt", color: "rgba(255,255,255,0.75)", fontFamily: "'Arial', sans-serif", wordBreak: "break-all" }}>
                {item.val}
              </p>
            </div>
          ))}
        </CreativeSideSection>

        {/* Skills */}
        {(skills?.technical?.length > 0 || skills?.soft?.length > 0) && (
          <CreativeSideSection title="Skills" accentColor={accentColor}>
            {skills.technical?.length > 0 && (
              <div style={{ marginBottom: "10px" }}>
                <p style={{ margin: "0 0 6px", fontSize: "7pt", color: accentColor, textTransform: "uppercase", letterSpacing: "0.14em", fontFamily: "'Arial', sans-serif" }}>
                  Technical
                </p>
                {skills.technical.map((s) => (
                  <div key={s} style={{ marginBottom: "4px" }}>
                    <p style={{ margin: 0, fontSize: "8.5pt", color: "rgba(255,255,255,0.8)", fontFamily: "'Arial', sans-serif" }}>{s}</p>
                    <div style={{ height: "2px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", marginTop: "3px" }}>
                      <div style={{ height: "100%", width: "85%", background: accentColor, borderRadius: "2px" }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {skills.soft?.length > 0 && (
              <div>
                <p style={{ margin: "0 0 6px", fontSize: "7pt", color: accentColor, textTransform: "uppercase", letterSpacing: "0.14em", fontFamily: "'Arial', sans-serif" }}>
                  Soft Skills
                </p>
                {skills.soft.map((s) => (
                  <p key={s} style={{ margin: "0 0 4px", fontSize: "8.5pt", color: "rgba(255,255,255,0.7)", fontFamily: "'Arial', sans-serif", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: accentColor, flexShrink: 0, display: "inline-block" }} />
                    {s}
                  </p>
                ))}
              </div>
            )}
          </CreativeSideSection>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <CreativeSideSection title="Education" accentColor={accentColor}>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: "12px" }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: "9pt", color: "#fff", fontFamily: "'Arial', sans-serif" }}>{edu.degree}</p>
                <p style={{ margin: "2px 0", fontSize: "8.5pt", color: accentColor, fontFamily: "'Arial', sans-serif" }}>{edu.institution}</p>
                <p style={{ margin: 0, fontSize: "8pt", color: "rgba(255,255,255,0.5)", fontFamily: "'Arial', sans-serif" }}>
                  {edu.startDate} — {edu.endDate}
                </p>
                {edu.note && <p style={{ margin: "3px 0 0", fontSize: "8pt", color: "rgba(255,255,255,0.55)", fontFamily: "'Arial', sans-serif" }}>{edu.note}</p>}
              </div>
            ))}
          </CreativeSideSection>
        )}

        {/* Languages */}
        {languages?.length > 0 && (
          <CreativeSideSection title="Languages" accentColor={accentColor}>
            {languages.map((lang) => (
              <div key={lang.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <span style={{ fontSize: "9pt", color: "#fff", fontFamily: "'Arial', sans-serif" }}>{lang.language}</span>
                <span style={{ fontSize: "8pt", color: accentColor, fontFamily: "'Arial', sans-serif" }}>{lang.level}</span>
              </div>
            ))}
          </CreativeSideSection>
        )}

        {/* Certifications */}
        {certifications?.length > 0 && (
          <CreativeSideSection title="Certifications" accentColor={accentColor}>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: "8px" }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: "8.5pt", color: "#fff", fontFamily: "'Arial', sans-serif" }}>{cert.name}</p>
                <p style={{ margin: "2px 0 0", fontSize: "8pt", color: "rgba(255,255,255,0.55)", fontFamily: "'Arial', sans-serif" }}>{cert.issuer} · {cert.date}</p>
              </div>
            ))}
          </CreativeSideSection>
        )}

      </div>

      {/* ── RIGHT MAIN CONTENT ── */}
      <div style={{ padding: "14mm 16mm 14mm 12mm" }}>

        {/* Summary */}
        {summary && (
          <CreativeMainSection title="About Me" accentColor={accentColor}>
            <p style={{ margin: 0, color: "#444", fontSize: "9.5pt", lineHeight: 1.8, fontStyle: "italic" }}>
              {summary}
            </p>
          </CreativeMainSection>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <CreativeMainSection title="Experience" accentColor={accentColor}>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: "16px", position: "relative", paddingLeft: "14px" }}>
                <div style={{
                  position: "absolute", left: 0, top: "4px",
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: accentColor, flexShrink: 0,
                }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2px" }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: "10.5pt", color: "#1a1a1a", fontFamily: "'Arial', sans-serif" }}>{exp.role}</p>
                    <p style={{ margin: "1px 0 0", fontSize: "9pt", color: accentColor, fontFamily: "'Arial', sans-serif", fontWeight: 600 }}>{exp.company}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ margin: 0, fontSize: "8pt", color: "#999", fontFamily: "'Arial', sans-serif" }}>
                      {exp.startDate} — {exp.endDate}
                    </p>
                    {exp.location && <p style={{ margin: 0, fontSize: "8pt", color: "#bbb", fontFamily: "'Arial', sans-serif" }}>{exp.location}</p>}
                  </div>
                </div>
                {exp.bullets?.length > 0 && (
                  <ul style={{ margin: "7px 0 0 14px", padding: 0 }}>
                    {exp.bullets.map((b, i) => (
                      <li key={i} style={{ fontSize: "9pt", color: "#444", marginBottom: "3px", lineHeight: 1.65, fontFamily: "'Arial', sans-serif" }}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </CreativeMainSection>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <CreativeMainSection title="Projects" accentColor={accentColor}>
            {projects.map((proj) => (
              <div key={proj.id} style={{
                marginBottom: "12px", padding: "10px 12px",
                background: "#fafafa", borderRadius: "4px",
                borderLeft: `3px solid ${accentColor}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: "10pt", color: "#1a1a1a", fontFamily: "'Arial', sans-serif" }}>{proj.name}</span>
                  {proj.url && <span style={{ fontSize: "8pt", color: accentColor, fontFamily: "'Arial', sans-serif" }}>{proj.url}</span>}
                </div>
                <p style={{ margin: "5px 0 6px", fontSize: "9pt", color: "#444", lineHeight: 1.65, fontFamily: "'Arial', sans-serif" }}>{proj.description}</p>
                {proj.stack?.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {proj.stack.map((s) => (
                      <span key={s} style={{
                        fontSize: "7.5pt", padding: "2px 8px",
                        background: `${accentColor}18`,
                        color: accentColor, borderRadius: "3px",
                        fontWeight: 700, fontFamily: "'Arial', sans-serif",
                        letterSpacing: "0.04em",
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CreativeMainSection>
        )}

        {/* References */}
        {references && (
          <CreativeMainSection title="References" accentColor={accentColor}>
            <p style={{ margin: 0, fontSize: "9pt", color: "#666", fontFamily: "'Arial', sans-serif" }}>{references}</p>
          </CreativeMainSection>
        )}

      </div>
    </div>
  );
}

function CreativeSideSection({ title, accentColor, children }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
        <h2 style={{
          fontSize: "7.5pt", fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0.18em",
          color: accentColor, margin: 0, fontFamily: "'Arial', sans-serif",
        }}>
          {title}
        </h2>
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
      </div>
      {children}
    </div>
  );
}

function CreativeMainSection({ title, accentColor, children }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
        <h2 style={{
          fontSize: "8.5pt", fontWeight: 800,
          textTransform: "uppercase", letterSpacing: "0.16em",
          color: "#1a1a1a", margin: 0, fontFamily: "'Arial', sans-serif",
        }}>
          {title}
        </h2>
        <div style={{ flex: 1, height: "1px", background: "#e8e8e8" }} />
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: accentColor, flexShrink: 0 }} />
      </div>
      {children}
    </div>
  );
}