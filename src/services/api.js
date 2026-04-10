// Backend removed — all data served from local files.
// To reconnect a backend later, swap these imports for fetch/axios calls.

export async function fetchProjects() {
  const { default: projects } = await import("../data/projects");
  return projects;
}

export async function fetchSkills() {
  const { skillCategories } = await import("../data/skills");
  return skillCategories;
}

export async function fetchExperience() {
  const { education, certifications } = await import("../data/experience");
  return { education, certifications };
}

export async function submitContact(payload) {
  // No backend — open mailto as fallback
  const { personalInfo } = await import("../data/experience");
  window.location.href = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${payload.name}&body=${encodeURIComponent(payload.message)}`;
  return { success: true };
}
