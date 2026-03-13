import { createContext, useContext, useState } from "react";

const CVContext = createContext();

export const useCV = () => useContext(CVContext);

const defaultData = {
  personal: {
    fullName: "John,Jane Doe",
    title: "Frontend Developer",
    email: "john.doe@gmail.com",
    phone: "+234 000 000 0000",
    location: "Lagos, Nigeria",
    website: "john-doe.vercel.app",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
  },
  summary:
    "Frontend engineer with 3+ years of experience building fast, scalable, and user-focused web applications using React, Next.js, and Tailwind CSS. Passionate about clean architecture, intuitive interfaces, and shipping products that solve real problems.",
  experience: [
    {
      id: "exp1",
      company: "Freelance",
      role: "Developer",
      location: "Remote",
      startDate: "Jan 2022",
      endDate: "Present",
      bullets: [
        "Built and deployed 10+ production React applications for startups and businesses",
        "Integrated REST APIs, JWT authentication, and third-party services",
        "Reduced load times by 40% through code splitting and asset optimisation",
      ],
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "Your University",
      degree: "B.Sc. what you studied",
      location: "Nigeria",
      startDate: "2018",
      endDate: "2022",
      note: "Second Class Upper",
    },
  ],
  skills: {
    technical: ["React", "Next.js", "JavaScript", "Tailwind CSS", "Node.js", "MongoDB", "REST APIs", "Git"],
    soft: ["Problem Solving", "Communication", "Team Collaboration", "Attention to Detail"],
  },
  projects: [
    {
      id: "proj1",
      name: "Project Name",
      url: "Project URL",
      description:
        "Full-stack cryptocurrency intelligence platform with live market data, AI-powered analysis (Claude API), price alerts, portfolio tracker, and JWT authentication.",
      stack: ["React", "Node.js", "MongoDB", "Anthropic API"],
    },
    {
      id: "proj2",
      name: "Project Name",
      url: "Project URL",
      description:
        "Multi-page luxury skincare brand website with scroll-linked parallax, editorial layout, and a full custom design system.",
      stack: ["React", "Framer Motion", "Tailwind CSS"],
    },
  ],
  certifications: [
    {
      id: "cert1",
      name: "Your Certification",
      issuer: "Issuing Body",
      date: "2023",
      url: "",
    },
  ],
  languages: [
    { id: "lang1", language: "English", level: "Fluent" },
    { id: "lang2", language: "Yoruba", level: "Native" },
  ],
  references: "Available on request.",
};

export default function CVProvider({ children }) {
  const [cvData, setCVData] = useState(defaultData);
  const [activeTemplate, setActiveTemplate] = useState("executive");
  const [accentColor, setAccentColor] = useState("#E85D26");

  const updatePersonal = (field, value) =>
    setCVData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));

  const updateSummary = (value) =>
    setCVData(prev => ({ ...prev, summary: value }));

  const updateSection = (section, newArr) =>
    setCVData(prev => ({ ...prev, [section]: newArr }));

  const updateSkills = (type, value) =>
    setCVData(prev => ({ ...prev, skills: { ...prev.skills, [type]: value } }));

  return (
    <CVContext.Provider value={{
      cvData, activeTemplate, setActiveTemplate,
      accentColor, setAccentColor,
      updatePersonal, updateSummary, updateSection, updateSkills,
    }}>
      {children}
    </CVContext.Provider>
  );
}