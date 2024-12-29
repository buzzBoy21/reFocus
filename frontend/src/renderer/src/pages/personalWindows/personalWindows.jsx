import style from './personalWindows.module.css';

import { useContext, useEffect, useState } from 'react';
import WindowItem from '../../components/windowItem/windowItem';
import { PersonalWindowsNames } from '../../context/personalWindowsNamesContext';
import Button from '../../components/button/button';
import binImg from '../../assets/icons/bin.svg';
import findAndImportProgramImg from '../../components/windowItem/findProgramImg';
import notFoundImg from '../../assets/notFound.svg';
import CreatePersonalWindowName from '../../components/createPersonalWindowName/createPersonalWindowName';
import useJsonFileHandler from '../../hook/useJsonFileHandler';
function PersonalWindows() {
   const [personalWindowsNames, setPersonalWindowsNames] = useContext(PersonalWindowsNames);
   const [programsImage, setProgramsImage] = useState(null);
   const [, writeFile] = useJsonFileHandler('personalWindows.json');
   useEffect(() => {
      async function getAllImageToPersonalWindows() {
         let allImage = [];
         console.log('dentro de useEffect', personalWindowsNames);
         for (let index = 0; index < personalWindowsNames.windows.length; index++) {
            const image = await findAndImportProgramImg(personalWindowsNames.windows[index].name);
            allImage.push(image);
         }
         setProgramsImage(allImage);
         console.log(personalWindowsNames);
      }
      console.log('ejecuto useEffect');
      getAllImageToPersonalWindows();
   }, [personalWindowsNames]);

   function handleErase(nameToErase) {
      setPersonalWindowsNames((preValue) => {
         console.log('prev', preValue);
         const newCustomWindow = {
            ...preValue,
            windows: preValue.windows.filter((window) => window.name !== nameToErase),
         }; //return all window name which are not nameToErase
         writeFile(JSON.stringify(newCustomWindow));
         return newCustomWindow;
      });
   }

   return (
      <>
         <div className={style.page}>
            <div className={style.content}>
               <h1>All personal windows names</h1>
               <div className={style.allPersonalWindows}>
                  {programsImage != null &&
                     personalWindowsNames.windows.map((window, key) => (
                        <div key={key}>
                           <div>
                              <p className={style.animatedText}>{window.name}</p>
                              <div>
                                 <Button
                                    animation={false}
                                    onClick={() => {
                                       handleErase(window.name);
                                    }}
                                 >
                                    <img
                                       src={binImg}
                                       alt="trash image"
                                       style={{ width: 'auto', height: '100%' }}
                                    />
                                 </Button>
                              </div>
                           </div>
                           <div>
                              {
                                 <img
                                    src={
                                       programsImage[key] ? programsImage[key].default : notFoundImg
                                    }
                                    alt=""
                                    style={{
                                       height: '100%',
                                       maxWidth: '100%',
                                       objectFit: 'contain',
                                    }}
                                 />
                              }
                           </div>
                        </div>
                     ))}
               </div>
               <CreatePersonalWindowName></CreatePersonalWindowName>
            </div>
         </div>
         <button
            onClick={async () => {
               console.log('prueba', programsImage);
               console.log('personalWindowsNames', personalWindowsNames);
               console.log('salida', await findAndImportProgramImg('hola'));
            }}
         ></button>
         <button
            onClick={() => {
               setProgramsImage([]);
            }}
         ></button>
      </>
   );
}

export default PersonalWindows;
