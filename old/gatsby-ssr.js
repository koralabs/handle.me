import React from 'react';
import { RECAPTCHA_SITE_KEY } from './src/lib/constants';

export const onRenderBody = ({ setHeadComponents, setHtmlAttributes }) => {
  setHeadComponents([
      <script
          async
          key="recaptcha-script"
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
      />
  ])
}
