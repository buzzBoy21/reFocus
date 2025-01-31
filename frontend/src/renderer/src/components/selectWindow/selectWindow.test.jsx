import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeEach, beforeAll } from 'vitest';
import SelectWindow from './selectWindow.jsx';
import { HotKeyContext } from '../../context/newHotKeyContext';
import React, { useState } from 'react';
import { ObtainedWindows } from '../../context/obtainedWindowsContext.jsx';
import { PersonalWindowsNames } from '../../context/personalWindowsNamesContext.jsx';

global.fetch = vi.fn();
let TestComponent;
let user = userEvent.setup();

describe('selectWindow (Component)', () => {
   beforeAll(() => {
      window.api = {
         services: {
            getAllWindowNames: vi
               .fn()
               .mockResolvedValue(['windowName1', 'Avengers', 'langos', 'car', 'youtube']),
         },
      };
   });
   beforeEach(() => {
      const mockData = { message: ['windowName1', 'Avengers', 'langos', 'car', 'youtube'] };
      global.fetch.mockResolvedValueOnce({
         ok: true,
         json: async () => mockData,
      });
      global.fetch.mockResolvedValueOnce({
         ok: true,
         json: async () => mockData,
      });

      // eslint-disable-next-line react/display-name
      TestComponent = () => {
         const [valueContext, setValueContext] = useState({ windowWhereActive: [] });

         const updateAttribute = (attributeName, newValue) => {
            setValueContext((prev) => ({ ...prev, [attributeName]: newValue }));
         };

         const resetValues = () => {
            setValueContext({ windowWhereActive: [] });
         };
         const [windowsNames, setWindowsNames] = useState([]);
         const [personalWindowsNames, setPersonalWindowsNames] = useState({
            windows: [{ name: 'personal1' }, { name: 'personal2' }],
         });
         console.log('imprimiendo---------', window.api.services.getAllWindowNames());
         return (
            <ObtainedWindows.Provider value={[windowsNames, setWindowsNames]}>
               <HotKeyContext.Provider value={[valueContext, updateAttribute, resetValues]}>
                  <PersonalWindowsNames.Provider
                     value={[personalWindowsNames, setPersonalWindowsNames]}
                  >
                     <SelectWindow
                        defaultPhrase="to active on all windows"
                        storeInKeyName="windowWhereActive"
                        showPersonalWindows={false}
                     />
                  </PersonalWindowsNames.Provider>
               </HotKeyContext.Provider>
            </ObtainedWindows.Provider>
         );
      };
   });
   test('open and show all windows, less custom window', async () => {
      render(<TestComponent />);
      expect(screen.getByText('to active on all windows')).toBeInTheDocument();
      fireEvent.click(screen.getByText('to active on all windows'));

      await waitFor(() => {
         //wating for updating of states (when press button)
         expect(screen.getByText('windowName1')).toBeInTheDocument();
         expect(screen.getByText('Avengers')).toBeInTheDocument();
         expect(screen.getByText('langos')).toBeInTheDocument();
         expect(screen.getByText('car')).toBeInTheDocument();
         expect(screen.getByText('youtube')).toBeInTheDocument();
      });
   });

   test('press window and change color', async () => {
      render(<TestComponent />);
      fireEvent.click(screen.getByText('to active on all windows'));
      await waitFor(() => {
         //wating for updating of states (when press button)
         fireEvent.click(screen.getByText('windowName1'));
      });
      await waitFor(() => {
         //wating for updating of states (when press button)
         expect(screen.getByText('windowName1').parentElement).toHaveStyle(
            'border-color: #d36464;'
         );
      });
   });
   test('close modal', async () => {
      render(<TestComponent />);
      fireEvent.click(screen.getByText('to active on all windows'));

      await waitFor(() => {
         fireEvent.click(screen.getByText('X'));
      });
      await waitFor(() => {
         expect(screen.queryByText('windowName1')).toBe(null);
      });
   });
   test('keep the value id you close and open the modal', async () => {
      render(<TestComponent />);
      fireEvent.click(screen.getByText('to active on all windows')); //open modal
      await waitFor(async () => {
         await user.click(screen.getByText('Avengers'));
         await user.click(screen.getByText('langos'));
      });
      await waitFor(async () => {
         fireEvent.click(await screen.getByText('X'));

         fireEvent.click(await screen.getByRole('button')); //open modal
      });
      await waitFor(async () => {
         expect(screen.getByText('Avengers').parentElement).toHaveStyle('border-color: #d36464;');
         expect(screen.getByText('langos').parentElement).toHaveStyle('border-color: #d36464;');
      });
   });
});
