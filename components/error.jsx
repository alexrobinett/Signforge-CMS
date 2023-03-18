import React from "react";
import { useRouteError } from "react-router-dom";


function Error(){
    const error = useRouteError()
    return (
        <h1>{error.message}</h1>
    )
}

export {Error}