import { CoursePart } from "../App"

interface Props {
  coursePart: CoursePart[]
}

const Part = (props: CoursePart) => {
  const asserNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
  }

  switch (props.type) {
    case "normal":
      return (
        <div>
          <p><strong>{props.name} {props.exerciseCount}</strong><br/>
          <em>{props.description}</em></p>
        </div>
      )
    case "groupProject":
      return (
        <div>
          <p><strong>{props.name} {props.exerciseCount}</strong>
          <br/>project exercises {props.groupProjectCount}</p>
        </div>
      )
    case "submission":
      return (
        <div>
          <p><strong>{props.name} {props.exerciseCount}</strong>
          <br/><em>{props.description}</em>
          <br/>submit to {props.exerciseSubmissionLink}</p>
        </div>
      )
    default:
      return asserNever(props)
  }
}

const Content = (props: Props) => {
  return (
    <div>
        {props.coursePart.map(part => <Part key={part.name} {...part} />)}
    </div>
  )
}

export default Content