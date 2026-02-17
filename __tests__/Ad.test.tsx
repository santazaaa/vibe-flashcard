import { render } from '@testing-library/react'
import Ad from '../src/components/Ad'

beforeEach(() => {
  global.adsbygoogle = { push: jest.fn() }
})

describe('Ad', () => {
  it('renders ad with default props', () => {
    render(<Ad slot="test-slot" />)
    const ad = document.querySelector('.adsbygoogle')
    expect(ad).toBeInTheDocument()
    expect(ad).toHaveAttribute('data-ad-slot', 'test-slot')
    expect(ad).toHaveAttribute('data-ad-format', 'auto')
    expect(ad).toHaveAttribute('data-full-width-responsive', 'true')
    expect(global.adsbygoogle.push).toHaveBeenCalled()
  })

  it('renders ad with custom props', () => {
    render(<Ad slot="custom-slot" format="rectangle" responsive={false} className="custom-class" />)
    const ad = document.querySelector('.adsbygoogle')
    expect(ad).toBeInTheDocument()
    expect(ad).toHaveAttribute('data-ad-slot', 'custom-slot')
    expect(ad).toHaveAttribute('data-ad-format', 'rectangle')
    expect(ad).toHaveAttribute('data-full-width-responsive', 'false')
    expect(ad).toHaveClass('custom-class')
    expect(global.adsbygoogle.push).toHaveBeenCalled()
  })
})