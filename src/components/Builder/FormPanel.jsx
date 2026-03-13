import { useCV } from "../../context/CVContext";

const sans = "'Arial', sans-serif";

const inputStyle = {
  width: "100%",
  fontFamily: sans,
  fontSize: "13px",
  padding: "9px 12px",
  background: "#111",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  borderRadius: "6px",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const labelStyle = {
  fontFamily: sans,
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "rgba(255,255,255,0.4)",
  display: "block",
  marginBottom: "5px",
};

const sectionTitleStyle = {
  fontFamily: sans,
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  color: "#E85D26",
  margin: "0 0 14px",
  paddingBottom: "8px",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

function Field({ label, value, onChange, placeholder, multiline }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label style={labelStyle}>{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
          onFocus={e => e.target.style.borderColor = "#E85D26"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={inputStyle}
          onFocus={e => e.target.style.borderColor = "#E85D26"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
        />
      )}
    </div>
  );
}

function AddButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: sans, fontSize: "11px",
        letterSpacing: "0.14em", textTransform: "uppercase",
        padding: "8px 18px", background: "transparent",
        color: "#E85D26", border: "1px solid rgba(232,93,38,0.3)",
        cursor: "pointer", borderRadius: "6px",
        transition: "all 0.2s", marginTop: "8px",
      }}
      onMouseEnter={e => { e.currentTarget.style.background = "#E85D26"; e.currentTarget.style.color = "#fff"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#E85D26"; }}
    >
      + {label}
    </button>
  );
}

function RemoveButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: sans, fontSize: "10px",
        padding: "4px 10px", background: "transparent",
        color: "rgba(255,255,255,0.3)",
        border: "1px solid rgba(255,255,255,0.1)",
        cursor: "pointer", borderRadius: "4px",
        transition: "all 0.2s",
      }}
      onMouseEnter={e => { e.currentTarget.style.color = "#ff4444"; e.currentTarget.style.borderColor = "#ff4444"; }}
      onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
    >
      Remove
    </button>
  );
}

