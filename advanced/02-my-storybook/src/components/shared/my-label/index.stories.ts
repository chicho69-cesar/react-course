import type { Meta, StoryObj } from '@storybook/react-vite'
import MyLabel from '.'

/* Creamos la información de referencia para crear la historia de este 
componente, como el titulo de la historia, el componente que se va a usar,
los tipos de controles aplicados para las props, etc. */
const meta: Meta = {
  title: 'UI/labels/MyLabel',
  component: MyLabel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable label component that supports different sizes, colors, and text transformations.'
      }
    }
  },
  argTypes: {
    size: {
      control: {
        type: 'inline-radio'
      },
    },
    fontColor: {
      control: {
        type: 'color'
      },
    }
  }
} satisfies Meta<typeof MyLabel>

/* Exportamos por defecto la información meta */
export default meta
/* Creamos el tipo de la historia */
type Story = StoryObj<typeof MyLabel>

/* Creamos historias personalizadas con diferentes valores en las props
para ver como se comporta el componente recibiendo información diferente */
export const Basic: Story = {
  args: {
    label: 'Basic Label',
  },
}

export const AllCaps: Story = {
  args: {
    label: 'All Caps Label',
    allCaps: true,
  },
}

export const Secondary: Story = {
  args: {
    label: 'Secondary Label',
    color: 'text-secondary'
  }
}

export const CustomColor: Story = {
  args: {
    label: 'Custom Color Label',
    fontColor: '#ff6347',
  }
}
