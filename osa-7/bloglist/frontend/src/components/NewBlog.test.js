import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NewBlog from './NewBlog';

describe('NewBlog', () => {
  test('if liked twice, ', async () => {
    const createHandler = jest.fn();
    render(<NewBlog createBlog={createHandler} />);

    const input = {
      title: 'Goto considered useful',
      author: 'Edsger Dijkstra',
      url: 'acm.com/goto'
    };

    const user = userEvent.setup();

    const titleInput = screen.getByPlaceholderText('title of the blog');
    await user.type(titleInput, input.title);

    const authorInput = screen.getByPlaceholderText('author of the blog');
    await user.type(authorInput, input.author);

    const urlInput = screen.getByPlaceholderText('url of the blog');
    await user.type(urlInput, input.url);

    const showButton = screen.getByText('create');
    await user.click(showButton);

    const calls = createHandler.mock.calls;

    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toEqual(input);
  });
});

it('when blog is created, callback has correct data', async () => {
  const createHandler = jest.fn();
  render(<NewBlog createBlog={createHandler} />);

  const blogToCreate = {
    author: 'Robert C. Martin',
    title: 'TDD harms architecture',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
  };

  const user = userEvent.setup();

  const authorInput = screen.getByPlaceholderText('author of the blog');
  await user.type(authorInput, blogToCreate.author);

  const titleInput = screen.getByPlaceholderText('title of the blog');
  await user.type(titleInput, blogToCreate.title);

  const urlInput = screen.getByPlaceholderText('url of the blog');
  await user.type(urlInput, blogToCreate.url);

  const createButton = screen.getByText('create');
  await user.click(createButton);

  expect(createHandler.mock.calls[0][0]).toEqual(blogToCreate);
});
