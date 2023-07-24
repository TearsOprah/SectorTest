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

  get filteredAndSortedData() {
    const filteredData = this.posts.filter((post) => {
      if (this.searchTerm) {
        return Object.values(post).some((value) =>
          String(value).toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
      return true;
    });

    return filteredData.sort((a, b) => {
      if (this.sortBy) {
        let comparison = 0;
        if (this.sortBy === 'title') {
          comparison = a[this.sortBy].localeCompare(b[this.sortBy]);
        } else if (this.sortBy === 'body') { // Исправляем сортировку по столбцу "Описание" (body)
          comparison = a['body'].localeCompare(b['body']);
        } else {
          comparison = b[this.sortBy] - a[this.sortBy];
        }
        return this.sortDirection === 'asc' ? comparison : -comparison;
      }
      return 0;
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
