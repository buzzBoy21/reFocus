import { useContext, useRef } from 'react';
import style from './secondStep.module.css';
import Switch from '../../../components/switch/switch';
import { HotKeyContext } from '../../../context/newHotKeyContext';
import Button from '../../../components/button/button';
import SelectWindow from '../../../components/selectWindow/selectWindow';
import InputText from '../../../components/inputText/inputText';
import TextArea from '../../../components/textArea/textArea';
import InputKeyBoard from '../../../components/inputKeyBoard/InputKeyBoard';
import checkAllInputToCreate from './checkAllInputToCreate';
import { Link, useNavigate } from 'react-router';

export default function SecondStep() {
   const navigate = useNavigate();
   const [valueContext, updateAttribute, resetContext] = useContext(HotKeyContext);
   const nameInput = useRef();
   const descriptionInput = useRef();

   async function createHotKey() {
      if (checkAllInputToCreate(valueContext)) {
         const isOk = await window.api.services.postCreateHotKey(valueContext);

         console.log('fufa', isOk);
         if (isOk && !(isOk instanceof Error)) {
            resetContext();
            navigate('/');
         }
      }
   }

   return (
      <>
         <div className={style.page}>
            <div className={style.content}>
               <section>
                  <InputText
                     labelText="Name of HoyKey"
                     ref={nameInput}
                     defaultValue={valueContext.nameHotKey}
                     onBlur={() => {
                        updateAttribute('nameHotKey', nameInput.current.value);
                     }}
                  />
                  <TextArea
                     labelText="Description hotkey"
                     defaultValue={valueContext.description}
                     ref={descriptionInput}
                     onBlur={() => {
                        updateAttribute('description', descriptionInput.current.value);
                     }}
                  ></TextArea>
               </section>
               <section>
                  <h2>keys</h2>
                  <div>
                     <InputKeyBoard
                        keyContextToUpdate="hotKey"
                        label="to active hot key*"
                     ></InputKeyBoard>
                     <InputKeyBoard
                        keyContextToUpdate="keyToPress"
                        label="Keys will auto-press"
                     ></InputKeyBoard>
                  </div>
               </section>
               <section>
                  <h2>Select window</h2>
                  <div className={style.windowsInputContainer}>
                     <div>
                        <h3>window where active</h3>
                        <SelectWindow
                           defaultPhrase="to active on all windows"
                           storeInKeyName="windowWhereActive"
                           showPersonalWindows={false}
                        ></SelectWindow>
                     </div>
                     <div>
                        <h3>window to back</h3>
                        <SelectWindow
                           defaultPhrase="stay on focused window"
                           onlySelectOne={true}
                           storeInKeyName="windowToBack"
                        ></SelectWindow>
                     </div>
                     <div>
                        <h3>window to focus</h3>
                        <SelectWindow
                           defaultPhrase="no selected*"
                           onlySelectOne={true}
                           storeInKeyName="windowToFocus"
                        ></SelectWindow>
                     </div>
                  </div>
               </section>
               <section className={style.switchSection}>
                  <h2>Extra Options</h2>
                  <div>
                     <Switch
                        execute={() => {
                           updateAttribute(
                              'executeOnTargetWindow',
                              !valueContext.intelligenceSearch
                           );
                        }}
                        label="Execute on target window"
                        tooltip="When you are focusing the target window, You can use the Hotkey"
                     ></Switch>
                     <Switch
                        execute={() => {
                           updateAttribute('intelligenceSearch', !valueContext.intelligenceSearch);
                        }}
                        label="Active flexible search"
                        tooltip="It's going to focus on the windows whose names match the name of the window to focus on. For example, if we select 'net' and there is a window named 'Netflix - La casa de papel,' the program will focus on that window because 'Netflix' contains 'net.'"
                        initialState={true}
                     ></Switch>
                     <Switch
                        execute={() => {
                           updateAttribute(
                              'intelligenceSearchToBack',
                              !valueContext.intelligenceSearchToBack
                           );
                        }}
                        label="Active flexible search when back"
                        tooltip="it will return to the window that contains the specified name. For example, if you have a window called 'Netflix - La casa de papel' and you select 'net' as the window to return to, it will automatically focus on the window 'Netflix - La casa de papel'"
                        initialState={false}
                     ></Switch>
                  </div>
               </section>
               <footer className={style.buttonsFooter}>
                  <Link to="/">
                     <Button animationDuration={'2s'}>Previous step</Button>
                  </Link>
                  <Button animationDuration={'2s'} onClick={createHotKey}>
                     Create hot Key
                  </Button>
               </footer>
            </div>
         </div>
      </>
   );
}
