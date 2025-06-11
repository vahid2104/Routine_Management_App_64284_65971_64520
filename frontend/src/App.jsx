import { useEffect } from "react";
import api from "./utils/api";
import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";
import Header from "./components/Header.jsx";

function App() {
  useEffect(() => {
    async function fetchProjects() {
      const res = await api.get("/projects");
      const fixedProjects = res.data.map((p) => ({
        ...p,
        id: p._id,
      }));
      setProjectState((prev) => ({
        ...prev,
        projects: fixedProjects,
      }));
    }
    fetchProjects();
  }, []);

  async function handleAddProject(projectData) {
    const res = await api.post("/projects", projectData);
    const newProject = {
      ...res.data,
      id: res.data._id,
    };
    setProjectState((prev) => ({
      ...prev,
      selectedProjectId: undefined,
      projects: [...prev.projects, newProject],
    }));
  }

  async function handleDeleteProject() {
    const id = projectsState.selectedProjectId;
    await api.delete(`/projects/${id}`);
    setProjectState((prev) => ({
      ...prev,
      selectedProjectId: undefined,
      projects: prev.projects.filter((p) => p.id !== id),
      tasks: prev.tasks.filter((t) => t.projectId !== id),
    }));
  }
  async function handleSelectProject(id) {
    const res = await api.get(`/tasks/${id}`);
    setProjectState((prev) => ({
      ...prev,
      selectedProjectId: id,
      tasks: res.data,
    }));
  }
  async function handleAddTask(text) {
    const res = await api.post("/tasks", {
      text,
      projectId: projectsState.selectedProjectId,
    });
    const newTask = res.data;
    setProjectState((prev) => ({
      ...prev,
      tasks: [newTask, ...prev.tasks],
    }));
  }
  async function handleDeleteTask(id) {
    try {
      await api.delete(`/tasks/${id}`);
      setProjectState((prev) => ({
        ...prev,
        tasks: prev.tasks.filter((t) => (t._id || t.id) !== id),
      }));
    } catch (err) {
      console.error("Task isn't deleted:", err);
    }
  }

  const [projectsState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleStartAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }
  function handleCancelAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );
  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );
  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }
  return (
    <>
      <Header />
      <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar
          onStartAddProject={handleStartAddProject}
          projects={projectsState.projects}
          onSelectProject={handleSelectProject}
          selectedProjectId={projectsState.selectedProjectId}
        />
        {content}
      </main>
    </>
  );
}

export default App;
