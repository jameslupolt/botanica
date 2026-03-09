import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import type { ReactElement } from 'react';

function customRender(ui: ReactElement, options = {}) {
  return render(ui, {
    wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    ...options,
  });
}

export { customRender as render };
export { screen, fireEvent, within, waitFor } from '@testing-library/react';
