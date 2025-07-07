import { themes } from '@storybook/theming';
import { addons } from '@storybook/addons';

addons.setConfig({
  theme: {
    ...themes.dark,
    brandImage: './bon.svg',
    brandTitle: 'Simonis Stevens Components',
    brandUrl: 'https://ss-portfolio.vercel.app',
  },
});
