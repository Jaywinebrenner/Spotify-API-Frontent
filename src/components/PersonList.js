

import Axios from 'axios'
import React, { useState, useEffect } from "react";

const PersonList = () =>  {

    const [persons, setPersons] = useState([])

      useEffect(() => {
        Axios.get("http://jsonplaceholder.typicode.com/photos").then((res) => {
          console.log("RES", res);
          setPersons(res.data);
          console.log("RES DATA", res.data);
          console.log("PERSONS", persons);
          // this.setState({persons: res.data})
        });
  }, []);




    return(
        <ul>
            { persons.map(person => 
                <li key={person.id} >
                    <img src={person.url}/>
                </li>
            )}
        </ul>
    )
}

export default PersonList

