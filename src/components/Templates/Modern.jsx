import { useCV } from "../../context/CVContext";

export default function Modern() {
  const { cvData, accentColor } = useCV();
  const { personal, summary, experience, education, skills, projects, certifications, languages, references } = cvData;

  return (
    <div
      id="cv-preview"
      style={{
        fontFamily: "'Arial', sans-serif",
        background: "#fff",
        color: "#1a1a1a",
        width: "210mm",
        minHeight: "297mm",
        boxSizing: "border-box",
        fontSize: "9.5pt",
        lineHeight: 1.5,
        display: "flex",
        flexDirection: "column",
      }}
    >

      {/* ── HEADER BAND ── */}
      <div style={{ background: accentColor, padding: "20mm 18mm 14mm", color: "#fff" }}>
        <h1 style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: "28pt", fontWeight: 800,
          color: "#fff", margin: "0 0 4px",
          letterSpacing: "-0.5px", textTransform: "uppercase",
          lineHeight: 1,
        }}>
          {personal.fullName}
        </h1>
        <p style={{ fontSize: "11pt", color: "rgba(255,255,255,0.85)", margin: "0 0 14px", fontWeight: 400, letterSpacing: "0.05em" }}>
          {personal.title}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
          {[
            { icon: "✉", val: personal.email },
            { icon: "✆", val: personal.phone },
            { icon: "⌖", val: personal.location },
            { icon: "⬡", val: personal.website },
            { icon: "in", val: personal.linkedin },
            { icon: "⌥", val: personal.github },
          ].filter(i => i.val).map((item, i) => (
            <span key={i} style={{ fontSize: "8pt", color: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ opacity: 0.7 }}>{item.icon}</span> {item.val}
            </span>
          ))}
        </div>
      </div>

      {/* ── TWO COLUMN BODY ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 0.42fr", flex: 1 }}>

        {/* ── LEFT COLUMN ── */}
        <div style={{ padding: "14mm 10mm 14mm 18mm", borderRight: "1px solid #eee" }}>

          {/* Summary */}
          {summary && (
            <ModernSection title="Profile" accentColor={accentColor}>
              <p style={{ margin: 0, color: "#444", fontSize: "9pt", lineHeight: 1.75 }}>{summary}</p>
            </ModernSection>
          )}

          {/* Experience */}
          {experience?.length > 0 && (
            <ModernSection title="Experience" accentColor={accentColor}>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: "14px", paddingLeft: "12px", borderLeft: `2px solid ${accentColor}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "4px" }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: "10pt", color: "#1a1a1a" }}>{exp.role}</p>
                      <p style={{ margin: "1px 0 0", fontSize: "9pt", color: accentColor, fontWeight: 600 }}>{exp.company}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ margin: 0, fontSize: "8pt", color: "#888" }}>{exp.startDate} — {exp.endDate}</p>
                      {exp.location && <p style={{ margin: 0, fontSize: "8pt", color: "#aaa" }}>{exp.location}</p>}
                    </div>
                  </div>
                  {exp.bullets?.length > 0 && (
                    <ul style={{ margin: "7px 0 0 14px", padding: 0 }}>
                      {exp.bullets.map((b, i) => (
                        <li key={i} style={{ fontSize: "9pt", color: "#444", marginBottom: "3px", lineHeight: 1.6 }}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </ModernSection>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <ModernSection title="Projects" accentColor={accentColor}>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: "12px", paddingLeft: "12px", borderLeft: `2px solid #eee` }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 700, fontSize: "10pt", color: "#1a1a1a" }}>{proj.name}</span>
                    {proj.url && <span style={{ fontSize: "8pt", color: accentColor }}>{proj.url}</span>}
                  </div>
                  <p style={{ margin: "4px 0 4px", fontSize: "9pt", color: "#444", lineHeight: 1.6 }}>{proj.description}</p>
                  {proj.stack?.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "5px" }}>
                      {proj.stack.map((s) => (
                        <span key={s} style={{
                          fontSize: "7.5pt", padding: "2px 8px",
                          background: `${accentColor}15`,
                          color: accentColor, borderRadius: "3px",
                          fontWeight: 600, letterSpacing: "0.04em",
                        }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </ModernSection>
          )}

        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div style={{ padding: "14mm 14mm 14mm 10mm", background: "#fafafa" }}>

          {/* Skills */}
          {(skills?.technical?.length > 0 || skills?.soft?.length > 0) && (
            <ModernSection title="Skills" accentColor={accentColor}>
              {skills.technical?.length > 0 && (
                <div style={{ marginBottom: "10px" }}>
                  <p style={{ margin: "0 0 6px", fontSize: "8pt", fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em" }}>Technical</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {skills.technical.map((s) => (
                      <span key={s} style={{
                        fontSize: "7.5pt", padding: "3px 9px",
                        background: "#fff", border: `1px solid ${accentColor}`,
                        color: accentColor, borderRadius: "3px", fontWeight: 600,
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {skills.soft?.length > 0 && (
                <div>
                  <p style={{ margin: "0 0 6px", fontSize: "8pt", fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em" }}>Soft Skills</p>
                  {skills.soft.map((s) => (
                    <p key={s} style={{ margin: "0 0 4px", fontSize: "8.5pt", color: "#444", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: accentColor, flexShrink: 0, display: "inline-block" }} />
                      {s}
                    </p>
                  ))}
                </div>
              )}
            </ModernSection>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <ModernSection title="Education" accentColor={accentColor}>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: "12px" }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: "9.5pt", color: "#1a1a1a" }}>{edu.degree}</p>
                  <p style={{ margin: "2px 0", fontSize: "9pt", color: accentColor, fontWeight: 600 }}>{edu.institution}</p>
                  <p style={{ margin: 0, fontSize: "8pt", color: "#888" }}>{edu.startDate} — {edu.endDate}</p>
                  {edu.note && <p style={{ margin: "3px 0 0", fontSize: "8.5pt", color: "#666" }}>{edu.note}</p>}
                </div>
              ))}
            </ModernSection>
          )}

          {/* Certifications */}
          {certifications?.length > 0 && (
            <ModernSection title="Certifications" accentColor={accentColor}>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: "8px" }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: "9pt", color: "#1a1a1a" }}>{cert.name}</p>
                  <p style={{ margin: "2px 0 0", fontSize: "8.5pt", color: "#666" }}>{cert.issuer} · {cert.date}</p>
                </div>
              ))}
            </ModernSection>
          )}

          {/* Languages */}
          {languages?.length > 0 && (
            <ModernSection title="Languages" accentColor={accentColor}>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span style={{ fontSize: "9pt", color: "#333", fontWeight: 600 }}>{lang.language}</span>
                  <span style={{ fontSize: "8.5pt", color: "#888" }}>{lang.level}</span>
                </div>
              ))}
            </ModernSection>
          )}

          {/* References */}
          {references && (
            <ModernSection title="References" accentColor={accentColor}>
              <p style={{ margin: 0, fontSize: "9pt", color: "#666" }}>{references}</p>
            </ModernSection>
          )}

        </div>
      </div>
    </div>
  );
}

function ModernSection({ title, accentColor, children }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
        <div style={{ width: "4px", height: "14px", background: accentColor, borderRadius: "2px", flexShrink: 0 }} />
        <h2 style={{
          fontSize: "8.5pt", fontWeight: 800,
          textTransform: "uppercase", letterSpacing: "0.14em",
          color: "#1a1a1a", margin: 0,
        }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}