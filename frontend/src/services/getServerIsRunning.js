function getServerIsRunning() {
   try {
      return fetch('http://localhost:8080/health', {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      })
         .then((response) => {
            if (response.ok) {
               return response.json();
            } else {
               return false;
            }
         })
         .then((value) => {
            console.log('value', value, value.response, typeof value);
            const serverResponse = value.response ?? false;
            return serverResponse ? true : false;
         })
         .catch((error) => {
            console.log(error);
            return false;
         });
   } catch (error) {
      console.log(error);
      return false;
   }
}

export default getServerIsRunning;
