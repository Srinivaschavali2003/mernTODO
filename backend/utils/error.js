const errorHandle = ({message,status}) =>{
    const error=    new Error(); 
    error.message= message; 
    error.statusCode = status ;
    return  error ;
}

module.exports  = errorHandle ; 
