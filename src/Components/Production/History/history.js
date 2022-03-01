import React , { useState } from 'react';


export default function history(){

    const [value, onChange] = useState(new Date());

    console.log("History");

    return (
        <div>
            History
        </div>
    )
}