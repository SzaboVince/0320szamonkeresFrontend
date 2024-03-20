import { useEffect, useState } from "react";
import { Train } from "../components/Train";
import { Link } from "react-router-dom";

export function TrainPage(){
    const url='http://localhost:3000/trains'
    const [train, setTrain]=useState([] as Train[]);
    const [ errorMessage, setErrorMessage ] = useState('');

    useEffect(()=>{
        async function load(){
            try {
                const response = await fetch(url);
                if (!response.ok) {
                  setErrorMessage('Hiba a letöltéskor');
                  return;
                }
                const content = await response.json() as Train[];
                setTrain(content);
              } catch {
                setErrorMessage('Hiba a letöltéskor');
            }
        }
        load();
        console.log(errorMessage);
    }, []
    )

    return <div>
        <table className="table table-striped table-hover">
            <thead>
                <th>From</th>
                <th>To</th>
                <th>Departure</th>
                <th>Arrival</th>
            </thead>
            <tbody>
                {
                    train.map(train=><tr key={train.id}>
                        <td>{train.from_where}</td>
                        <td>{train.to_where}</td>
                        <td>{train.departure}</td>
                        <td>{train.arrival}</td>
                    </tr>)
                }
            </tbody>
        </table>
        <Link to={'/form'}>Form</Link>
    </div>
}