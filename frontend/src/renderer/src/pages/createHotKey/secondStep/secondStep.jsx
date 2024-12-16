import { useContext, useRef } from 'react';
import style from './secondStep.module.css';
import Switch from '../../../components/switch/switch';
import { HotKeyContext } from '../../../context/newHotKeyContext';
import Button from '../../../components/button/button';
import SelectWindow from '../../../components/selectWindow/selectWindow';
import InputText from '../../../components/inputText/inputText';
import TextArea from '../../../components/textArea/textArea';
import InputKeyBoard from '../../../components/inputKeyBoard/InputKeyBoard';

export default function SecondStep({ goToPreviousStep }) {
   const [valueContext, updateAttribute, resetContext] = useContext(HotKeyContext);
   const descriptionInput = useRef();

   function createHotKey() {
      goToPreviousStep();
      resetContext();
   }
   function goToBack() {
      goToPreviousStep();
      updateAttribute('description', descriptionInput.current.value);
   }
   console.log('context', valueContext.windowWhereActive);
   return (
      <>
         <div className={style.page}>
            <div className={style.content}>
               <section>
                  <InputText labelText="Name of HoyKey" />
                  <TextArea
                     labelText="Description hotkey"
                     defaultValue={valueContext.description}
                     ref={descriptionInput}
                  ></TextArea>
               </section>
               <section>
                  <h2>keys</h2>
                  <InputKeyBoard
                     keyContextToUpdate="hotKey"
                     label="to active hot key"
                  ></InputKeyBoard>
                  <InputKeyBoard
                     keyContextToUpdate="hotKey"
                     label="to active hot key"
                  ></InputKeyBoard>
               </section>
               <section>
                  <h2>Select window</h2>
                  <div className={style.windowsInputContainer}>
                     <div>
                        <h3>window where active</h3>
                        <SelectWindow
                           defaultPhrase="to active on all windows"
                           storeInKeyName="windowWhereActive"
                        ></SelectWindow>
                     </div>
                     <div>
                        <h3>window to back</h3>
                        <SelectWindow
                           defaultPhrase="stay on focused window"
                           onlySelectOne={true}
                           storeInKeyName="WindowWhereExecuteKeys"
                        ></SelectWindow>
                     </div>
                     <div>
                        <h3>window to focus</h3>
                        <SelectWindow
                           onlySelectOne={true}
                           storeInKeyName="WindowWhereExecuteKeys"
                        ></SelectWindow>
                     </div>
                  </div>
               </section>
               <section className={style.switchSection}>
                  <h2>Extra Options</h2>
                  <Switch
                     execute={() => {
                        updateAttribute('executeOnTargetWindow', !valueContext.intelligenceSearch);
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
               </section>
               <footer className={style.buttonsFooter}>
                  <Button animationDuration={'2s'} onClick={goToBack}>
                     Previous step
                  </Button>
                  <Button animationDuration={'2s'} onClick={createHotKey}>
                     Create hot Key
                  </Button>
               </footer>
            </div>
         </div>
      </>
   );
}
