import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('test todo component', () => {
    const todoData = {
        "text": "write code",
        "done": false
    }

    render(<Todo todo={todoData} />)

    const element = screen.getByText('This todo is not done')
    
    expect(element).toBeInTheDocument()
})