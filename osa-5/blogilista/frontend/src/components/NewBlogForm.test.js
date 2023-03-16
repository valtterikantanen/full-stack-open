import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewBlogForm from './NewBlogForm';

test('<NewBlogForm /> calls createNewBlog with correct parameters', async () => {
  const user = userEvent.setup();
  const createNewBlog = jest.fn();

  render(<NewBlogForm createNewBlog={createNewBlog} />);

  const titleInput = screen.getByPlaceholderText('Title');
  const authorInput = screen.getByPlaceholderText('Author');
  const urlInput = screen.getByPlaceholderText('URL');
  const createBtn = screen.getByText('create');

  await user.type(titleInput, 'Canonical string reduction');
  await user.type(authorInput, 'Edsger W. Dijkstra');
  await user.type(urlInput, 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html');
  await user.click(createBtn);

  expect(createNewBlog.mock.calls).toHaveLength(1);
  expect(createNewBlog.mock.calls[0][0]).toEqual({
    author: 'Edsger W. Dijkstra',
    title: 'Canonical string reduction',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
  });
});
