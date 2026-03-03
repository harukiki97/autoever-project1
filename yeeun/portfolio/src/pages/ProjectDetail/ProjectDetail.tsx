import { useParams } from "react-router-dom";

const ProjectDetail = () => {
  const { id } = useParams();

  return <div>id: {id}</div>;
};

export default ProjectDetail;
