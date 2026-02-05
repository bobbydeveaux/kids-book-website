import { describe, it, expect } from 'vitest'

// Sample test to verify Vitest setup
describe('Vitest Setup', () => {
  it('should run basic tests', () => {
    expect(true).toBe(true)
  })

  it('should perform basic math operations', () => {
    expect(2 + 2).toBe(4)
    expect(10 * 3).toBe(30)
  })

  it('should handle string operations', () => {
    const str = 'Hello World'
    expect(str).toContain('World')
    expect(str.length).toBe(11)
  })

  it('should handle array operations', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(arr).toHaveLength(5)
    expect(arr).toContain(3)
  })

  it('should handle object operations', () => {
    const obj = { name: 'Test', value: 42 }
    expect(obj).toHaveProperty('name')
    expect(obj.name).toBe('Test')
  })
})

// Sample React component test
describe('React Testing Library Setup', () => {
  it('should have access to testing utilities', () => {
    expect(typeof expect).toBe('function')
    expect(typeof describe).toBe('function')
    expect(typeof it).toBe('function')
  })
})