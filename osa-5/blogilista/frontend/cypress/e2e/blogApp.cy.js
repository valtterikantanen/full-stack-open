describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'Matti Meikäläinen',
      username: 'mattim',
      password: 'abc123'
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.visit('');
  });

  it('Login form is shown', function () {
    cy.contains('Login');
    cy.contains('username');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mattim');
      cy.get('#password').type('abc123');
      cy.get('#login-btn').click();

      cy.contains('Matti Meikäläinen logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mattim');
      cy.get('#password').type('123abc');
      cy.get('#login-btn').click();

      cy.get('.notification.error').contains('wrong username or password');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mattim', password: 'abc123' });
      cy.createBlog({
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/'
      });
    });

    it('a blog can be created', function () {
      cy.contains('create new blog').click();
      cy.get('#title').type('First class tests');
      cy.get('#author').type('Robert C. Martin');
      cy.get('#url').type('http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html');
      cy.get('#create-blog-btn').click();
      cy.contains('First class tests Robert C. Martin');
      cy.get('.notification.success').contains(
        'A new blog “First class tests” by Robert C. Martin added'
      );
    });

    it('a blog can be liked', function () {
      cy.contains('show').click();
      cy.contains('likes 0');
      cy.contains('like').click();
      cy.contains('likes 1');
    });

    it('a blog that has been added by the user can be deleted', function () {
      cy.contains('show').click();
      cy.contains('delete').click();
      cy.on('window:confirm', () => true);
      cy.get('html').should('not.contain', 'React patterns Michael Chan');
    });

    it('a user who has not added the blog cannot see the delete button', function () {
      cy.contains('logout').click();
      const user = {
        name: 'Maija Meikäläinen',
        username: 'maijam',
        password: 'abc123'
      };
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
      cy.login({ username: 'maijam', password: 'abc123' });
      cy.visit('');
      cy.contains('show').click();
      cy.get('html').should('not.contain', 'delete');
    });

    it('blogs are sorted by amount of likes so that blog with most likes comes first', function () {
      cy.createBlog({
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html'
      });

      // Add two likes to blog with the title 'React patterns'
      cy.get('.blog-info').eq(0).contains('show').click();
      cy.get('.blog-info').eq(0).contains('like').as('likeBtn1');
      cy.get('@likeBtn1').click();
      cy.wait(100).get('@likeBtn1').click();
      cy.get('.blog-info').eq(0).contains('likes 2');

      // Add three likes to blog with the title 'First class tests'
      cy.get('.blog-info').eq(1).contains('show').click();
      cy.get('.blog-info').eq(1).contains('like').as('likeBtn2');
      cy.get('@likeBtn2').click();
      cy.wait(100).get('@likeBtn2').click();
      cy.wait(100).get('@likeBtn2').click();

      // Now the blog with three likes should be the first one (i.e. at index 0)
      cy.get('.blog-info').eq(0).contains('likes 3');

      cy.get('.blog-info').eq(0).should('contain', 'First class tests');
      cy.get('.blog-info').eq(1).should('contain', 'React patterns');
    });
  });
});
