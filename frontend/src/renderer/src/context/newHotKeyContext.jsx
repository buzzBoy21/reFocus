const { createContext, useState } = require('react');
import PropTypes from 'prop-types';
export const HotKeyContext = createContext();

export default function NewHotKeyContext({ children }) {
   const [valueContext, setValueContext] = useState({
      hotKey: null,
      nameHotKey: null,
      keyToPress: null,
      windowWhereActive: [],
      WindowWhereExecuteKeys: null,
      intelligenceSearch: true,
   });
   return (
      <HotKeyContext.Provider value={[valueContext, setValueContext]}>
         {children}
      </HotKeyContext.Provider>
   );
}

NewHotKeyContext.propTypes = {
   children: PropTypes.node.isRequired,
};
