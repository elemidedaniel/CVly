import { useCV } from "../../context/CVContext";

export default function Executive() {
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
        padding: "16mm 18mm",
        boxSizing: "border-box",
        fontSize: "9.5pt",
        lineHeight: 1.5,
      }}
    >

      {/* ── HEADER ── */}
      <div style={{ borderBottom: `3px solid ${accentColor}`, paddingBottom: "10px", marginBottom: "18px" }}>
        <h1 style={{
          fontFamily: "'Georgia', serif",
          fontSize: "26pt", fontWeight: 700,
          color: "#1a1a1a", margin: 0, letterSpacing: "-0.5px",
          textTransform: "uppercase",
        }}>
          {personal.fullName}
        </h1>
        <p style={{ fontSize: "11pt", color: accentColor, margin: "4px 0 10px", fontStyle: "italic", fontWeight: 400 }}>
          {personal.title}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {[
            personal.email,
            personal.phone,
            personal.location,
            personal.website,
            personal.linkedin,
            personal.github,
          ].filter(Boolean).map((item, i) => (
            <span key={i} style={{ fontSize: "8.5pt", color: "#555", fontFamily: "'Arial', sans-serif" }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── SUMMARY ── */}
      {summary && (
        <Section title="Professional Summary" accentColor={accentColor}>
          <p style={{ margin: 0, color: "#333", fontFamily: "'Arial', sans-serif", fontSize: "9pt", lineHeight: 1.7 }}>
            {summary}
          </p>
        </Section>
      )}

      {/* ── EXPERIENCE ── */}
      {experience?.length > 0 && (
        <Section title="Work Experience" accentColor={accentColor}>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: "10pt", color: "#1a1a1a" }}>{exp.role}</span>
                  <span style={{ color: accentColor, margin: "0 6px", fontSize: "9pt" }}>·</span>
                  <span style={{ fontSize: "9.5pt", color: "#444", fontStyle: "italic" }}>{exp.company}</span>
                </div>
                <span style={{ fontSize: "8.5pt", color: "#777", fontFamily: "'Arial', sans-serif", whiteSpace: "nowrap" }}>
                  {exp.startDate} — {exp.endDate} {exp.location ? `| ${exp.location}` : ""}
                </span>
              </div>
              {exp.bullets?.length > 0 && (
                <ul style={{ margin: "6px 0 0 16px", padding: 0 }}>
                  {exp.bullets.map((b, i) => (
                    <li key={i} style={{ fontSize: "9pt", color: "#333", fontFamily: "'Arial', sans-serif", marginBottom: "3px", lineHeight: 1.6 }}>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ── PROJECTS ── */}
      {projects?.length > 0 && (
        <Section title="Projects" accentColor={accentColor}>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: 700, fontSize: "10pt", color: "#1a1a1a" }}>{proj.name}</span>
                {proj.url && (
                  <span style={{ fontSize: "8pt", color: accentColor, fontFamily: "'Arial', sans-serif" }}>{proj.url}</span>
                )}
              </div>
              <p style={{ margin: "4px 0 4px", fontSize: "9pt", color: "#333", fontFamily: "'Arial', sans-serif", lineHeight: 1.6 }}>
                {proj.description}
              </p>
              {proj.stack?.length > 0 && (
                <p style={{ margin: 0, fontSize: "8.5pt", color: "#777", fontFamily: "'Arial', sans-serif" }}>
                  <strong style={{ color: "#444" }}>Stack:</strong> {proj.stack.join(" · ")}
                </p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ── EDUCATION ── */}
      {education?.length > 0 && (
        <Section title="Education" accentColor={accentColor}>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: "10pt", color: "#1a1a1a" }}>{edu.degree}</span>
                  <span style={{ color: accentColor, margin: "0 6px" }}>·</span>
                  <span style={{ fontSize: "9.5pt", fontStyle: "italic", color: "#444" }}>{edu.institution}</span>
                </div>
                <span style={{ fontSize: "8.5pt", color: "#777", fontFamily: "'Arial', sans-serif" }}>
                  {edu.startDate} — {edu.endDate}
                </span>
              </div>
              {edu.note && (
                <p style={{ margin: "3px 0 0", fontSize: "9pt", color: "#555", fontFamily: "'Arial', sans-serif" }}>{edu.note}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ── SKILLS ── */}
      {(skills?.technical?.length > 0 || skills?.soft?.length > 0) && (
        <Section title="Skills" accentColor={accentColor}>
          {skills.technical?.length > 0 && (
            <div style={{ marginBottom: "6px" }}>
              <span style={{ fontWeight: 700, fontSize: "9pt", color: "#1a1a1a", fontFamily: "'Arial', sans-serif" }}>Technical: </span>
              <span style={{ fontSize: "9pt", color: "#333", fontFamily: "'Arial', sans-serif" }}>{skills.technical.join(" · ")}</span>
            </div>
          )}
          {skills.soft?.length > 0 && (
            <div>
              <span style={{ fontWeight: 700, fontSize: "9pt", color: "#1a1a1a", fontFamily: "'Arial', sans-serif" }}>Soft Skills: </span>
              <span style={{ fontSize: "9pt", color: "#333", fontFamily: "'Arial', sans-serif" }}>{skills.soft.join(" · ")}</span>
            </div>
          )}
        </Section>
      )}

      {/* ── CERTIFICATIONS ── */}
      {certifications?.length > 0 && (
        <Section title="Certifications" accentColor={accentColor}>
          {certifications.map((cert) => (
            <div key={cert.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: "9.5pt", color: "#1a1a1a" }}>{cert.name}</span>
                <span style={{ color: "#555", fontSize: "9pt", fontFamily: "'Arial', sans-serif" }}> · {cert.issuer}</span>
              </div>
              <span style={{ fontSize: "8.5pt", color: "#777", fontFamily: "'Arial', sans-serif" }}>{cert.date}</span>
            </div>
          ))}
        </Section>
      )}

      {/* ── LANGUAGES ── */}
      {languages?.length > 0 && (
        <Section title="Languages" accentColor={accentColor}>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {languages.map((lang) => (
              <span key={lang.id} style={{ fontSize: "9pt", color: "#333", fontFamily: "'Arial', sans-serif" }}>
                <strong>{lang.language}</strong> — {lang.level}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* ── REFERENCES ── */}
      {references && (
        <Section title="References" accentColor={accentColor}>
          <p style={{ margin: 0, fontSize: "9pt", color: "#555", fontFamily: "'Arial', sans-serif" }}>{references}</p>
        </Section>
      )}

    </div>
  );
}

/* ── Reusable section wrapper ── */
function Section({ title, accentColor, children }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        <h2 style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: "8.5pt", fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: accentColor,
          margin: 0, whiteSpace: "nowrap",
        }}>
          {title}
        </h2>
        <div style={{ flex: 1, height: "1px", background: "#e0e0e0" }} />
      </div>
      {children}
    </div>
  );
}