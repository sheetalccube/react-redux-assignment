import { useState } from "react";

export function addition(a: number, b: number): number {
  return a + b;
}

export default function Sum() {
  const [data,setData]=useState('')
  const [message,setMessage] = useState('')
  return <div>
    <input type="text" placeholder="Enter user name " name="userName" id='userId' value={data} 
     onChange={(event) => setData(event.target.value+'test')}
/>
    sum
    <p>hello</p>
    <br/>
    <button onClick={()=>setMessage('updated message')}>clcik me</button>
    {
      message && <p>
        {message}
      </p>
    }
    </div>
}
