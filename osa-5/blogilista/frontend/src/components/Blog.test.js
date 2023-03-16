import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

const blog = {
  author: 'Edsger W. Dijkstra',
  title: 'Canonical string reduction',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 18,
  user: {
    name: 'Mikko Mallikas'
  }
};

describe('<Blog />', () => {
  test('renders title and author but not amount of likes or url', () => {
    const container = render(
      <Blog blog={blog} handleAddLike={() => {}} handleBlogRemove={() => {}} />
    ).container;

    const title = screen.getByText('Canonical string reduction');
    const author = screen.getByText('Edsger W. Dijkstra');
    const likes = container.querySelector('#blogLikes');
    const addedByUser = container.querySelector('#blogAddedByUser');

    expect(title).toBeDefined();
    expect(author).toBeDefined();
    expect(likes).toBe(null);
    expect(addedByUser).toBe(null);
  });

  test('shows all details of a blog after clicking the show button', async () => {
    render(<Blog blog={blog} handleAddLike={() => {}} handleBlogRemove={() => {}} />);
    const user = userEvent.setup();
    const button = screen.getByText('show');
    await user.click(button);

    const title = screen.getByText('Canonical string reduction');
    const author = screen.getByText('Edsger W. Dijkstra');
    const url = screen.getByText(
      'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
    );
    const likes = screen.getByText('likes 18');
    const addedByUser = screen.getByText('Mikko Mallikas');

    expect(title).toBeDefined();
    expect(author).toBeDefined();
    expect(url).toBeDefined();
    expect(likes).toBeDefined();
    expect(addedByUser).toBeDefined();
  });

  test('event handler is called twice after clicking the like button twice', async () => {
    const addLike = jest.fn();
    const user = userEvent.setup();

    render(<Blog blog={blog} handleAddLike={addLike} handleBlogRemove={() => {}} />);

    const showBtn = screen.getByText('show');
    await user.click(showBtn);

    const likeBtn = screen.getByText('like');
    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(addLike.mock.calls).toHaveLength(2);
  });
});
