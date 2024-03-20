import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { NestjsError } from "../components/NestJsError";

export function FormPage(){

    const[from_where,setFromwhere]=useState('');
    const[to_where,setTowhere]=useState('');
    const[departure,setDeparture]=useState('');
    const[arrival,setArrival]=useState('');
    const[errorMessage,setErrorMessage]=useState('');    
    
    async function newTrain(e:FormEvent){
        e.preventDefault();

        const newTrainToSend = {
            from_where, to_where, departure, arrival
        }

        const response = await fetch('http://localhost:3000/trains', {
            method: 'POST',
            body: JSON.stringify(newTrainToSend),
            headers: {
              "Content-type": "application/json",
              "Accept": "application/json",
            }
        });
        if (response.status == 400) {
            const errorBody = await response.json() as NestjsError;
            setErrorMessage(errorBody.message.join(', '));
          } else if (!response.ok) {
            setErrorMessage('Hiba a küldéskor');
        }


}
    
    return <div>
        <form onSubmit={newTrain}>
            <label>From:
                <input type="text" onChange={e => setFromwhere(e.currentTarget.value)}/>
            </label><br/>
            <label>To:
                <input type="text" onChange={e => setTowhere(e.currentTarget.value)}/>
            </label><br/>
            <label>Departure:
                <input type="time" onChange={e => setDeparture(e.currentTarget.value.toString())}/>
            </label><br/>
            <label>Arrival:
                <input type="time" onChange={e => setArrival(e.currentTarget.value.toString())}/>
            </label><br/>
            <input type='submit' value='New train' />
        </form>
        {
        errorMessage != '' ? <div className='alert alert-danger'>{errorMessage}</div> : null
      }
        <Link to={'/'}>Trains</Link>
    </div>
}