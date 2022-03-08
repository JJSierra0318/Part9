import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescription extends CoursePartBase{
  description: string
}

interface CourseNormalPart extends CourseDescription {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

 export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;


const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content coursePart={courseParts}/>
      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}/>
    </div>
  );
};

export default App;