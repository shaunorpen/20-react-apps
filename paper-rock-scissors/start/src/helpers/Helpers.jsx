import React from 'react';

export function renderComponent(choice) {
  const Component = choice.component;
  return <Component />;
}
