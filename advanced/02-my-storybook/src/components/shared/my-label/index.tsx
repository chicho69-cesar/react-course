import './styles.css'

interface MyLabelProps {
  /**
   * The text to display in the label
   * @example 'My Custom Label'
   */
  label: string

  /**
   * The size of the label text
   * @default 'normal'
   * @example 'h1', 'h2', 'h3', 'normal'
   */
  size?: 'normal' | 'h1' | 'h2' | 'h3'

  /**
   * Whether the label text should be displayed in all uppercase letters
   * @default false
   */
  allCaps?: boolean

  /**
   * The color of the label text
   * @example 'text-primary', 'text-secondary', 'text-tertiary'
   */
  color?: 'text-primary' | 'text-secondary' | 'text-tertiary'

  /**
   * The font color of the label text
   * @example '#fff', 'rgb(33, 33, 33)'
   */
  fontColor?: string
}

export default function MyLabel({
  label,
  size = 'normal',
  allCaps = false,
  color,
  fontColor
}: MyLabelProps) {
  return (
    <span
      className={`${size} ${color} label`}
      style={{
        color: fontColor,
      }}
    >
      {allCaps ? label.toUpperCase() : label}
    </span>
  )
}
