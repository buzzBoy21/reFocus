import { useState, useEffect } from 'react';

export default function useFullScreenChange() {
   return window.api.isFullscreen();
}
