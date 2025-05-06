import React from "react";
import { Book, Image, FileText, Video } from "lucide-react"; // Clearer icon choices
import { useNavigate, useParams } from "react-router-dom";

type Resource = {
  title: string;
  description: string;
  type: "guide" | "multimedia" | "reglement" | "tutoriel";
};

const data: Resource[] = [
  {
    title: "Guide - Club Handbook",
    description: "All club guides are available here",
    type: "guide",
  },
  {
    title: "Multimedia Resources",
    description: "Access all multimedia files",
    type: "multimedia",
  },
  {
    title: "Regulations - Club Rules",
    description: "Review all regulations for our club",
    type: "reglement",
  },
  {
    title: "Replay - DevFest Conference",
    description: "Watch the conference video organized by the club",
    type: "tutoriel",
  },
];

const getIcon = (type: Resource["type"]) => {
  switch (type) {
    case "guide":
      return <Book className="text-purple-700" />;
    case "multimedia":
      return <Image className="text-blue-600" />;
    case "reglement":
      return <FileText className="text-green-600" />;
    case "tutoriel":
      return <Video className="text-red-600" />;
    default:
      return null;
  }
};

const ClubResources = () => {
    const navigate=useNavigate()
    const {clubId}=useParams()
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📚 Club Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((res, index) => (
          <div
            key={index}
            onClick={()=>{
                if(res.type==="guide") {navigate(`/homeDerigeant/${clubId}/guide`)}
                    else if(res.type==="reglement") {navigate(`/homeDerigeant/${clubId}/reglement`)}
                    else if(res.type==="multimedia") {navigate(`/homeDerigeant/${clubId}/multimedia`)}
                    else if(res.type==="tutoriel") {navigate(`/homeDerigeant/${clubId}/tutoriel`)}
            }}
            className="flex items-start gap-4 p-4 bg-white rounded-xl shadow hover:shadow-md transition"
          >
            <div className="flex-shrink-0">{getIcon(res.type)}</div>
            <div>
              <h3 className="text-lg font-semibold">{res.title}</h3>
              <p className="text-sm text-gray-600">{res.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubResources;
