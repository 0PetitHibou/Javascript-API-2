
export const myData = async () => {
    try{
        const response = await fetch('http://localhost:8080/cars' , {method : 'GET'}); //wait for the data to arrive
        const output = await response.json();
        return output;
    } catch(error) {
        console.log(error);
    }
}

