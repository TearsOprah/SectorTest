import { action, computed, makeObservable, observable } from 'mobx';

class PostStore {
  posts = [];
  currentPage = 1;
  sortBy = null;
  sortDirection = 'asc';
  searchTerm = '';

  constructor() {
    makeObservable(this, {
      posts: observable,
      currentPage: observable,
      sortBy: observable,
      sortDirection: observable,
      searchTerm: observable,
      setPosts: action,
      setCurrentPage: action,
      setSortBy: action,
      setSortDirection: action,
      setSearchTerm: action,
      filteredAndSortedData: computed,
      currentData: computed,
    });
  }

  setPosts(posts) {
    this.posts = posts;
  }

  setCurrentPage(page) {
    this.currentPage = page;
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
}

const postStore = new PostStore();
export default postStore;
