const createResource = (fetchFunction) => {
   let status = 'pending';
   let result;
   const suspender = fetchFunction()
      .then((res) => {
         status = 'success';
         result = res;
      })
      .catch((err) => {
         status = 'error';
         result = err;
      });

   return {
      read() {
         if (status === 'pending') {
            console.log('dentro');
            throw suspender; // Suspende el renderizado.
         } else if (status === 'error') {
            throw result; // Lanza el error.
         }
         console.log('devuelvo');
         return result;
      },
   };
};

export default createResource;
