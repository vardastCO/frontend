import "@/styles/globals.css";
import type { Preview } from "@storybook/react";
import { initializeRTL } from 'storybook-addon-rtl';

initializeRTL();

const preview: Preview = {
    parameters: {
        direction: 'rtl',
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/
            }
        }
    }
}

export default preview
