import React from "react";
import { Github, Link2, BookOpen, Video } from "lucide-react";

type Resource = {
  title: string;
  description: string;
  type: "github" | "link" | "article" | "video";
  url: string;
};

const data: Resource[] = [
  {
    title: "GitHub - Club Projects",
    description: "Tous les projets open source du club",
    type: "github",
    url: "https://github.com/ton-club",
  },
  {
    title: "Hackathon Event 2025",
    description: "Participer au prochain hackathon organisé par le club",
    type: "link",
    url: "https://hackathon-club.com",
  },
  {
    title: "Article - Lancer un projet open source",
    description: "Guide étape par étape pour lancer un projet GitHub",
    type: "article",
    url: "https://dev.to/guide-open-source",
  },
  {
    title: "Replay - Conférence DevFest",
    description: "Vidéo de la conférence organisée par le club",
    type: "video",
    url: "https://youtube.com/devfest-club",
  },
];

const getIcon = (type: Resource["type"]) => {
  switch (type) {
    case "github":
      return <Github className="text-gray-700" />;
    case "link":
      return <Link2 className="text-blue-600" />;
    case "article":
      return <BookOpen className="text-green-600" />;
    case "video":
      return <Video className="text-red-600" />;
    default:
      return null;
  }
};

const Ressources = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📚 Ressources du Club</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((res, index) => (
          <a
            key={index}
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-4 bg-white rounded-xl shadow hover:shadow-md transition"
          >
            <div className="flex-shrink-0">{getIcon(res.type)}</div>
            <div>
              <h3 className="text-lg font-semibold">{res.title}</h3>
              <p className="text-sm text-gray-600">{res.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Ressources;
