import { render, screen, fireEvent } from '@testing-library/react'
import { Checkbox } from '../../../components/ui/checkbox'

describe('Checkbox', () => {
  it('renders without crashing', () => {
    render(<Checkbox />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
  })

  it('can be checked and unchecked', () => {
    render(<Checkbox />)
    const checkbox = screen.getByRole('checkbox')
    
    // Initial state should be unchecked
    expect(checkbox).not.toBeChecked()
    
    // Click to check
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
    
    // Click to uncheck
    fireEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('applies custom className', () => {
    const customClass = 'test-class'
    render(<Checkbox className={customClass} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveClass(customClass)
  })

  it('can be disabled', () => {
    render(<Checkbox disabled />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDisabled()
  })
}) 