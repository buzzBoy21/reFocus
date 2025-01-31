export default function getShutDownServer(params) {
   return fetch('http://localhost:8080/shutdown-server', {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
   })
      .then((response) => {
         if (response.ok) {
            return response.json();
         } else {
            return true;
         }
      })
      .then((data) => {
         console.log(data.response, 'ejecuciónnnnnnnnnnnnnnnnnnnnnnnn');
         return data.response;
      })
      .catch((error) => {
         console.log(error);
         console.log('error...');
         return false;
      });
}
