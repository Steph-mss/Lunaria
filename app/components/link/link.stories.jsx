import { Link } from '~/components/link';
import { StoryContainer } from '../../../.storybook/story-container';

export default {
  title: 'Link',
};

export const Default = () => (
  <StoryContainer style={{ fontSize: 18 }}>
    <Link href="https://ss-portfolio.vercel.app">Primary link</Link>
    <Link secondary href="https://ss-portfolio.vercel.app">
      Secondary link
    </Link>
  </StoryContainer>
);
