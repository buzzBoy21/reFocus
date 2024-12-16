export default function getAllWindowNames() {
   return fetch('http://localhost:8080/get-all-windows-names', {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
   })
      .then((response) => {
         if (response.ok) {
            return response.json();
         } else {
            return new Error(`Error: ${response.status}`);
         }
      })
      .then((data) => {
         return data;
      })
      .catch((error) => {
         console.log(error);
      });
}
