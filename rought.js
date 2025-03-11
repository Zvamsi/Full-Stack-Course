document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-book-form');
    const booksDiv = document.getElementById('books');
  
    // Fetch books on page load
    fetchBooks();
  
    // Handle form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const year = document.getElementById('year').value;
  
      if (title && author && year) {
        try {
          const response = await fetch('http://localhost:3001/api/books', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, author, year }),
          });
  
          if (response.ok) {
            fetchBooks(); // Refresh book list
            form.reset(); // Clear form fields
          } else {
            console.error('Failed to add book');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    });
  
    // Function to fetch and display books
    async function fetchBooks() {
      try {
        const response = await fetch('http://localhost:3001/api/books');
        const data = await response.json();
        const booksHtml = data.map((book) => {
          return `
            <div class="book">
              <h3>${book.title}</h3>
              <p>Author: ${book.author}</p>
              <p>Year: ${book.year}</p>
            </div>
          `;
        }).join('');
        booksDiv.innerHTML = booksHtml;
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }
  }
);