export default function FormPanel() {
  const {
    cvData, updatePersonal, updateSummary,
    updateSection, updateSkills,
  } = useCV();

  const { personal, summary, experience, education,
    skills, projects, certifications, languages, references } = cvData;

  /* ── Experience helpers ── */
  const addExp = () => updateSection("experience", [...experience, {
    id: Date.now().toString(), company: "", role: "",
    location: "", startDate: "", endDate: "", bullets: [""],
  }]);

  const updateExp = (id, field, val) =>
    updateSection("experience", experience.map(e => e.id === id ? { ...e, [field]: val } : e));

  const updateBullet = (expId, i, val) =>
    updateSection("experience", experience.map(e =>
      e.id === expId ? { ...e, bullets: e.bullets.map((b, bi) => bi === i ? val : b) } : e
    ));

  const addBullet = (expId) =>
    updateSection("experience", experience.map(e =>
      e.id === expId ? { ...e, bullets: [...e.bullets, ""] } : e
    ));

  const removeBullet = (expId, i) =>
    updateSection("experience", experience.map(e =>
      e.id === expId ? { ...e, bullets: e.bullets.filter((_, bi) => bi !== i) } : e
    ));

  const removeExp = (id) => updateSection("experience", experience.filter(e => e.id !== id));

  /* ── Education helpers ── */
  const addEdu = () => updateSection("education", [...education, {
    id: Date.now().toString(), institution: "", degree: "",
    location: "", startDate: "", endDate: "", note: "",
  }]);

  const updateEdu = (id, field, val) =>
    updateSection("education", education.map(e => e.id === id ? { ...e, [field]: val } : e));

  const removeEdu = (id) => updateSection("education", education.filter(e => e.id !== id));

  /* ── Project helpers ── */
  const addProj = () => updateSection("projects", [...projects, {
    id: Date.now().toString(), name: "", url: "", description: "", stack: [],
  }]);

  const updateProj = (id, field, val) =>
    updateSection("projects", projects.map(p => p.id === id ? { ...p, [field]: val } : p));

  const removeProj = (id) => updateSection("projects", projects.filter(p => p.id !== id));

  /* ── Certification helpers ── */
  const addCert = () => updateSection("certifications", [...certifications, {
    id: Date.now().toString(), name: "", issuer: "", date: "", url: "",
  }]);

  const updateCert = (id, field, val) =>
    updateSection("certifications", certifications.map(c => c.id === id ? { ...c, [field]: val } : c));

  const removeCert = (id) => updateSection("certifications", certifications.filter(c => c.id !== id));

  /* ── Language helpers ── */
  const addLang = () => updateSection("languages", [...languages, {
    id: Date.now().toString(), language: "", level: "",
  }]);

  const updateLang = (id, field, val) =>
    updateSection("languages", languages.map(l => l.id === id ? { ...l, [field]: val } : l));

  const removeLang = (id) => updateSection("languages", languages.filter(l => l.id !== id));

  return (
    <div style={{ padding: "24px 20px", overflowY: "auto", height: "100%", boxSizing: "border-box" }}>

      {/* ── PERSONAL INFO ── */}
      <h3 style={sectionTitleStyle}>Personal Info</h3>
      <Field label="Full Name" value={personal.fullName} onChange={v => updatePersonal("fullName", v)} placeholder="John Doe" />
      <Field label="Job Title" value={personal.title} onChange={v => updatePersonal("title", v)} placeholder="Frontend Developer" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <Field label="Email" value={personal.email} onChange={v => updatePersonal("email", v)} placeholder="john@email.com" />
        <Field label="Phone" value={personal.phone} onChange={v => updatePersonal("phone", v)} placeholder="+234 000 000 0000" />
        <Field label="Location" value={personal.location} onChange={v => updatePersonal("location", v)} placeholder="Lagos, Nigeria" />
        <Field label="Website" value={personal.website} onChange={v => updatePersonal("website", v)} placeholder="yoursite.com" />
        <Field label="LinkedIn" value={personal.linkedin} onChange={v => updatePersonal("linkedin", v)} placeholder="linkedin.com/in/you" />
        <Field label="GitHub" value={personal.github} onChange={v => updatePersonal("github", v)} placeholder="github.com/you" />
      </div>

      {/* ── SUMMARY ── */}
      <h3 style={{ ...sectionTitleStyle, marginTop: "24px" }}>Professional Summary</h3>
      <Field label="Summary" value={summary} onChange={updateSummary} multiline
        placeholder="Write a compelling 2–3 sentence summary of your experience and goals..." />

      {/* ── EXPERIENCE ── */}
      <h3 style={{ ...sectionTitleStyle, marginTop: "24px" }}>Work Experience</h3>
      {experience.map((exp, ei) => (
        <div key={exp.id} style={{ marginBottom: "20px", padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontFamily: sans, fontSize: "11px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Experience {ei + 1}
            </span>
            <RemoveButton onClick={() => removeExp(exp.id)} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <Field label="Job Title" value={exp.role} onChange={v => updateExp(exp.id, "role", v)} placeholder="Frontend Developer" />
            <Field label="Company" value={exp.company} onChange={v => updateExp(exp.id, "company", v)} placeholder="Company Name" />
            <Field label="Start Date" value={exp.startDate} onChange={v => updateExp(exp.id, "startDate", v)} placeholder="Jan 2022" />
            <Field label="End Date" value={exp.endDate} onChange={v => updateExp(exp.id, "endDate", v)} placeholder="Present" />
            <Field label="Location" value={exp.location} onChange={v => updateExp(exp.id, "location", v)} placeholder="Remote" />
          </div>
          <label style={{ ...labelStyle, marginTop: "10px" }}>Bullet Points</label>
          {exp.bullets.map((b, bi) => (
            <div key={bi} style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
              <input
                type="text"
                value={b}
                onChange={e => updateBullet(exp.id, bi, e.target.value)}
                placeholder={`Achievement or responsibility ${bi + 1}`}
                style={{ ...inputStyle, flex: 1 }}
                onFocus={e => e.target.style.borderColor = "#E85D26"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
              <button
                onClick={() => removeBullet(exp.id, bi)}
                style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: "16px", padding: "0 6px" }}
              >×</button>
            </div>
          ))}
          <AddButton onClick={() => addBullet(exp.id)} label="Add Bullet" />
        </div>
      ))}
      <AddButton onClick={addExp} label="Add Experience" />

      {/* ── EDUCATION ── */}
      <h3 style={{ ...sectionTitleStyle, marginTop: "24px" }}>Education</h3>
      {education.map((edu, ei) => (
        <div key={edu.id} style={{ marginBottom: "16px", padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontFamily: sans, fontSize: "11px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Education {ei + 1}
            </span>
            <RemoveButton onClick={() => removeEdu(edu.id)} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <Field label="Degree" value={edu.degree} onChange={v => updateEdu(edu.id, "degree", v)} placeholder="B.Sc. Computer Science" />
            <Field label="Institution" value={edu.institution} onChange={v => updateEdu(edu.id, "institution", v)} placeholder="University Name" />
            <Field label="Start Year" value={edu.startDate} onChange={v => updateEdu(edu.id, "startDate", v)} placeholder="2018" />
            <Field label="End Year" value={edu.endDate} onChange={v => updateEdu(edu.id, "endDate", v)} placeholder="2022" />
            <Field label="Location" value={edu.location} onChange={v => updateEdu(edu.id, "location", v)} placeholder="Nigeria" />
            <Field label="Grade / Note" value={edu.note} onChange={v => updateEdu(edu.id, "note", v)} placeholder="Second Class Upper" />
          </div>
        </div>
      ))}
      <AddButton onClick={addEdu} label="Add Education" />

      {/* ── SKILLS ── */}
      <h3 style={{ ...sectionTitleStyle, marginTop: "24px" }}>Skills</h3>
      <Field
        label="Technical Skills (comma separated)"
        value={skills.technical.join(", ")}
        onChange={v => updateSkills("technical", v.split(",").map(s => s.trim()).filter(Boolean))}
        placeholder="React, Node.js, Tailwind CSS, MongoDB"
      />
      <Field
        label="Soft Skills (comma separated)"
        value={skills.soft.join(", ")}
        onChange={v => updateSkills("soft", v.split(",").map(s => s.trim()).filter(Boolean))}
        placeholder="Communication, Problem Solving, Teamwork"
      />

      {/* ── PROJECTS ── */}
      <h3 style={{ ...sectionTitleStyle, marginTop: "24px" }}>Projects</h3>
      {projects.map((proj, pi) => (
        <div key={proj.id} style={{ marginBottom: "16px", padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontFamily: sans, fontSize: "11px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Project {pi + 1}
            </span>
            <RemoveButton onClick={() => removeProj(proj.id)} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <Field label="Project Name" value={proj.name} onChange={v => updateProj(proj.id, "name", v)} placeholder="My Project" />
            <Field label="URL" value={proj.url} onChange={v => updateProj(proj.id, "url", v)} placeholder="myproject.vercel.app" />
          </div>
          <Field label="Description" value={proj.description} onChange={v => updateProj(proj.id, "description", v)} multiline placeholder="What it does, what problem it solves..." />
          <Field
            label="Stack (comma separated)"
            value={proj.stack.join(", ")}
            onChange={v => updateProj(proj.id, "stack", v.split(",").map(s => s.trim()).filter(Boolean))}
            placeholder="React, Node.js, MongoDB"
          />
        </div>
      ))}
      <AddButton onClick={addProj} label="Add Project" />

      {/* ── CERTIFICATIONS ── */}
      <h3 style={{ ...sectionTitleStyle, marginTop: "24px" }}>Certifications</h3>
      {certifications.map((cert, ci) => (
        <div key={cert.id} style={{ marginBottom: "16px", padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontFamily: sans, fontSize: "11px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Certification {ci + 1}
            </span>
            <RemoveButton onClick={() => removeCert(cert.id)} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <Field label="Name" value={cert.name} onChange={v => updateCert(cert.id, "name", v)} placeholder="AWS Certified Developer" />
            <Field label="Issuer" value={cert.issuer} onChange={v => updateCert(cert.id, "issuer", v)} placeholder="Amazon Web Services" />
            <Field label="Date" value={cert.date} onChange={v => updateCert(cert.id, "date", v)} placeholder="2023" />
            <Field label="URL (optional)" value={cert.url} onChange={v => updateCert(cert.id, "url", v)} placeholder="credential link" />
          </div>
        </div>
      ))}
      <AddButton onClick={addCert} label="Add Certification" />

      {/* ── LANGUAGES ── */}
      <h3 style={{ ...sectionTitleStyle, marginTop: "24px" }}>Languages</h3>
      {languages.map((lang, li) => (
        <div key={lang.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "10px", marginBottom: "10px", alignItems: "end" }}>
          <Field label="Language" value={lang.language} onChange={v => updateLang(lang.id, "language", v)} placeholder="English" />
          <Field label="Level" value={lang.level} onChange={v => updateLang(lang.id, "level", v)} placeholder="Fluent" />
          <RemoveButton onClick={() => removeLang(lang.id)} />
        </div>
      ))}
      <AddButton onClick={addLang} label="Add Language" />

      {/* ── REFERENCES ── */}
      <h3 style={{ ...sectionTitleStyle, marginTop: "24px" }}>References</h3>
      <Field label="References" value={references} onChange={v => updateSection("references", v)} multiline
        placeholder="Available on request." />

      <div style={{ height: "40px" }} />
    </div>
  );
}