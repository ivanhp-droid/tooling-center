import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import Admonition from '@theme/Admonition';

const Good = ({children, title="Good Example"}: {children: React.ReactNode, title?: string}) => (
  <Admonition type="tip" title={title}>
    {children}
  </Admonition>
);

const Bad = ({children, title="Bad Example"}: {children: React.ReactNode, title?: string}) => (
  <Admonition type="danger" title={title}>
    {children}
  </Admonition>
);

export default {
  // Re-use the default mapping
  ...MDXComponents,
  Good,
  Bad,
};
