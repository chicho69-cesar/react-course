import type { Meta } from '@storybook/react-vite'
import PropertyCardContainer from '.'

const properties: React.ComponentProps<typeof PropertyCardContainer> = {
  id: 1,
}

export const Container = (props: typeof properties) => (
  <PropertyCardContainer id={props.id} />
)

const meta: Meta = {
  title: 'Container Presentational/Container/Property Card',
  component: PropertyCardContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: ''
      },
    }
  },
  argTypes: {},
  args: properties,
} satisfies Meta<typeof PropertyCardContainer>

export default meta
