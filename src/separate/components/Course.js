import React from 'react'

const Course = ({ course }) => {
    // const sum = () => {
    //     let result = 0
    //     for(let i=0; i<course.parts.length; i++) 
    //         result += course.parts[i].exercises
    //     return result
    // }
    console.log(course)
    const exercises = course.parts.map(ex => ex.exercises)
    
    const initialValue = 0;
    const sum = exercises.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValue
    );

    return (
        <div>
            <h1> {course.name} </h1>
            <ul>
                {course.parts.map(part => 
                    <li key={part.id}>
                        {part.name} {part.exercises}
                    </li>
            )}
            </ul>
        <h2>total of {sum} exercises</h2>
        </div>
    )
}

export default Course