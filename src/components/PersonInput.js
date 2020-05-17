
import React, { useState, useEffect } from "react";
import Axios from 'axios'

const PersonInput = () => {

    const [name, setName] = useState('')
 
    const handleChange = e => {
        setName(e.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()

        const user = { name }
        console.log("USER", user);
        Axios.post(`http://jsonplaceholder.typicode.com/photos`, {user} )
        .then(res => {
            console.log("RES", res);
            console.log("RES.DATA", res.data);
            
        })
    }

       
        return (
          <form onSubmit={handleSubmit}>
            <label>
              Person Name:
              <input
                type="text"
                name="name"
                onChange={handleChange}
              ></input>
            </label>
            <button type='submit'>ADD</button>
          </form>
        );
    }


    export default PersonInput