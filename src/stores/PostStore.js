import { action, computed, makeObservable, observable } from 'mobx';

class PostStore {
  posts = [];
  currentPage = 1;
  itemsPerPage = 10;
  sortBy = null;
  sortDirection = 'asc';
  searchTerm = '';

  constructor() {
    makeObservable(this, {
      posts: observable,
      currentPage: observable,
      itemsPerPage: observable,
      sortBy: observable,
      sortDirection: observable,
      searchTerm: observable,
      setPosts: action,
      setCurrentPage: action,
      setItemsPerPage: action,
      setSortBy: action,
      setSortDirection: action,
      setSearchTerm: action,
      filteredAndSortedData: computed,
      currentData: computed,
      totalPages: computed,
    });

    this.fetchPosts().then(() => {});
  }

  // Метод для получения данных с сервера
  fetchPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      this.setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  setPosts(posts) {
    this.posts = posts;
  }

  setCurrentPage(page) {
    this.currentPage = page;
  }

  setItemsPerPage(itemsPerPage) {
    this.itemsPerPage = itemsPerPage;
  }

  // Определение функций сравнения для столбцов
  sortFunctions = {
    title: (a, b) => a.title.localeCompare(b.title),
    body: (a, b) => a.body.localeCompare(b.body),
  };

  setSortBy(column) {
    // Если текущая сортировка совпадает с выбранным столбцом,
    // меняем направление сортировки на противоположное
    if (this.sortBy === column) {
      this.setSortDirection(this.sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Если текущая сортировка не совпадает с выбранным столбцом,
      // сортируем по выбранному столбцу в прямом порядке (asc)
      this.sortBy = column;
      this.setSortDirection('asc');
    }
    console.log('sort by ' + column)
  }

  setSortDirection(direction) {
    this.sortDirection = direction;
    console.log(this.sortDirection)
  }

  setSearchTerm(term) {
    this.searchTerm = term;
    console.log('searchTerm: ' + this.searchTerm)
  }

  // Метод для получения функции сравнения для текущего столбца сортировки
  getSortFunction() {
    if (this.sortBy && this.sortBy in this.sortFunctions) {
      return this.sortFunctions[this.sortBy];
    }
    // По умолчанию, если столбец сортировки не определен или не найден в sortFunctions,
    // возвращаем функцию для сравнения чисел
    return (a, b) => b[this.sortBy] - a[this.sortBy];
  }

  get filteredAndSortedData() {
    const filteredData = this.posts.filter((post) => {
      if (this.searchTerm) {
        console.log(this.searchTerm)
        return Object.values(post).some((value) =>
          String(value).replace(/[\n\r\s]/g, '').toLowerCase().includes(this.searchTerm.replace(/[\n\r\s]/g, '').toLowerCase())
        );
      }
      return true;
    });

    const sortFunction = this.getSortFunction();
    return filteredData.sort((a, b) => {
      return this.sortDirection === 'asc' ? sortFunction(a, b) : -sortFunction(a, b);
    });
  }

  get currentData() {
    const startIndex = (this.currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    return this.filteredAndSortedData.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.filteredAndSortedData.length / this.itemsPerPage);
  }
}

const postStore = new PostStore();
export default postStore;
